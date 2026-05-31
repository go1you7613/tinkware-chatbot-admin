# Admin Source Session Handoff

최종 업데이트: 2026-05-31

---

## 현재 작업 위치

- 프로젝트 루트: `/Users/tanauxd/Dropbox/100.DEV/팅크웨어_챗봇`
- 관리자 실작업: `admin/src/`
- 관리자 프로토타입: `admin/prototype/` (이전 단계 산출물, 신규 작업 기준 아님)
- 로컬 서버: `python3 -m http.server 8000` → `http://127.0.0.1:8000/admin/src/`

---

## 새 세션 시작 시 먼저 읽을 파일

1. `admin/AGENTS.md` — 운영 규칙, 현재 작업 상태, 다음 세션 지시
2. `admin/docs/screen-spec.md` — 전체 11개 화면 명세 + 완료 상태
3. `admin/design-system.md` — 디자인 토큰, 컴포넌트 규격 (반드시 준수)
4. `admin/src/js/layout.js` — 공통 레이아웃, 메뉴 구조, Workspace Tabs
5. `admin/src/css/admin.css` — 공통 CSS (디자인 시스템 반영)

---

## 완료된 화면 (11개) — src/ 기준

| 파일 | 화면 | 핵심 패턴 |
|------|------|----------|
| `login.html` | 로그인 | 카드 폼, 비밀번호 토글, 유효성 검사, 모달 |
| `index.html` | 대시보드 | 통계 카드, 빠른 메뉴(onclick), 시스템 상태 진행률 |
| `pii-management.html` | 데이터 관리 > PII 패턴 정보 관리 | admin-tab 2개, 토글 리스트, 인라인 폼, 모달 CRUD |
| `anonymization.html` | 데이터 관리 > 익명화 처리 | 2단 분할, 패턴 선택, 범례, PII 하이라이팅 |
| `batch-processing.html` | 데이터 관리 > 일괄 처리 | 스텝4 플로우, 체크박스 설정 패널, 진행률, Master-Detail 그리드 |
| `preprocessing.html` | 데이터 관리 > 데이터 전처리 관리 | 탭 6개, CRUD 목록, KMS 분류, CSV 다운로드 |
| `faq-management.html` | 벡터 DB > FAQ 생성 관리 | 슬라이더, 모드 토글, 검토·승인, 컬렉션 조회 탭 |
| `document-management.html` | 벡터 DB > 문서 정보 관리 | 목록 필터, 상태 뱃지, 슬라이드 상세 패널 |
| `governance.html` | 데이터 거버넌스 > FAQ 거버넌스 관리 | 파이프라인 탭 7개, PDF 워크플로우, Scorecard, Diff View, RAG 검색 |
| `chat-sessions.html` | 채팅 관리 > 채팅 세션 관리 | Master-Detail, 채널/날짜 필터, 대화 타임라인 |
| `kakao-integration.html` | 채팅 관리 > 카카오톡 채널연동 | 연동 상태, Webhook 설정, 응답 포맷, 연결 테스트 |

전체 화면 구현 완료 후 → 최종 QA → 사용자 최종 검수

---

## 메뉴 구조 (layout.js menuGroups)

```
대시보드             → index.html
데이터 관리
  ├── PII 패턴 정보 관리 → pii-management.html       ✅
  ├── 익명화 처리       → anonymization.html          ✅
  ├── 일괄 처리         → batch-processing.html       ✅
  └── 데이터 전처리 관리 → preprocessing.html         ✅
벡터 DB 관리
  ├── FAQ 생성 관리    → faq-management.html          ✅
  └── 문서 정보 관리   → document-management.html     ✅
데이터 거버넌스
  └── FAQ 거버넌스 관리 → governance.html             ✅
채팅 관리
  ├── 채팅 세션 관리   → chat-sessions.html           ✅
  └── 카카오톡 채널연동 → kakao-integration.html      ✅
```

메뉴 수정 방법: `layout.js`의 `AdminLayout.menuGroups` 배열만 수정하면 모든 페이지에 자동 반영.

---

## 공통 레이아웃 구조

모든 페이지(login.html 제외)에 필수:

```html
<body data-admin-menu="[key]" data-admin-submenu="[label]">
  <div id="adminHeader"></div>   <!-- layout.js가 렌더링 -->
  <div id="adminSidebar"></div>  <!-- layout.js가 렌더링 -->
  <div class="main-wrap" id="mainWrap">
    ...
  </div>
  <script src="js/layout.js"></script>
  <script src="js/admin.js"></script>
</body>
```

- **헤더/사이드바:** 각 HTML에 직접 작성 금지. `layout.js`에서만 수정.
- **Workspace Tabs:** 사이드바 2Depth 클릭 시 자동 생성. 마지막 탭 닫으면 대시보드 이동.
- **우측 유틸 날개 패널:** `layout.js`가 자동 렌더링. 4종 유틸 버튼 (PII검출·범례·단어사전·컬렉션상태).

---

## 디자인시스템 핵심 규칙

- **Primary:** `#1890FF` / **BG:** `#F0F2F5` / **Sidebar:** `#001529`
- **탭:** `.admin-tabs` + `.admin-tab` + `.tab-count` (비표준 탭 클래스 금지)
- **버튼:** `.btn-primary`, `.btn-default`, `.btn-danger` (Bootstrap 클래스 혼용 주의)
- **입력:** `.form-input`, `.form-select`
- **토글:** `.toggle-switch` > `input` + `.toggle-slider`
- **신규 컴포넌트:** `design-system.md` § 9 참조 (슬라이더, 파이프라인탭, 모드토글, Diff View, RAG카드 등)

---

## 새 화면 제작 체크리스트

1. `admin/docs/screen-spec.md` 해당 Screen 섹션 확인
2. `body` 태그에 `data-admin-menu`, `data-admin-submenu` 설정
3. 공통 레이아웃 구조 적용 (adminHeader, adminSidebar, mainWrap)
4. `js/layout.js` + `js/admin.js` 로드
5. 탭 → `.admin-tabs` / `.admin-tab` 클래스 사용
6. **모든 버튼에 onclick 또는 addEventListener 연결** (빈 버튼 금지)
7. 삭제·비가역 작업 → `AdminConfirm.show()` 사용
8. 완료 피드백 → `AdminToast.show()` 사용
9. 신규/수정 파일은 `admin/src/`에서 직접 작업

---

## 최종 QA 결과 (2026-05-31)

| 항목 | 결과 |
|------|------|
| JS 문법 (admin.js, layout.js) | ✅ 통과 |
| HTML 참조 파일 (CSS/JS) | ✅ 11개 파일 정상 |
| 공통 레이아웃 구조 | ✅ 정상 |
| 디자인시스템 탭 클래스 준수 | ✅ 비표준 없음 |
| data-admin 속성 매핑 | ✅ 정상 |
| src/ 기준 파일 | ✅ 11개 존재 확인 |
| 발견·수정 이슈 | index.html 빠른 메뉴 onclick 누락 → 수정 완료 |

---

## 주의 사항

- `admin/` 폴더는 git untracked 상태일 수 있음. 작업 전 `git status --short` 확인.
- 공통 헤더/사이드바 수정은 `layout.js`와 `admin.css`에서만 한다.
- 신규 관리자 화면과 공통 파일 수정은 `admin/src/` 기준으로 진행한다.
- `admin/prototype/`은 이전 단계 참고용으로만 사용하고, 사용자가 요청하지 않으면 수정하지 않는다.
- Bootstrap + Tailwind 병용 시 버튼 스타일 충돌 발생 가능. `all: unset` 또는 `!important` 필요할 수 있음.
- 참고 이미지(`admin/docs/ref_images/`)는 스타일 참고용. 이미지에 보이는 탭/메뉴가 곧 화면 구조를 의미하지 않음.
- 디자인시스템에 없는 컴포넌트 필요 시 Ant Design 참고 또는 사용자에게 먼저 질문.
