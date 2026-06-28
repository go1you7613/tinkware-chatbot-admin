# 팅크웨어 AI Chat 사용자 디자인 시스템

> 기준 Figma: `ThinkWare_chatbot`  
> 기준 노드: `1:34` 홈, `1:128` 카테고리 바텀시트, `1:99` 대화 화면  
> 적용 대상: `user/publishing/` 신규 퍼블리싱 산출물  
> 폰트 파일: `user/publishing/font/`  
> 아이콘 파일: `user/publishing/image/icon/`  
> CSS 로드 순서: `fonts.css` → `tokens.css` → `components.css` → 화면별 CSS

---

## 1. 시스템 원칙

이 디자인 시스템은 모바일 웹 페이지가 아니라 **웹 기반 챗봇 위젯**을 기준으로 한다. Figma의 400px 폭은 기준 시안 폭일 뿐이며, 실제 퍼블리싱에서는 서비스 페이지 안에 삽입될 수 있도록 패널 단위로 독립적인 스타일을 유지한다.

- `tokens.css`의 `--twc-*` 변수만 디자인 값의 원천으로 사용한다.
- `components.css`의 `.twc-*` 컴포넌트를 우선 사용하고, 화면별 CSS는 배치와 예외 상태만 담당한다.
- 기존 `user/*.html`, `user/css/*`, `user/js/*`는 기능 흐름 참조용이며 최종 스타일 기준이 아니다.
- 기존 프로토타입의 블루 계열 `#0b73d9`, `#006bd6`, `#e0ecfa`, `#d9e8fb`는 최종 퍼블리싱에서 직접 사용하지 않는다.
- 샘플 이미지의 실제 아이콘/스타일은 사용하지 않는다. 아이콘은 Figma 기준 노드에서 추출한 파일만 사용한다.

---

## 2. 반응형 레이아웃 원칙

태블릿처럼 가로 사이즈가 커지는 환경에서도 **별도 웹/데스크톱 버전을 만들지 않는다.** 항상 모바일 챗봇 형태를 유지하면서 챗봇 shell만 부모 컨테이너의 가로 100%를 지원한다.

### 2.1 Shell

- `.twc-chatbot`은 `width: 100%`를 기본으로 한다.
- `--twc-size-app-width: 400px`는 Figma 기준 폭을 기록하기 위한 토큰이며, 실제 shell을 400px로 고정하는 용도로 쓰지 않는다.
- header, main, inputbar, bottom sheet, overlay는 모두 shell 기준으로 가로 100%를 사용한다.
- 태블릿 대응을 이유로 좌우 2단 레이아웃, 데스크톱 사이드바, 웹 전용 hero 영역을 추가하지 않는다.

### 2.2 Content Width

- 본문 콘텐츠는 모바일 챗봇의 읽기 폭을 유지한다.
- 기본 콘텐츠 그룹은 `.twc-content`를 사용하고 shell 안에서 좌우 `20px` 인셋을 유지한다.
- 배경, 보더, radius가 있는 섹션은 시각 영역 자체가 좌우 `20px` 안쪽에 있어야 하며 화면 끝에 닿으면 안 된다.
- 리스트, 대화 영역, 입력바처럼 shell 전체 폭이 필요한 영역은 100%를 사용할 수 있지만, 내부 padding은 spacing token으로만 제어한다.
- 화면이 넓어져도 폰트 크기를 viewport 기준으로 키우지 않는다.

### 2.3 Fixed Shape Lock

원형 박스와 정사각 박스는 화면 가로폭이 커져도 함께 늘어나면 안 된다.

늘어나면 안 되는 요소:

- 아이콘: `.twc-icon`, `.twc-icon-*`
- 아이콘 버튼: `.twc-icon-btn`
- 입력바 카테고리 버튼: `.twc-category-button`
- 전송 버튼: `.twc-send-button`
- 고객지원 원형 버튼: `.twc-support-button`
- empty/status 원형 아이콘: `.twc-empty-icon`, `.twc-status-icon`
- 정사각 상품 이미지/썸네일 영역: `.twc-product-media`, `.twc-square-media`

구현 규칙:

- 고정 형태 요소는 `width`, `height`, `aspect-ratio: 1 / 1`, `flex: 0 0 auto`를 함께 사용한다.
- 부모가 flex/grid여도 원형/정사각 요소에 `flex: 1`, `width: 100%`, `align-self: stretch`를 적용하지 않는다.
- 가로 확장이 필요하면 텍스트/리스트/대화 본문 영역만 늘리고, 아이콘·원형 버튼·정사각 썸네일은 토큰 크기를 유지한다.

### 2.4 Maintainable CSS

- 퍼블리싱 CSS에는 중첩된 `calc()`, `min()`, `max()`, `clamp()` 식을 사용하지 않는다.
- 계산이 필요한 크기와 간격은 먼저 `tokens.css`에 의미 있는 `--twc-*` 토큰으로 등록한 뒤 사용한다.
- `width: min(100%, token)` 대신 `width: 100%`와 `max-width: token`을 함께 사용한다.
- Grid 컬럼은 `repeat(n, 1fr)`처럼 읽기 쉬운 표현을 우선한다.
- 예외적으로 viewport 대응이 필요한 경우에도 식을 중첩하지 않고 `height: token`, `max-height: 80dvh`처럼 분리한다.

---

## 3. Brand

### 3.1 Logo

로고는 상단 중앙의 `AI Chat` 텍스트 로고를 기준으로 한다. `THINKWARE` 워드마크 이미지를 챗봇 헤더 로고로 사용하지 않는다.

| 파일 | 표시 크기 | 실제 크기 | 용도 |
|---|---:|---:|---|
| `user/publishing/image/brand/logo-ai-chat.png` | 52 x 14 | 53 x 14 | 1x 로고 |
| `user/publishing/image/brand/logo-ai-chat@2x.png` | 52 x 14 | 104 x 28 | 고해상도 로고 |

사용 예:

```html
<img
  class="twc-logo"
  src="../image/brand/logo-ai-chat.png"
  srcset="../image/brand/logo-ai-chat@2x.png 2x"
  width="52"
  height="14"
  alt="AI Chat"
>
```

로고 사용 규칙:

- 로고 이미지는 비율을 유지하고, 가로폭 증가에 맞춰 늘리지 않는다.
- 태블릿 대응 시에도 로고 크기는 고정한다.
- `AI Chat` 텍스트 로고는 Figma 노드 `1:37`/`1:38` 기준이다.
- 웹브라우저 주소창 목업 이미지는 최종 퍼블리싱에 사용하지 않는다.

### 3.2 Icon Set

아이콘은 Figma 3개 기준 노드에서 추출한 PNG를 사용한다. 고해상도 모니터 대응을 위해 원본과 `@2x` 파일을 함께 두며, 퍼블리싱에서는 표시 크기를 CSS로 고정한다.

| 토큰/클래스 | 파일 | 표시 크기 | 용도 |
|---|---|---:|---|
| `.twc-icon-md` | `icon-close@2x.png` | 20px | 헤더 닫기 |
| `.twc-icon-sm` | `icon-activity@2x.png` | 14px | 추천 질문 마커 |
| `.twc-icon-lg` | `icon-calendar@2x.png` | 24px | 방문 AS 예약 |
| `.twc-icon-lg` | `icon-phone-call@2x.png` | 24px | 서비스 센터 |
| `.twc-icon-lg` | `icon-home@2x.png` | 24px | 대리점/장착점 |
| `.twc-icon-lg` | `icon-check-square@2x.png` | 24px | 예약관리 |
| `.twc-icon-sm` | `icon-category@2x.png` | 14px | 입력바 카테고리 버튼 |
| `.twc-icon-xs` | `icon-send-plane@2x.png` | 10px | 전송 버튼 |
| `.twc-icon-lg` | `icon-file-search@2x.png` | 24px | 제품 검색/추천 |
| `.twc-icon-lg` | `icon-file-check@2x.png` | 24px | 제품 스펙/사용법 |
| `.twc-icon-lg` | `icon-heart@2x.png` | 24px | 인기/기획전 |
| `.twc-icon-lg` | `icon-box@2x.png` | 24px | 액세서리/소모품 |
| `.twc-icon-lg` | `icon-calendar-active@2x.png` | 24px | 선택된 방문 AS 예약 |
| `.twc-icon-lg` | `icon-map@2x.png` | 24px | 서비스센터/장착점 찾기 |
| `.twc-icon-lg` | `icon-check-square-service@2x.png` | 24px | 예약확인/변경/취소 |
| `.twc-icon-lg` | `icon-message-square@2x.png` | 24px | 자주 묻는 질문 |

아이콘 사용 규칙:

- HTML에는 `<img class="twc-icon twc-icon-lg" src="../image/icon/icon-calendar@2x.png" alt="">` 형식으로 넣는다.
- 장식 아이콘은 `alt=""`를 사용하고, 버튼의 의미는 `aria-label` 또는 텍스트로 제공한다.
- 새 아이콘은 `user/publishing/image/icon/README.md`와 이 표에 먼저 등록한 뒤 사용한다.
- 임의 아이콘 라이브러리, emoji, 샘플 이미지의 아이콘을 추가하지 않는다.

---

## 4. Colors

### 4.1 Brand & Accent

| 토큰 | 값 | 용도 |
|---|---|---|
| `--twc-color-accent` | `#ec321f` | THINKWARE red, 주요 CTA, 선택 상태 |
| `--twc-color-accent-hover` | `#d92a18` | 주요 CTA hover |
| `--twc-color-accent-soft` | `#fff1ef` | 약한 강조 배경, 상태 아이콘 배경 |
| `--twc-color-accent-subtle` | `#fff8f7` | 강조 카드/안내 배경 |
| `--twc-shadow-accent` | `0 6px 5px rgba(207, 93, 93, 0.15)` | 입력바, floating action |

### 4.2 Neutral Ramp

| 토큰 | 값 | 용도 |
|---|---|---|
| `--twc-color-text-primary` | `#000000` | 최상위 텍스트 |
| `--twc-color-text-heading` | `#111111` | 제목 |
| `--twc-color-text-strong` | `#222222` | 강조 본문 |
| `--twc-color-text-body` | `#383838` | 기본 본문 |
| `--twc-color-bubble-user` | `#4c4c4c` | 사용자 메시지 버블 |
| `--twc-color-text-subtle` | `#555555` | 보조 본문 |
| `--twc-color-text-secondary` | `#666666` | 라벨/메타 |
| `--twc-color-text-muted` | `#7e7e7e` | 홈 서브 카피 |
| `--twc-color-text-placeholder` | `#b9b9b9` | placeholder, 시간 |
| `--twc-color-border` | `#f0f0f0` | 기본 보더 |
| `--twc-color-bg` | `#f8f8f8` | 기본 챗봇 배경 |

### 4.3 Semantic Text & Surfaces

| 토큰 | 값 | 용도 |
|---|---|---|
| `--twc-color-surface` | `#ffffff` | 카드, 버튼, 입력창 |
| `--twc-color-surface-muted` | `#f6f7f8` | 약한 카드, 상품 이미지 배경 |
| `--twc-color-surface-raised` | `#fbfdff` | 상태 안내 카드 |
| `--twc-color-surface-disabled` | `#f2f2f2` | 비활성 요소 |
| `--twc-color-surface-inverse` | `#3a3a3a` | 로그인 유도 카드 |
| `--twc-color-success` | `#2e7d32` | 성공/긍정 상태 |
| `--twc-color-warning` | `#ffb300` | 평점/주의 |
| `--twc-color-danger` | `#c73346` | 삭제/취소 위험 액션 |
| `--twc-color-overlay` | `rgba(0, 0, 0, 0.6)` | 바텀시트 dim |

---

## 5. Components

### 5.1 Chat — Chips, Tiles, Bubbles, Input

| 컴포넌트 | 클래스 | 규칙 |
|---|---|---|
| Suggestion chip | `.twc-chip` | 28px 이상, accent soft 배경, micro type |
| Category tile | `.twc-tile` | pill radius, 2열 배치, 68px 고정 높이, 텍스트 좌측 정렬, 선택 시 accent border/text |
| User bubble | `.twc-message-bubble.is-user` | 우측 정렬, `--twc-color-bubble-user`, 흰색 텍스트 |
| AI bubble | `.twc-message-bubble.is-ai`, `.twc-answer-card` | 흰색 카드, hairline border, 14px/28px 본문 |
| Chat input bar | `.twc-chat-inputbar` | 하단 고정 영역, 15px 19px padding |
| Category button | `.twc-category-button` | 32px circle, `icon-category@2x.png` |
| Send button | `.twc-send-button` | 24px circle, accent 배경, `icon-send-plane@2x.png` |

카테고리 바텀시트 규칙:

- 시트 상단의 제목/닫기 버튼 행은 사용하지 않는다.
- 시트는 dim 처리된 영역 밖 터치로 닫혀야 한다.
- 카테고리 시트 안에 별도 입력바를 만들지 않는다. 메뉴 패널은 기존 하단 입력바 위에서 슬라이드되고, 하단 배경 fill만 입력바 뒤로 이어진다.
- 메뉴 패널 하단과 입력바 상단 간격은 `--twc-size-sheet-input-clearance` 기준으로 관리한다.
- 메뉴 패널 높이는 `--twc-size-sheet-panel-height`를 사용하고, 작은 화면 대응은 `max-height`로만 제한한다.
- 시트 패널을 아래로 80px 이상 쓸어내리면 닫혀야 한다.
- 카테고리 버튼 8개는 모두 `--twc-size-category-tile-height: 68px`를 사용하며, padding과 border는 `box-sizing: border-box`로 높이 안에 포함한다.
- 하단 입력창은 시트 안의 고정 하단 영역으로 유지하고, 카테고리 목록만 내부 스크롤한다.

### 5.2 Core — Buttons, App Bar, Headers

| 컴포넌트 | 클래스 | 규칙 |
|---|---|---|
| Button base | `.twc-btn` | 최소 44px 터치 영역, pill radius |
| Primary button | `.twc-btn-primary` | accent 배경, 흰색 텍스트 |
| Secondary button | `.twc-btn-secondary` | 흰색 배경, strong border |
| Ghost button | `.twc-btn-ghost` | 배경 없는 보조 액션 |
| Icon button | `.twc-icon-btn` | 44px 터치 영역, 내부 아이콘 크기는 `.twc-icon-*`로 제어 |
| App bar | `.twc-header` | 40px 높이, 중앙 `AI Chat`, 우측 close |
| Flow header | `.twc-flow-header` | 플로우형 화면, 56px 이상 |
| State header | `.twc-state-header` | 상태 화면, 56px 이상 |

### 5.3 Content — Cards, Empty, Forms, Lists

| 컴포넌트 | 클래스 | 규칙 |
|---|---|---|
| Base card | `.twc-card` | 흰색 표면, strong border, 12px radius |
| Soft card | `.twc-card-soft` | raised surface, 14px radius |
| Product card | `.twc-product-card` | 상품 추천/비교, card shadow |
| Product media | `.twc-product-media` | muted surface, md radius |
| Square media | `.twc-square-media` | 가로폭이 커져도 1:1 비율 유지 |
| Support shortcut | `.twc-support-button` | 87px 원형 바로가기, 가로폭 증가 시 크기 고정 |
| Place card | `.twc-place-card` | 서비스센터/장착점 |
| State card | `.twc-state-card` | 로그인 필요, 예약 없음, 네트워크 오류 |
| Form card | `.twc-form-card` | 로그인/예약 입력 그룹 |
| Input | `.twc-input` | 44px 이상, control radius |
| Textarea | `.twc-textarea` | 96px 이상, vertical resize |
| Label | `.twc-label`, `.twc-form-label` | 14px bold |
| Helper/Error | `.twc-helper`, `.twc-error` | 12px caption, error는 danger |
| Empty icon | `.twc-empty-icon` | 72px 원형 상태 아이콘 |
| Status icon | `.twc-status-icon` | 82px 원형 상태 아이콘 |
| Detail list | `.twc-detail-list`, `.twc-detail-row` | key-value 정보 목록 |

### 5.4 Prototype Scroll Coverage Components

`chatbot_home.html`의 스크롤 하단에는 홈 화면 이후에도 다수의 대화/상품/상태 예시가 이어진다. 최종 퍼블리싱은 첫 화면만 구현하면 안 되며, 아래 컴포넌트가 모두 디자인 시스템 안에 있어야 한다.

| 원본 영역 | 컴포넌트 | 필수 토큰/규칙 |
|---|---|---|
| 텍스트 답변 예시 | `.twc-answer-card`, `.twc-answer-feedback` | `--twc-size-answer-max-width`, relaxed body, card radius |
| 이미지 참조 답변 | `.twc-reference-media`, `.twc-reference-caption` | media는 정사각/고정 비율 유지, width stretch 금지 |
| 답변 생성 중 | `.twc-typing`, `.twc-typing-dot` | `is-loading`, `aria-live="polite"` 병행 |
| 상품 추천 카드 | `.twc-recommend-card` | `--twc-size-product-card-width`, `--twc-size-product-media-height` |
| 상품 비교 카드 | `.twc-compare-track`, `.twc-compare-card`, `.twc-spec-table` | horizontal scroll, 카드 폭 고정, shell 확장 시 카드 늘림 금지 |
| 가격/평점 | `.twc-rating`, `.twc-price-block` | `--twc-type-score-*`, `--twc-type-price-*` |
| 검색 결과 없음 답변 | `.twc-empty-answer`, `.twc-empty-actions` | empty icon 고정, 추천 액션은 버튼 토큰 사용 |
| 상담 종료 CTA | `.twc-chat-end` | survey-flow 진입 버튼, 별도 웹 CTA 섹션 금지 |

### 5.5 Prototype Click Coverage Components

원본의 클릭 요소는 단순 버튼 모양이 아니라 상태 화면을 출력한다. 아래 컴포넌트/상태가 빠지면 디자인 시스템 미완성으로 본다.

| 클릭 출발점 | 출력 화면/상태 | 디자인 시스템 컴포넌트 |
|---|---|---|
| 로그인 카드 버튼 | 로그인 full page, 로그인 후 보유제품 등록 상태, 등록 완료 상태 | `.twc-auth-flow`, `.twc-owned-product`, `.twc-owned-product-empty` |
| 헤더 X, 종료하기 | 상담 경험 조사 | `.twc-survey-flow`, `.twc-segment`, `.twc-score-grid`, `.twc-reason-grid` |
| 입력바 카테고리 버튼 | 카테고리 바텀시트 | `.twc-sheet`, `.twc-tile`, `.twc-chat-inputbar` |
| 방문 AS 예약 | AS 5단계 full page | `.twc-as-flow`, `.twc-step-indicator`, `.twc-calendar`, `.twc-time-grid`, `.twc-complete-card` |
| 서비스센터/장착점 찾기 | 지도, 탭, 목록, 장소 액션 | `.twc-locator-flow`, `.twc-map`, `.twc-place-card`, `.twc-place-actions` |
| 예약 확인·변경·취소 | 조회 폼, 예약 목록, 상세, 취소 확인 | `.twc-reservation-flow`, `.twc-query-card`, `.twc-confirm-card` |
| FAQ | FAQ 리스트, FAQ 상세 | `.twc-faq-list`, `.twc-faq-detail` |
| 제품 검색·추천 | 검색 조건, 추천 결과 | `.twc-product-flow`, `.twc-product-card` |
| 제품 스펙·사용법 | 제품 세그먼트, 스펙 표, 사용법 문서 | `.twc-spec-flow`, `.twc-segment`, `.twc-spec-table`, `.twc-doc-card` |
| 액세서리·소모품 | 소모품 카드 그리드 | `.twc-mini-card`, `.twc-card-grid` |
| 인기·기획전 | 기획전 배너 카드 | `.twc-banner-card` |
| 상태 화면 모음 | 검색 결과 없음, 예약 없음, 로그인 필요, 네트워크 오류 | `.twc-state-card`, `.twc-empty-icon`, `.twc-status-icon` |

### 5.6 Flow-Specific Components

| 컴포넌트 | 클래스 | 규칙 |
|---|---|---|
| Auth flow | `.twc-auth-flow` | full-screen flow, app bar logo는 `AI Chat`, social login은 브랜드색보다 토큰 spacing/radius 우선 |
| Captcha placeholder | `.twc-captcha-card` | 실제 reCAPTCHA가 아니면 더미임을 UI copy로 숨기지 않는다 |
| Owned product empty | `.twc-owned-product-empty` | 로그인 후 보유제품 0개 상태 |
| Owned product card | `.twc-owned-product-card` | 제품 이미지, 모델명, 등록 정보, 추가 CTA |
| Locator map | `.twc-map` | `--twc-size-map-height`, 지도 이미지는 object-fit cover |
| Map pin | `.twc-map-pin` | `--twc-size-map-pin`, 텍스트와 아이콘 고정 크기 |
| Calendar | `.twc-calendar`, `.twc-calendar-cell` | `--twc-size-calendar-cell`, 선택/비활성 상태 분리 |
| Time grid | `.twc-time-grid` | disabled, selected 상태 필수 |
| Progress step | `.twc-progress-step` | 5단계 AS 진행 표시 |
| Confirm card | `.twc-confirm-card` | 위험 액션은 danger 토큰만 사용 |
| Mini card | `.twc-mini-card` | 액세서리/소모품 카드 |
| Banner card | `.twc-banner-card` | 프로모션/기획전 카드, 장식 gradient 금지 |

---

## 6. Spacing

### 6.1 Spacing Scale

간격은 4px 기반 리듬을 우선으로 하되, Figma 수치가 있는 경우 보조 토큰을 허용한다.

| 토큰 | 값 | 용도 |
|---|---:|---|
| `--twc-space-4` | 4px | 원형 버튼 gap |
| `--twc-space-6` | 6px | 아이콘+텍스트 gap |
| `--twc-space-8` | 8px | 입력 내부 gap |
| `--twc-space-10` | 10px | 카테고리 tile gap |
| `--twc-space-14` | 14px | 섹션 내부 gap |
| `--twc-space-15` | 15px | 입력바/버블 padding |
| `--twc-space-16` | 16px | 카드 내부 기본 gap |
| `--twc-space-20` | 20px | 화면 좌우 padding, 답변 카드 |
| `--twc-space-24` | 24px | 큰 그룹 간격 |
| `--twc-space-30` | 30px | 대화 묶음 하단 gap |
| `--twc-space-32` | 32px | 상태 화면 간격 |
| `--twc-space-50` | 50px | 홈 주요 섹션 간격 |
| `--twc-space-60` | 60px | 긴 스크롤 예시 섹션 간격 |
| `--twc-space-72` | 72px | 하단 입력바 회피 padding |

### 6.2 Radii & Shadows

| 토큰 | 값 | 용도 |
|---|---:|---|
| `--twc-radius-sm` | 6.472px | 로그인 작은 버튼 |
| `--twc-radius-control` | 8px | 입력, 작은 제어 요소 |
| `--twc-radius-md` | 10.354px | 로그인 카드 |
| `--twc-radius-card` | 12px | 상품/리스트 카드 |
| `--twc-radius-panel` | 14px | 정보 패널 |
| `--twc-radius-xl` | 16px | 상태/폼 카드 |
| `--twc-radius-lg` | 20px | AI 답변 카드, 바텀시트 |
| `--twc-radius-pill` | 100px | 입력창, tile, 사용자 버블 |
| `--twc-shadow-header` | `0 1px 2.5px rgba(0, 0, 0, 0.1)` | 상단 헤더 |
| `--twc-shadow-card` | `0 2px 8px rgba(0, 0, 0, 0.06)` | 상품 카드 |
| `--twc-shadow-panel` | `0 8px 24px rgba(0, 0, 0, 0.08)` | 패널 |
| `--twc-shadow-float` | `0 10px 24px rgba(0, 0, 0, 0.1)` | floating 입력/지도 현재위치 버튼 |
| `--twc-shadow-sheet` | `0 -12px 32px rgba(0, 0, 0, 0.18)` | 바텀시트 |

---

## 7. Type

### 7.1 Body & Label

| 토큰 | 값 | 용도 |
|---|---|---|
| `--twc-font-system` | `Noto Sans KR`, `Noto Sans CJK KR` | 폼, 대화 본문, 카테고리 |
| `--twc-font-body` | `A2Z`, `Noto Sans KR` | 홈 설명, 퀵 질문, 라벨 |
| `--twc-type-body-*` | 14px / 20px / 400 | 기본 본문 |
| `--twc-type-body-relaxed-*` | 14px / 28px | AI 긴 답변 |
| `--twc-type-label-*` | 14px / normal / 700 | 섹션/폼 라벨 |
| `--twc-type-caption-*` | 12px / 16px / 400 | 시간, placeholder, helper |
| `--twc-type-micro-*` | 11px / 14px / 400 | 바로가기 라벨, 작은 배지 |

줄바꿈 규칙:

- 챗봇 전체 텍스트는 `word-break: keep-all`을 기본으로 하여 단어 단위 줄바꿈을 우선한다.
- 특정 시안에서 명확히 필요한 경우를 제외하고 메뉴 라벨에 `<br>`로 강제 줄바꿈을 넣지 않는다.

### 7.2 Display — Paperlogy

| 스타일 | 토큰 | 값 | 용도 |
|---|---|---|---|
| H1 | `--twc-type-h1-*` | 24px / 32px / 700 | 홈 메인 타이틀 |
| H2 | `--twc-type-h2-*` | 21px / 28px / 800 | 상태 화면 핵심 메시지 |
| H3 | `--twc-type-h3-*` | 17px / 24px / 700 | 섹션 제목, 답변 소제목 |
| H4 | `--twc-type-h4-*` | 15px / 22px / 700 | 카드 제목 |
| App bar | `--twc-type-header-*` | 14px / 14px / 700 | `AI Chat` |

### 7.3 Type Scale

퍼블리싱에서는 아래 유틸리티를 우선 사용한다.

| 클래스 | 용도 |
|---|---|
| `.twc-h1` | 최상위 화면 제목 |
| `.twc-h2` | 상태 화면 제목 |
| `.twc-h3` | 섹션 제목 |
| `.twc-h4` | 카드/목록 제목 |
| `.twc-body` | 기본 본문 |
| `.twc-body-relaxed` | 긴 답변/문서 본문 |
| `.twc-caption` | 시간/placeholder/보조 캡션 |
| `.twc-label` | 섹션/폼 라벨 |

---

## 8. 프로토타입 분석 결과와 보강 범위

분석 대상은 `user/chatbot_home.html`, `user/empty_reservations.html`, `user/login_required.html`, `user/network_error.html`이다.

`user/chatbot_home.html`은 긴 스크롤형 홈/대화 예시와 클릭으로 열리는 full page flow를 동시에 포함한다. 디자인 시스템 완성 여부는 첫 화면이 아니라 아래 커버리지 전체로 판단한다.

### 8.1 Scroll Coverage

| 원본 순서 | 화면/영역 | 디자인 시스템 포함 여부 기준 |
|---:|---|---|
| 1 | 홈 타이틀/서브타이틀 | `.twc-h1`, `.home-intro`, accent title 규칙 |
| 2 | 추천 질문 5개 | `.suggestion-button`, activity icon |
| 3 | 내 제품 로그인 카드 | `.login-banner`, `.twc-auth-flow` |
| 4 | 로그인 후 보유제품 없음/등록/등록완료 | `.twc-owned-product-empty`, `.twc-owned-product-card` |
| 5 | 고객지원 4개 바로가기 | `.twc-support-button`, fixed shape lock |
| 6 | 기본 채팅 추천 답변 | `.twc-message-bubble`, `.twc-answer-card` |
| 7 | 텍스트 기반 긴 답변 | `.twc-answer-card`, `.twc-body-relaxed`, feedback button |
| 8 | 참조 이미지 포함 답변 | `.twc-reference-media`, `.twc-reference-caption` |
| 9 | 답변 생성 중 typing | `.twc-typing`, `is-loading`, `aria-live` |
| 10 | 추천 상품 카드 | `.twc-recommend-card`, `.twc-price-block`, `.twc-rating` |
| 11 | 상품 비교 카드 3개 | `.twc-compare-track`, `.twc-compare-card`, `.twc-spec-table` |
| 12 | 구매전문가 연결 CTA | `.twc-chat-cta`, button token |
| 13 | 검색 결과 없음 답변 | `.twc-empty-answer`, `.twc-empty-actions` |
| 14 | 상담 종료 섹션 | `.twc-chat-end`, survey flow 연결 |

### 8.2 Click Coverage

| 클릭 요소 | 기대 출력 | 검수 방식 |
|---|---|---|
| 로그인 버튼 | 로그인 full page 열림 | `#auth-flow.is-open` 확인 |
| 로그인 submit | 보유제품 없음/등록 상태 전환 | `.twc-owned-product-empty` 또는 `.twc-owned-product-card` 확인 |
| 보유제품 등록 | 등록 완료 카드 전환 | 보유제품 카운트/제품 카드 확인 |
| 헤더 닫기 | 상담 경험 조사 열림 | `#survey-flow.is-open` 확인 |
| 상담 종료하기 | 상담 경험 조사 열림 | `#survey-flow.is-open` 확인 |
| 카테고리 버튼 | 바텀시트 열림 | `#categorySheet.is-open` 확인 |
| 카테고리 8개 타일 | 각 feature/as/locator/reservation/faq flow 열림 | 해당 flow `is-open` 확인 |
| FAQ 리스트 | FAQ 상세 전환 | `[data-faq-panel="detail"].is-active` 확인 |
| locator 탭 | 대리점/서비스센터 패널 전환 | tab aria-selected와 panel active 확인 |
| AS 다음/이전 | 1~5단계 전환 | step text/progress/panel active 확인 |
| AS 센터/날짜/시간 | 선택 상태 전환 | `is-selected` 확인 |
| 설문 선택 | segmented/score/reason 선택 상태 전환 | `is-selected` 확인 |
| 입력 전송/추천 질문 | 사용자 메시지와 AI 응답 추가 | 메시지 row 수 증가 확인 |

이 표를 기준으로 QA 자동화가 작성되어야 하며, 일부 버튼만 샘플로 클릭하는 검수는 완료로 인정하지 않는다.

| 이탈 요소 | 기존 프로토타입 특징 | 디자인 시스템 처리 |
|---|---|---|
| 독립 상태 화면 | 390×844 전화 프레임, 82px 헤더, inline CSS | `.twc-state-header`, `.twc-state-card`, `.twc-empty-icon`, `.twc-btn-*` |
| 블루 액션 컬러 | `#0b73d9`, `#006bd6`, `#e0ecfa`, `#d9e8fb` 반복 | 직접 사용 금지. accent/semantic 토큰으로 치환 |
| 상품 추천/비교 카드 | 이미지 박스, 배지, 평점, 가격, CTA | `.twc-product-card`, `.twc-product-media`, `.twc-badge`, `.twc-price` |
| 검색 결과 없음/예약 없음 | 큰 원형 아이콘, 안내 카드, 추천 액션 | `.twc-empty-icon`, `.twc-state-card`, `.twc-detail-list` |
| 폼/로그인/예약 입력 | input, textarea, captcha, 동의 체크, 단계 입력 | `.twc-input`, `.twc-textarea`, `.twc-form-card`, `.twc-label`, `.twc-helper` |
| 센터/장착점 찾기 | 지도, 핀, 탭, 장소 카드, 태그 | `.twc-segment`, `.twc-place-card`, `.twc-chip`, `.twc-detail-row` |
| FAQ/문서 카드 | 리스트 카드, 상세 문서, pill 카테고리 | `.twc-card`, `.twc-chip`, `.twc-body-relaxed` |
| 상담 종료 설문 | segmented, score grid, reason chips | `.twc-segment`, `.twc-chip`, `.twc-btn-primary` |
| 위험/취소 액션 | 예약 취소, 삭제성 버튼 | `--twc-color-danger`, `.twc-error` |
| 소셜 로그인 | 외부 브랜드색 필요 | 브랜드 예외만 허용. spacing/radius/type은 토큰 사용 |

---

## 9. 상태와 인터랙션

| 상태 | 클래스 | 규칙 |
|---|---|---|
| 열림 | `is-open` | 바텀시트, 플로우 표시 |
| 활성 | `is-active` | 현재 탭/화면 |
| 선택 | `is-selected` | 카테고리 옵션, 설문 선택 |
| 비활성 | `is-disabled` | `aria-disabled="true"` 병행 |
| 로딩 | `is-loading` | AI 응답 생성 중 |
| 에러 | `is-error` | `.twc-error`와 `aria-invalid="true"` 병행 |

모든 JS 연결 요소에는 `data-js`, `data-action`, `data-flow-target` 중 하나를 사용한다. 스타일 전용 클래스만으로 JS를 연결하지 않는다.

---

## 10. 퍼블리싱 준수 체크리스트

- HTML import 순서는 `fonts.css` → `tokens.css` → `components.css` → 화면별 CSS인가?
- 모바일 챗봇 형태를 유지한 채 shell 가로 100%를 지원하는가?
- 태블릿 대응을 이유로 별도 웹/데스크톱 레이아웃을 만들지 않았는가?
- 원형/정사각 요소가 가로폭 증가에 따라 늘어나지 않도록 고정 크기와 `aspect-ratio`를 유지했는가?
- 색상, 폰트, spacing, radius, shadow, icon size를 직접 하드코딩하지 않았는가?
- 신규 색상/폰트/radius/shadow/icon을 만들기 전에 이 문서와 `tokens.css`를 먼저 갱신했는가?
- 프로토타입의 블루 컬러를 직접 복사하지 않았는가?
- inline style을 사용하지 않았는가?
- 아이콘은 `user/publishing/image/icon/`의 Figma 추출 파일만 사용하는가?
- 클릭 가능한 요소가 `button` 또는 적절한 role/keyboard 처리를 갖는가?
- 상태 class와 `aria-*`가 함께 갱신되는가?
- 실제 개인정보처럼 보이는 더미 데이터를 쓰지 않았는가?
- 기존 `user/` 루트 파일을 최종 산출물처럼 수정하지 않았는가?
- 원본 `chatbot_home.html`의 스크롤 하단까지 내려가며 모든 섹션을 퍼블리싱 산출물과 대조했는가?
- 원본 `chatbot_home.html`의 클릭 가능한 요소를 유형별로 모두 클릭해 출력 화면/상태를 확인했는가?
- QA 자동화에 스크롤 전체 캡처, 카테고리 8개 타일, 로그인 후 상태, AS 5단계, locator 탭, FAQ 상세, 설문 선택, 입력 전송 검증이 포함되어 있는가?

이 체크리스트를 통과하지 못하는 퍼블리싱은 디자인 시스템 미준수로 본다.
