# 팅크웨어 AI Chat — 디자인 스펙 (Design Specification)

> **기준**: Figma 파일 `tceZlp9M1xdYotNrYrc4Lv` / Node `17:653`  
> **용도**: 동일한 스타일을 유지한 HTML 화면 구현을 위한 설계 참조 문서  
> **단위**: 모든 수치는 Figma 기준 px (2x 디자인 기준값)  
> **Sticky 처리**: 상단 Header Bar 영역 + 하단 Input 영역은 고정(sticky) 처리

---

## 1. 전체 레이아웃

| 항목 | 값 |
|------|-----|
| 전체 너비 | **929px** |
| 전체 높이 | **2147px** (스크롤 가능 영역 포함) |
| 배경색 | `#f6f6f6` |
| 외곽 테두리 | `1px solid #000000` |
| 외곽 모서리 반경 | `37px` |
| overflow | `hidden` |

### 레이아웃 구조 (상→하)

```
┌─────────────────────────────────────────┐
│  [STICKY] Hero Image  (height: 138px)   │  ← 배너 이미지
│  [STICKY] Header Bar  (height: 122px)   │  ← 로고 + AI Chat 텍스트 + 닫기 버튼
├─────────────────────────────────────────┤
│  [SCROLL] 메인 타이틀 텍스트              │  y: 314px
│  [SCROLL] 서브 타이틀 텍스트              │  y: 482px
│  [SCROLL] 추천 질문 목록 (5개)            │  y: 634px ~ 1170px
│  [SCROLL] "내 제품" 섹션 타이틀           │  y: 1241px
│  [SCROLL] 로그인 유도 카드               │  y: 1313px
│  [SCROLL] "고객지원 서비스" 섹션 타이틀   │  y: 1554px
│  [SCROLL] 고객지원 버튼 2×2 그리드       │  y: 1637px ~ 1915px
├─────────────────────────────────────────┤
│  [STICKY] Input Bar   (height: 146px)   │  ← 카테고리 버튼 + 입력창 + 전송 버튼
└─────────────────────────────────────────┘
```

---

## 2. 색상 팔레트

| 토큰명 | Hex | 사용처 |
|--------|-----|--------|
| `color-bg-page` | `#f6f6f6` | 전체 배경 |
| `color-bg-white` | `#ffffff` | Header Bar, 카드 배경, Input Bar 배경 |
| `color-bg-input` | `#f4f7fb` | 입력창 배경 |
| `color-bg-category-btn` | `#e9e9e9` | 카테고리 버튼 배경 |
| `color-bg-icon-placeholder` | `#d9d9d9` | 고객지원 버튼 아이콘 영역 placeholder |
| `color-border-card` | `#c0c0c0` | 로그인 카드 / 고객지원 카드 border |
| `color-border-input` | `#999999` | 입력창 border |
| `color-border-category-btn` | `#d2d2d2` | 카테고리 버튼 border |
| `color-text-primary` | `#000000` | 메인 텍스트 전반 |
| `color-text-placeholder` | `#757575` | 입력창 placeholder 텍스트 |
| `color-btn-primary-bg` | `#000000` | 로그인 버튼 배경, 전송 버튼 배경 |
| `color-btn-primary-text` | `#ffffff` | 로그인 버튼 텍스트, 전송 버튼 아이콘 |

---

## 3. 타이포그래피

| 토큰명 | Font Family | Weight | Size | Color | 사용처 |
|--------|------------|--------|------|-------|--------|
| `type-header-logo` | Paperlogy | 7 Bold | **35px** | `#000000` | Header "AI Chat" 텍스트 |
| `type-title-bold` | Noto Sans KR | Bold | **60px** | `#000000` | 메인 타이틀 "팅크웨어 AI Chat" |
| `type-title-regular` | Noto Sans KR | Regular | **60px** | `#000000` | 메인 타이틀 "과 대화를..." |
| `type-subtitle` | Noto Sans KR | Regular | **34px** | `#000000` | 서브 타이틀 |
| `type-section-label` | Noto Sans KR | Bold | **40px** | `#000000` | 섹션 타이틀 ("내 제품", "고객지원...") |
| `type-suggestion-item` | Noto Sans KR | Regular | **36px** | `#000000` | 추천 질문 목록 텍스트 |
| `type-card-body` | Noto Sans KR | Regular | **34px** | `#000000` | 로그인 유도 카드 본문 |
| `type-login-btn` | Noto Sans KR | Medium | **30px** | `#ffffff` | 로그인 버튼 텍스트 |
| `type-service-btn` | Noto Sans KR | Regular | **32px** | `#000000` | 고객지원 버튼 텍스트 |
| `type-input-placeholder` | Noto Sans CJK KR | Regular | **30px** | `#757575` | 입력창 placeholder |

> **letter-spacing**: Header "AI Chat" 텍스트에만 `-0.385px` 적용, 나머지는 기본값

---

## 4. 섹션별 상세 스펙

---

### 4-1. Hero Image (배너 이미지 영역)

> **[STICKY] 상단 고정 처리 대상 — Header Bar와 함께 sticky**

| 항목 | 값 |
|------|-----|
| Node ID | `17:654` |
| x | `0px` |
| y | `0px` |
| width | `928px` |
| height | `138px` |
| border-radius | `37px 37px 0 0` (상단만) |
| 이미지 | 배경 배너 이미지 (object-fit: cover) |

---

### 4-2. Header Bar (로고 + 닫기 버튼 영역)

> **[STICKY] 상단 고정 처리 대상 — Hero Image 아래 위치**

| 항목 | 값 |
|------|-----|
| Node ID | `17:655` |
| y | `137px` (Hero Image 바로 아래) |
| width | `927px` |
| height | `122px` |
| background | `#ffffff` |
| border-radius | `0` |

**내부 콘텐츠 컨테이너 (17:656)**

| 항목 | 값 |
|------|-----|
| left | `279px` |
| top | `35px` |
| width | `621px` |
| height | `53px` |
| display | flex, justify-content: space-between, align-items: center |

**로고 이미지 (17:658)**

| 항목 | 값 |
|------|-----|
| width | `204px` |
| height | `29px` |
| object-fit | cover |

**"AI Chat" 텍스트 (17:659)**

| 항목 | 값 |
|------|-----|
| font-family | Paperlogy 7 Bold |
| font-size | `35px` |
| color | `#000000` |
| letter-spacing | `-0.385px` |
| margin-left (로고와 gap) | `35px` |

**닫기(X) 버튼 아이콘 (17:660)**

| 항목 | 값 |
|------|-----|
| width | `52px` |
| height | `52px` |
| icon | Phosphor Icons / X |

---

### 4-3. 메인 타이틀 텍스트

| 항목 | 값 |
|------|-----|
| Node ID | `17:661` |
| left | `39px` |
| top | `314px` |
| font (Bold 부분) | Noto Sans KR Bold, `60px`, `#000000` |
| font (Regular 부분) | Noto Sans KR Regular, `60px`, `#000000` |
| 텍스트 | `팅크웨어 AI Chat`(Bold) + `과` / `대화를 시작해볼까요?` |
| line-height | normal |

---

### 4-4. 서브 타이틀 텍스트

| 항목 | 값 |
|------|-----|
| Node ID | `17:662` |
| left | `39px` |
| top | `482px` |
| font | Noto Sans KR Regular, `34px`, `#000000` |
| 텍스트 | `제품 추천부터 AS예약까지` / `무엇이든 물어보세요.` |
| line-height | normal |

---

### 4-5. 추천 질문 목록 (Quick Suggestions)

**컨테이너 (17:665)**

| 항목 | 값 |
|------|-----|
| left | `39px` |
| top | `634px` |
| width | `850px` |
| display | flex, flex-direction: column |
| gap | `18px` |

**각 추천 질문 아이템 (17:666 ~ 17:678)**

| 항목 | 값 |
|------|-----|
| width | `850px` |
| height | `93px` |
| background | `#ffffff` |
| border-radius | `24px` |
| padding | `25px` (전방향) |
| display | flex, align-items: center |
| gap (아이콘↔텍스트) | `10px` |

**Sparkle 아이콘**

| 항목 | 값 |
|------|-----|
| width | `32px` |
| height | `32px` |
| icon | Phosphor Icons / Sparkle |

**텍스트**

| 항목 | 값 |
|------|-----|
| font | Noto Sans KR Regular, `36px`, `#000000` |
| line-height | normal |

**5개 아이템 텍스트**

1. QXD5000 블랙박스 특징 알려주세요
2. 블랙박스 방문 AS 예약하기
3. 가까운 장착점 찾아주세요
4. 네비게이션 지도 업데이트 방법
5. 블랙박스 주차 녹화 설정 방법

---

### 4-6. "내 제품" 섹션

**섹션 타이틀 (17:663)**

| 항목 | 값 |
|------|-----|
| left | `39px` |
| top | `1241px` |
| font | Noto Sans KR Bold, `40px`, `#000000` |
| 텍스트 | `내 제품` |

**로그인 유도 카드 (17:681)**

| 항목 | 값 |
|------|-----|
| left | `39px` |
| top | `1313px` |
| width | `850px` |
| height | `152px` |
| background | `#ffffff` |
| border | `1px solid #c0c0c0` |
| border-radius | `24px` |
| padding | `35px` (vertical) / `25px` (horizontal) |
| display | flex, align-items: center, justify-content: space-between |

**카드 본문 텍스트 (17:682)**

| 항목 | 값 |
|------|-----|
| font | Noto Sans KR Regular, `34px`, `#000000` |
| 텍스트 | `로그인을 하시면` / `보유 제품을 확인할 수 있어요` |

**로그인 버튼 (17:683)**

| 항목 | 값 |
|------|-----|
| width | `143px` |
| height | `66px` |
| background | `#000000` |
| border-radius | `15px` |
| padding | `15px` (vertical) / `30px` (horizontal) |
| font | Noto Sans KR Medium, `30px`, `#ffffff` |
| 텍스트 | `로그인` |

---

### 4-7. "고객지원 서비스" 섹션

**섹션 타이틀 (17:664)**

| 항목 | 값 |
|------|-----|
| left | `39px` |
| top | `1554px` |
| font | Noto Sans KR Bold, `40px`, `#000000` |
| 텍스트 | `고객지원 서비스가 필요하신가요?` |

**고객지원 버튼 2×2 그리드 위치**

| 버튼 | left | top | 텍스트 |
|------|------|-----|--------|
| 방문 AS 예약하기 | `39px` | `1637px` | 방문 AS 예약하기 |
| 서비스센터 찾기 | `473px` | `1637px` | 서비스센터 찾기 |
| 대리점·장착점 찾기 | `39px` | `1786px` | 대리점·장착점 찾기 |
| 예약 확인·변경·취소 | `473px` | `1786px` | 예약 확인·변경·취소 |

> 가로 gap: `19px` (473 - 39 - 415 = 19) / 세로 gap: `19px` (1786 - 1637 - 130 = 19)

**각 카드 공통 스펙**

| 항목 | 값 |
|------|-----|
| width | `415px` |
| height | `130px` |
| background | `#ffffff` |
| border | `1px solid #c0c0c0` |
| border-radius | `24px` |
| padding | `35px` (vertical) / `25px` (horizontal) |
| display | flex, align-items: center |
| gap | `19px` |

**아이콘 영역 placeholder**

| 항목 | 값 |
|------|-----|
| width | `60px` |
| height | `60px` |
| background | `#d9d9d9` |
| border-radius | `20px` |

**버튼 텍스트**

| 항목 | 값 |
|------|-----|
| font | Noto Sans KR Regular, `32px`, `#000000` |

---

### 4-8. Input Bar (입력창 영역)

> **[STICKY] 하단 고정 처리 대상 — 화면 최하단에 항상 고정**

| 항목 | 값 |
|------|-----|
| Node ID | `17:697` |
| width | `927px` |
| height | `146px` |
| background | `#ffffff` |
| position | sticky, bottom: 0 |

**카테고리 버튼 (17:698)**

| 항목 | 값 |
|------|-----|
| left | `38px` |
| 수직 정렬 | center |
| width | `81px` |
| height | `81px` |
| background | `#e9e9e9` |
| border | `2.13px solid #d2d2d2` |
| border-radius | `21px` |
| 내부 아이콘 | SVG 프레임 `42.63×42.63px`, 중앙 배치 |

**입력창 래퍼 (17:704)**

| 항목 | 값 |
|------|-----|
| left | `144px` |
| 수직 정렬 | center |
| width | `743px` |
| height | `81px` |
| background | `#f4f7fb` |
| border | `2.76px solid #999999` |
| border-radius | `40.5px` (pill) |

**텍스트 입력 영역 (17:705)**

| 항목 | 값 |
|------|-----|
| left (내부) | `31px` |
| height | `29.45px` |
| placeholder | `AI Chat에 무엇이든 물어보세요.` |
| placeholder font | Noto Sans CJK KR Regular, `30px`, `#757575` |

**전송 버튼 (17:707)**

| 항목 | 값 |
|------|-----|
| width | `65px` |
| height | `51.55px` |
| background | `#000000` |
| border-radius | `25.77px` |
| 아이콘 | Phosphor Icons / PaperPlaneTilt, `32×32px` |
| 아이콘 left | `17px` |
| 아이콘 top | `10px` |

---

## 5. 아이콘 목록

| 아이콘명 | 크기 | 사용처 |
|---------|------|--------|
| Phosphor Icons / X | `52×52px` | Header Bar 닫기 버튼 |
| Phosphor Icons / Sparkle | `32×32px` | 추천 질문 아이템 앞 아이콘 (×5) |
| Phosphor Icons / PaperPlaneTilt | `32×32px` | 입력창 전송 버튼 내 아이콘 |

---

## 6. Sticky 처리 명세

| 영역 | position | 높이 | z-index 권고 |
|------|----------|------|------------|
| Hero Image | `sticky; top: 0` | `138px` | `100` |
| Header Bar | `sticky; top: 138px` | `122px` | `100` |
| Input Bar | `sticky; bottom: 0` | `146px` | `100` |

> 실질 스크롤 영역 높이: `2147 - (138+122) - 146 = 1741px`

---

## 7. 여백 기준 (Spacing)

| 항목 | 값 | 적용 위치 |
|------|-----|---------|
| 좌측 기본 여백 | `39px` | 전체 컨텐츠 좌측 기준선 |
| 카드 내부 패딩 (좌우) | `25px` | 로그인 카드, 고객지원 카드 |
| 카드 내부 패딩 (상하) | `35px` | 로그인 카드, 고객지원 카드 |
| 추천 질문 카드 패딩 | `25px` (전방향) | 추천 질문 아이템 |
| 추천 질문 아이템 간격 | `18px` | 추천 질문 목록 gap |
| 고객지원 버튼 간격 | `19px` | 2×2 그리드 가로/세로 gap |
| 로고 ↔ "AI Chat" 간격 | `35px` | Header Bar 내부 |
| 아이콘 ↔ 텍스트 (추천 질문) | `10px` | 추천 질문 아이템 |
| 아이콘 ↔ 텍스트 (고객지원) | `19px` | 고객지원 버튼 카드 |

---

## 8. 참고 사항

- 본 스펙의 모든 px 값은 **Figma 2x 디자인 기준값**
- HTML 구현 시 viewport/scale에 따라 절반 적용 가능 (Figma `60px` → CSS `30px` 등)
- 이미지 에셋(Hero 배너, THINKWARE 로고)은 실제 이미지 파일로 대체 필요
- 아이콘은 Phosphor Icons 라이브러리 또는 SVG 직접 사용
