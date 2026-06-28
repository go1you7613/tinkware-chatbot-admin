# 공통 관리자 페이지 디자인·퍼블리싱 스펙

> 용도: 여러 시스템에 재사용 가능한 관리자 페이지 UI/퍼블리싱 기준  
> 대상: PC 기반 업무형 관리자 시스템  
> 기준 해상도: 1440px Wide  
> 권장 스타일: Ant Design 계열의 업무형 UI  

---

## 1. 기본 방향

- 대상은 PC 기반 관리자 시스템이다.
- 반복 업무, 데이터 조회, 설정, 승인, 처리 상태 관리에 적합한 정돈된 화면을 제공한다.
- 시각적 장식보다 정보 밀도, 탐색성, 조작 안정성을 우선한다.
- 화면은 정적 HTML/CSS/Vanilla JavaScript 또는 프론트엔드 프레임워크로 확장 가능한 구조로 작성한다.
- 백엔드/API/DB 연동 전 단계에서는 더미 데이터를 사용하되, 실제 개인정보처럼 보이는 샘플은 사용하지 않는다.

---

## 2. 기술 스택

- HTML
- CSS
- Vanilla JavaScript
- Bootstrap 5 CDN 사용 가능
- TailwindCSS 사용 가능
- Icon Library 사용 가능
- Web Font 사용 가능
- 빌드 도구는 필수 아님

---

## 3. 레이아웃

```text
┌──────────────────────────────────────────────┐
│ Header 60px                                  │
├──────────────┬───────────────────────────────┤
│ Sidebar      │ Workspace Tabs                │
│ 240px / 64px │ Page Header                   │
│              │ Main Content                  │
└──────────────┴───────────────────────────────┘
```

### Header

- 고정 영역으로 사용한다.
- 권장 높이는 `60px`이다.
- 로고, 사이드바 토글, 알림, 설정, 사용자 프로필 등을 배치한다.

### Sidebar

- 펼침 상태: `240px`
- 접힘 상태: `64px`
- 기본 상태는 펼침을 권장한다.
- 1Depth 메뉴 클릭 시 하위 메뉴를 펼치거나 첫 번째 2Depth 화면으로 이동한다.
- 접힘 상태에서는 아이콘만 표시하고, hover 시 툴팁을 제공한다.

### Content

- 기본 padding은 `24px`를 권장한다.
- 페이지 헤더, 브레드크럼, 워크스페이스 탭, 본문 콘텐츠 순서로 구성한다.
- 카드, 테이블, 폼 중심의 업무형 레이아웃을 사용한다.

### Workspace Tabs

- 메뉴 클릭 시 화면 탭을 생성한다.
- 이미 열린 화면은 새 탭을 만들지 않고 기존 탭을 활성화한다.
- 탭 닫기, 전체 닫기, 기타 닫기 기능을 제공할 수 있다.
- 열린 탭 상태는 `sessionStorage` 등으로 유지할 수 있다.

---

## 4. 컬러 시스템

```css
:root {
  --color-primary: #1890ff;
  --color-primary-hover: #40a9ff;
  --color-primary-active: #096dd9;

  --color-bg-page: #f0f2f5;
  --color-bg-white: #ffffff;
  --color-bg-muted: #fafafa;

  --color-sidebar-bg: #001529;

  --color-text-main: rgba(0, 0, 0, 0.85);
  --color-text-sub: rgba(0, 0, 0, 0.45);
  --color-text-disabled: rgba(0, 0, 0, 0.25);
  --color-text-white: #ffffff;

  --color-border: #d9d9d9;
  --color-border-light: #f0f0f0;

  --color-success: #52c41a;
  --color-warning: #faad14;
  --color-error: #ff4d4f;
}
```

### 사용 기준

- Primary는 주요 버튼, 링크, 활성 상태에 사용한다.
- Page background는 전체 관리자 화면 배경에 사용한다.
- White surface는 카드, 모달, 입력 영역에 사용한다.
- Error/Warning/Success는 상태 표시, 토스트, 배지, 검증 메시지에 사용한다.

---

## 5. 타이포그래피

```css
:root {
  --font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  --font-size-xs: 12px;
  --font-size-sm: 13px;
  --font-size-base: 14px;
  --font-size-md: 16px;
  --font-size-lg: 20px;
  --font-size-xl: 24px;
  --font-size-2xl: 30px;
  --font-size-3xl: 38px;

  --line-height-xs: 20px;
  --line-height-base: 22px;
  --line-height-md: 24px;
  --line-height-lg: 28px;
  --line-height-xl: 32px;
}
```

### 사용 기준

| 용도 | 크기 / 굵기 |
|------|-------------|
| 페이지 타이틀 | `20px / 500` |
| 카드 제목 | `16px / 500` |
| 본문/테이블 | `14px / 400` |
| 테이블 헤더/활성 탭 | `14px / 500` |
| 설명/캡션 | `12px / 400` |

---

## 6. Spacing

8px grid 기반 사용을 권장한다.

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
}
```

---

## 7. Radius / Shadow

```css
:root {
  --radius-base: 2px;
  --radius-card: 4px;
  --radius-lg: 8px;
  --radius-full: 9999px;

  --shadow-card: 0 1px 2px rgba(0,0,0,0.1);
  --shadow-dropdown: 0 6px 16px rgba(0,0,0,0.12);
  --shadow-modal: 0 8px 30px rgba(0,0,0,0.15);
}
```

### 사용 기준

- 버튼, 입력, 태그: `2px`
- 카드, 패널, 드롭다운: `4px`
- 모달, 토스트, 알림: `8px`
- Pill, 아바타: `9999px`

---

## 8. 공통 컴포넌트

### Button

| 크기 | 높이 | 좌우 padding |
|------|------|--------------|
| Small | `24px` | `8px` |
| Default | `32px` | `16px` |
| Large | `40px` | `20px` |

- Primary, Default, Text, Danger, Disabled 상태를 제공한다.
- 버튼 내 아이콘은 `16px` 기준을 권장한다.

### Input

- Default height: `32px`
- Large height: `40px`
- Focus ring:

```css
box-shadow: 0 0 0 2px rgba(24,144,255,0.2);
border-color: #1890ff;
```

### Table

- Header background: `#fafafa`
- Cell padding: `12px 16px`
- Row border: `1px solid #f0f0f0`
- Row hover background: `#fafafa`
- Header text: `14px / 500`, 보조 텍스트 컬러

### Toggle

- 크기: `44px × 22px`
- 활성: Primary color
- 비활성: `rgba(0,0,0,0.25)`
- 전환: `0.2s`

### Modal

- 기본 너비: `520px`
- 소형: `380px`
- 대형: `720px`
- Overlay: `rgba(0,0,0,0.45)`
- Header height: `56px`
- Body padding: `24px`
- Footer padding: `12px 24px`

---

## 9. 공통 UX 패턴

### 9.1 탭 + CRUD

목록 조회, 검색, 추가, 수정, 삭제가 필요한 설정/관리 화면에 적합하다.

```text
상단 탭
────────────────────────
툴바: 검색 + 추가 버튼
목록 테이블
추가/수정 폼 또는 모달
```

### 9.2 Master-Detail

목록과 상세 검토/편집을 함께 제공할 때 사용한다.

```text
┌───────────────────────┬──────────────────┐
│ 목록 영역             │ 상세 패널        │
│ 필터 + 검색 + 테이블  │ 선택 항목 정보   │
└───────────────────────┴──────────────────┘
```

### 9.3 Step Flow

순차 업무에 사용한다.

예:

- 파일 업로드
- 옵션 설정
- 실행
- 결과 확인

### 9.4 2단 분할

좌측 설정, 우측 실행/결과 구조가 필요한 화면에 사용한다.

```text
┌───────────────────┬──────────────────────┐
│ 설정 패널          │ 실행/결과 패널       │
└───────────────────┴──────────────────────┘
```

### 9.5 Pipeline Tabs

여러 처리 단계를 탭으로 표현할 때 사용한다.

- 완료
- 대기
- 진행 중
- 오류

상태 배지를 탭에 함께 표시할 수 있다.

### 9.6 Confirm / Toast / Modal

| 패턴 | 용도 |
|------|------|
| Confirm | 삭제, 초기화, 실행 등 비가역 작업 |
| Toast | 저장, 완료, 오류 피드백 |
| Modal | 추가, 수정, 상세 정보 |
| Drawer | 긴 상세 정보 또는 보조 작업 |

---

## 10. JS 인터랙션 원칙

- 모든 클릭 요소는 동작해야 한다.
- 준비 중 기능도 Toast 또는 상태 변경으로 반응을 제공한다.
- 탭, 모달, 드롭다운, 토글, 사이드바, 상세 패널은 JS로 제어한다.
- 동작 selector는 `data-*` 사용을 권장한다.
- 스타일 전용 class와 JS 동작 selector를 가능한 분리한다.

예:

```html
<button type="button" data-action="open-modal" data-target="createModal">
  추가
</button>
```

---

## 11. 파일 구조 예시

```text
admin/
├── src/
│   ├── index.html
│   ├── login.html
│   ├── page-a.html
│   ├── page-b.html
│   ├── css/
│   │   └── admin.css
│   ├── js/
│   │   ├── layout.js
│   │   └── admin.js
│   └── image/
│       └── logo.png
└── docs/
    ├── design-system.md
    ├── feature-spec.md
    └── screen-spec.md
```

---

## 12. 화면 작성 원칙

- 공통 레이아웃은 가능한 별도 JS 또는 컴포넌트로 분리한다.
- 개별 HTML에는 본문 콘텐츠와 현재 메뉴 식별자만 둔다.
- 반복되는 UI는 공통 CSS/JS 패턴으로 관리한다.
- 화면별 임시 class 난립을 피한다.
- 새 화면 작성 전 기능정의서와 화면 명세를 먼저 확인한다.
- 버튼, 탭, 드롭다운, 모달, 토글 등은 실제 동작하도록 구현한다.

---

## 13. 접근성 기준

- 버튼은 `button` 요소를 사용하고 `type="button"`을 명시한다.
- 모달은 `role="dialog"`와 `aria-modal="true"`를 사용한다.
- 탭은 `role="tablist"`, `role="tab"`, `aria-selected`를 사용할 수 있다.
- 아이콘 버튼에는 `aria-label`을 제공한다.
- 입력 요소에는 label 또는 `aria-label`을 제공한다.
- 키보드로 주요 인터랙션에 접근 가능해야 한다.

---

## 14. 데이터/보안 기준

- 실제 개인정보처럼 보이는 샘플 데이터는 사용하지 않는다.
- 더미 이메일, 전화번호, 주민번호, 주소 등은 실제 형식과 혼동되지 않게 작성한다.
- 인증, 서버 통신, DB 연동은 퍼블리싱 단계에서 임의로 추가하지 않는다.
- 삭제/초기화/실행 같은 비가역 작업은 Confirm을 거친다.
- 위험한 inline script 확산을 피한다.

---

## 15. 검증 기준

### 명령 예시

```bash
node --check admin/src/js/admin.js
node --check admin/src/js/layout.js
python3 -m http.server 8000
```

### 확인 항목

- 레이아웃 깨짐 없음
- 텍스트 겹침 없음
- 클릭 요소 반응 있음
- 탭/모달/토글/드롭다운 동작
- 테이블 hover/선택 상태 정상
- 삭제/초기화 Confirm 제공
- 저장/완료/오류 Toast 제공
- 더미 데이터에 민감정보 없음
- 최소 1280px 이상에서 가로 스크롤과 텍스트 겹침 없음

---

## 16. 전달 체크리스트

- [ ] 기준 해상도에서 주요 화면 확인
- [ ] 공통 레이아웃 확인
- [ ] 사이드바 펼침/접힘 확인
- [ ] Workspace Tabs 동작 확인
- [ ] 모든 버튼 반응 확인
- [ ] 모달 열기/닫기 확인
- [ ] Toast/Confirm 확인
- [ ] JS 문법 검사 통과
- [ ] 더미 데이터 검토
- [ ] 개발팀이 이해할 수 있는 주석과 구조 제공

