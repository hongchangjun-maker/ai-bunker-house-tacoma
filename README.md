# AI벙커하우스 1호 — 타코마 장수 리조트 콘셉트

전북특별자치도 장수군 계남면 장수로 2662-11의 기존 관광농원 부지 재생 가능성을 바탕으로 한 공개형 건축 콘셉트 웹사이트입니다.

> 이 저장소는 비공식 건축 프레젠테이션입니다. 타코마 장수 관광농원, 소유자, 운영자, 장수군 또는 관계 기관의 공식 사업·예약·판매 사이트가 아닙니다. 현재 운영 상태, 권리, 인허가, 공사비, 안전성, 144명 수용 및 5년 자립 성능은 검증·승인되지 않았습니다.

## 구현 범위

- 반응형 React 19 + TypeScript 웹
- 사용자 제공 실제 본관 전경 1종과 그 외관을 기준으로 만든 실사형 AI 디펜스 투어 5장면
- 대규모 태양광·미니 풍력·CCTV·외곽 철조망·모래주머니 방호선·로봇/드론 순찰 콘셉트
- AVIF/WebP 이중 포맷, 640/1280/약 1690px 반응형 변형, 지연 로딩과 1년 정적 캐시
- 주소 기반 OpenStreetMap 임베드 및 외부 지도 링크
- 근거 출처와 확인 필요 사항 분리
- 지상-지하 구조 개념 단면도
- B1~B6 인터랙티브 층별 탐색
- 144명·5년 운영 시스템과 단계별 시나리오
- 국문/영문 주요 카피 전환
- 확대 갤러리, PDF 브로슈어 다운로드
- Cloudflare Pages Function + D1 문의 저장 API
- 스팸 허니팟, 본문 크기 제한, 입력 검증, 동일 이메일 속도 제한

운영 로그는 Pages Functions 대시보드 또는 `wrangler pages deployment tail`로 확인합니다.

## 로컬 실행

```powershell
cd C:\path\to\ai-bunker-house-tacoma
npm install
npm run dev
```

브라우저에서 터미널에 표시된 로컬 주소를 엽니다. 정적 Vite 개발 서버만 실행하면 `/api/inquiries`는 연결되지 않습니다. 문의 저장까지 시험하려면 아래 D1 설정을 마친 뒤 Cloudflare 로컬 개발 명령을 사용합니다.

```powershell
npm run build
npx wrangler d1 migrations apply ai-bunker-tacoma-db --local
npm run cf:dev
```

## 품질 검증

```powershell
npm run typecheck
npm test
npm run build
npx wrangler pages functions build --outdir .wrangler/functions-build
```

브라우저 검증 항목은 `docs/planning/QA.md`를 참고합니다.

## Cloudflare Pages + D1 배포

1. `npx wrangler whoami`로 올바른 계정을 확인합니다.
2. `npx wrangler d1 create ai-bunker-tacoma-db`를 실행합니다.
3. 출력된 `database_id`로 `wrangler.jsonc`의 개발용 영(0) UUID를 교체합니다.
4. `npx wrangler types`로 바인딩 타입을 갱신합니다.
5. `npx wrangler d1 migrations apply ai-bunker-tacoma-db --remote`를 실행합니다.
6. `npm run build` 후 `npm run cf:deploy`를 실행합니다.
7. Cloudflare 대시보드의 Pages 프로젝트 > Settings > Bindings에서 프로덕션/프리뷰 환경의 D1 바인딩 이름이 모두 `DB`인지 확인합니다.
8. 익명 브라우저에서 홈, 이미지, PDF, 문의 API를 재검증합니다.

Git 연결 배포에서는 Build command를 `npm run build`, output directory를 `dist`, Node.js 버전을 Vite 8 호환 버전으로 지정합니다. 상세 절차는 `docs/deployment/CLOUDFLARE.md`에 있습니다.

## 문의 데이터 운영

문의에는 이름, 연락처, 이메일 등 개인정보가 포함됩니다.

- 접근 권한은 최소 관리자에게만 부여합니다.
- 접수 목적이 끝났거나 1년이 지나면 삭제합니다.
- CSV를 공개 저장소나 브라우저 번들에 포함하지 않습니다.
- 운영 전 개인정보 처리방침과 담당자 연락처를 실제 사업 주체가 확정해야 합니다.
- `status='deleted'` 표기만 하지 말고, 보존 의무가 없다면 실제 행 삭제 또는 비식별화를 수행합니다.

## 콘텐츠 수정

- 층별/시스템/출처: `src/data/project.ts`
- 주요 페이지 카피: `src/App.tsx`
- 색상·반응형: `src/styles/index.css`
- 현장 원본: `docs/reference/tacoma-jangsu-site-photo-2026-08-12.jpeg` (사용자 제공, 2026-08-12)
- 디펜스 투어 이미지: `public/images/site/defense-*`의 AVIF/WebP 폭별 변형
- 이미지 최적화: `python scripts/optimize_images.py 원본 대상기본명 --widths 640 1280`
- 브로슈어: `scripts/build_brochure.py` 수정 후 다시 실행
- 문의 스키마: `migrations/`에 새 순번의 마이그레이션 추가

이미지 교체 시 저작권, 인물권, 상표권을 확인하고 AI 이미지에는 콘셉트 표기를 유지합니다.

## 문서

- `docs/planning/RESEARCH.md` — 공개 리서치와 사실/가정 구분
- `docs/planning/DESIGN-SYSTEM.md` — 디자인 체계
- `docs/planning/QA.md` — 검증 체크리스트
- `docs/prompts/IMAGE-PROMPTS.md` — 생성 비주얼 프롬프트 기록
- `docs/deployment/CLOUDFLARE.md` — Pages/D1 배포
- `docs/MAINTENANCE.md` — 유지보수·개인정보 삭제
- `docs/ROADMAP.md` — 확장 로드맵

## 라이선스 주의

프로젝트의 독자 소스와 생성 자산을 배포하기 전에 실제 사업 주체가 별도 라이선스를 정해야 합니다. OpenStreetMap 지도 데이터는 ODbL이며 사이트 하단에 저작자 표시 링크가 있습니다. 외부 출처의 사진은 저장소에 포함하지 않았습니다.
