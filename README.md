# 스위치원 프론트엔드 과제

실시간 환율을 조회하고 원화↔외화 환전을 수행하는 서비스

## 기술 스택

Core : Next.js 16 (App Router), TypeScript
Package Manager : pnpm
Styling : tailwind CSS, shadcn/ui (component library)
State & Data Fetching : TanStack Query, Zustand
Form & Validation: React Hook Form, zod
ETC: prettier, husky, lint-stage

## 의사 결정 요소들

구현을 하면서 고민을 했던 요소들입니다.

### 1. 토큰 저장 방식

초기에 토큰 저장 방식에 대해서 고민했습니다.

- LocalStorage
- Cookie (httpOnly)

LocalStorage에 저장하는 방식은 구현이 간단하지만 XSS 공격 취약 및 SSR 활용이 불가하기 떄문에 Cookie에 토큰을 선택하는 방식을 채택했습니다.

### 2. CORS 및 httpOnly 쿠키 제약 해결

쿠키 방식을 선택한 후, 실제 API를 호출하는 과정에서 백엔드 규격과 충돌하는 문제가 발생했습니다.

문제 상황: 백엔드 API는 모든 요청 헤더에 Authorization: Bearer {token}을 요구합니다. 하지만 httpOnly 쿠키는 보안상 클라이언트 코드(JS)에서 값을 꺼낼 수 없기 때문에, 브라우저가 직접 헤더에 토큰을 담아 보낼 방법이 없었습니다. 게다가 백엔드 서버에 CORS가 설정되어 있지 않아 브라우저에서의 직접 호출 자체가 차단된 상태였습니다.

해결 모색:

1. 처음에는 `next.config.js`의 `rewrites` 기능을 검토했습니다. 하지만 `rewrites`는 단순한 주소 연결일 뿐, 서버에 저장된 쿠키를 읽어 헤더에 토큰을 동적으로 주입하는 로직을 담을 수 없다는 한계가 있었습니다.
2. 따라서 단순 포워딩이 아닌, 직접 요청을 가로채서 가공할 수 있는 `BFF(Backend For Frontend` 방식이 유일한 해결책이라고 판단했습니다.

최종 해결: `app/api/proxy/[...path]` 경로에 Catch-all Route를 구현했습니다.

1. 클라이언트가 프록시 경로로 API를 요청하면 Next.js 서버가 이를 수신합니다.
2. 서버는 쿠키에서 토큰을 꺼내 헤더에 주입합니다.
3. 서버 대 서버 통신을 통해 CORS 문제를 우회하며 백엔드에 데이터를 요청하고 응답 값 그대로 클라이언트에 전달합니다.

이 구조를 통해 보안(쿠키)과 백엔드 요구 규격(헤더 토큰) 사이의 간극을 해결했습니다.
