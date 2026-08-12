import { CalendarDays, Check, LoaderCircle, Send } from 'lucide-react';
import { useState } from 'react';

type State = { status: 'idle' | 'loading' | 'success' | 'error'; message: string };

export function ContactForm() {
  const [state, setState] = useState<State>({ status: 'idle', message: '' });
  const minDate = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setState({ status: 'loading', message: '문의 내용을 안전하게 전송하고 있습니다.' });
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch('/api/inquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json() as { ok?: boolean; message?: string; reference?: string };
      if (!response.ok || !result.ok) throw new Error(result.message || '현재 문의 저장 기능을 사용할 수 없습니다.');
      setState({ status: 'success', message: `접수되었습니다. 참조번호 ${result.reference ?? ''}` });
      form.reset();
    } catch (error) {
      setState({ status: 'error', message: error instanceof Error ? error.message : '문의 전송에 실패했습니다.' });
    }
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-grid">
        <label><span>이름 *</span><input name="name" autoComplete="name" required minLength={2} maxLength={60} /></label>
        <label><span>연락처 *</span><input name="phone" autoComplete="tel" inputMode="tel" required minLength={8} maxLength={30} /></label>
        <label><span>이메일 *</span><input name="email" type="email" autoComplete="email" required maxLength={120} /></label>
        <label><span><CalendarDays /> 상담 희망일</span><input name="preferredDate" type="date" min={minDate} /></label>
      </div>
      <label><span>문의 유형 *</span><select name="type" required defaultValue=""><option value="" disabled>선택해 주세요</option><option>사업·투자 검토</option><option>건축·엔지니어링 협업</option><option>부지·운영 협의</option><option>미디어·기타</option></select></label>
      <label><span>문의 내용 *</span><textarea name="message" rows={6} required minLength={20} maxLength={2000} placeholder="검토 목적, 소속, 희망 협의 범위를 20자 이상 적어 주세요." /></label>
      <label className="honeypot" aria-hidden="true"><span>Website</span><input name="website" tabIndex={-1} autoComplete="off" /></label>
      <label className="consent"><input name="consent" type="checkbox" value="yes" required /><span><Check /> 문의 응대를 위해 이름·연락처·이메일을 수집하고 최대 1년 보관하는 데 동의합니다. 철회 요청 시 지체 없이 삭제합니다. *</span></label>
      <div className="form-footer">
        <p>본 문의는 예약·투자계약이 아닙니다. 실제 사업 조건은 별도 실사와 계약을 거쳐 확정됩니다.</p>
        <button type="submit" disabled={state.status === 'loading'}>{state.status === 'loading' ? <LoaderCircle className="spin" /> : <Send />} 문의 보내기</button>
      </div>
      {state.status !== 'idle' && <div className={`form-status ${state.status}`} role="status">{state.message}</div>}
    </form>
  );
}
