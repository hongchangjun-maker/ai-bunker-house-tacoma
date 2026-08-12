type ProjectEnv = {
  DB?: D1Database;
};

type InquiryPayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  preferredDate?: unknown;
  type?: unknown;
  message?: unknown;
  consent?: unknown;
  website?: unknown;
};

const jsonHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
};

function reply(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), { status, headers: jsonHeaders });
}

function text(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

async function readJsonWithLimit(request: Request, limit = 16_384): Promise<InquiryPayload> {
  if (!request.body) throw new Error('EMPTY_BODY');
  const declared = Number(request.headers.get('content-length') || 0);
  if (declared > limit) throw new Error('BODY_TOO_LARGE');
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let total = 0;
  let body = '';
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > limit) {
      await reader.cancel();
      throw new Error('BODY_TOO_LARGE');
    }
    body += decoder.decode(value, { stream: true });
  }
  body += decoder.decode();
  return JSON.parse(body) as InquiryPayload;
}

export const onRequestPost: PagesFunction<ProjectEnv> = async ({ request, env }) => {
  const url = new URL(request.url);
  const origin = request.headers.get('origin');
  if (origin && origin !== url.origin) return reply(403, { ok: false, message: '허용되지 않은 요청입니다.' });
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return reply(415, { ok: false, message: 'JSON 요청만 허용됩니다.' });

  let payload: InquiryPayload;
  try {
    payload = await readJsonWithLimit(request);
  } catch (error) {
    const message = error instanceof Error && error.message === 'BODY_TOO_LARGE' ? '문의 내용이 너무 큽니다.' : '요청 형식을 확인해 주세요.';
    return reply(400, { ok: false, message });
  }

  if (text(payload.website, 100)) return reply(202, { ok: true, reference: 'RECEIVED' });
  const name = text(payload.name, 60);
  const phone = text(payload.phone, 30);
  const email = text(payload.email, 120).toLowerCase();
  const preferredDate = text(payload.preferredDate, 10);
  const inquiryType = text(payload.type, 50);
  const message = text(payload.message, 2_000);

  if (name.length < 2 || phone.length < 8 || !validEmail(email) || message.length < 20 || payload.consent !== 'yes' || !inquiryType) {
    return reply(422, { ok: false, message: '필수 항목과 개인정보 동의를 확인해 주세요.' });
  }
  if (preferredDate && !/^\d{4}-\d{2}-\d{2}$/.test(preferredDate)) return reply(422, { ok: false, message: '상담 희망일 형식이 올바르지 않습니다.' });
  if (!env.DB) return reply(503, { ok: false, message: '문의 저장소가 아직 연결되지 않았습니다. 배포 관리자에게 D1 설정을 요청해 주세요.' });

  const recent = await env.DB.prepare("SELECT COUNT(*) AS count FROM inquiries WHERE email = ? AND created_at > datetime('now', '-10 minutes')")
    .bind(email)
    .first<{ count: number }>();
  if ((recent?.count ?? 0) >= 3) return reply(429, { ok: false, message: '잠시 후 다시 시도해 주세요.' });

  const id = crypto.randomUUID();
  const reference = `TAC-${id.slice(0, 8).toUpperCase()}`;
  await env.DB.prepare(`INSERT INTO inquiries (id, reference, name, phone, email, preferred_date, inquiry_type, message, consented_at, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), 'new')`)
    .bind(id, reference, name, phone, email, preferredDate || null, inquiryType, message)
    .run();

  console.log(JSON.stringify({ event: 'inquiry_created', reference, type: inquiryType }));
  return reply(201, { ok: true, reference, message: '문의가 정상적으로 접수되었습니다.' });
};

export const onRequestGet: PagesFunction<ProjectEnv> = async () =>
  new Response(null, { status: 405, headers: { ...jsonHeaders, Allow: 'POST' } });
