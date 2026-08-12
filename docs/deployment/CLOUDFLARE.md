# Cloudflare Pages + D1 배포 가이드

2026-08-12 Cloudflare 공식 문서와 Wrangler 4 기준으로 작성했다.

## 1. 계정 확인

```powershell
npx wrangler --version
npx wrangler whoami
```

의도한 계정이 아니라면 사용자가 직접 `npx wrangler login`으로 인증한다. API 토큰을 채팅이나 저장소에 넣지 않는다.

## 2. D1 생성과 스키마

```powershell
npx wrangler d1 create ai-bunker-tacoma-db
```

출력된 `database_id`로 `wrangler.jsonc`의 개발용 영(0) UUID를 교체한다.

```jsonc
"d1_databases": [{
  "binding": "DB",
  "database_name": "ai-bunker-tacoma-db",
  "database_id": "실제 ID"
}]
```

그다음 타입과 원격 스키마를 적용한다.

```powershell
npx wrangler types
npx wrangler d1 migrations apply ai-bunker-tacoma-db --remote
```

## 3. Pages 프로젝트와 직접 배포

```powershell
npm ci
npm run typecheck
npm test
npm run build
npx wrangler pages project create ai-bunker-house-tacoma
npx wrangler pages deploy dist --project-name ai-bunker-house-tacoma
```

`functions/` 폴더는 Pages 프로젝트 루트에 있어야 하며 `dist/` 안으로 옮기지 않는다. Direct Upload 시 Wrangler가 Functions와 정적 자산을 함께 처리한다.

## 4. GitHub 연결

- Framework preset: Vite
- Build command: `npm run build`
- Build output: `dist`
- Root directory: 저장소 루트
- Production branch: `main`
- Node.js: Vite 8 요구사항을 충족하는 버전

Pages Settings > Bindings에서 Preview와 Production 모두 D1 바인딩 이름을 `DB`로 연결한다. 환경별 바인딩은 자동 상속된다고 가정하지 않는다.

## 5. 배포 검증

```powershell
npx wrangler pages deployment list --project-name ai-bunker-house-tacoma
```

익명 브라우저에서 다음을 확인한다.

1. `/`와 앵커 URL이 로그인 없이 열린다.
2. `/images/hero/tacoma-gateway-dusk.webp`가 열린다.
3. `/brochure/ai-bunker-house-tacoma-brochure.pdf`가 열린다.
4. 유효한 문의 1건이 성공하고 D1에 생성된다.
5. 유효하지 않은 데이터는 422, DB 미연결은 503을 반환한다.
6. 보안 헤더와 캐시 헤더가 적용된다.

## 공식 문서

- Pages Functions: https://developers.cloudflare.com/pages/functions/get-started/
- Pages Bindings: https://developers.cloudflare.com/pages/functions/bindings/
- Pages Build config: https://developers.cloudflare.com/pages/configuration/build-configuration/
- Workers Best Practices: https://developers.cloudflare.com/workers/best-practices/workers-best-practices/
