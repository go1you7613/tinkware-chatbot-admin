# 팅크웨어 챗봇 관리자 시스템 — 디자인 시스템

> **기반:** Ant Design v4 (Figma nodeId: 5211:57764)  
> **폰트:** Noto Sans KR (Roboto 대체 적용)  
> **대상 해상도:** 1440px Wide, PC 전용  
> **최종 수정:** 2026-05-31

---

## 목차

1. [타이포그래피 시스템](#1-타이포그래피-시스템)
2. [컬러 시스템](#2-컬러-시스템)
3. [스페이싱 시스템](#3-스페이싱-시스템)
4. [그림자 & 보더](#4-그림자--보더)
5. [컴포넌트 규격](#5-컴포넌트-규격)
6. [레이아웃 구조](#6-레이아웃-구조)
7. [아이콘](#7-아이콘)
8. [인터렉션 규칙](#8-인터렉션-규칙)

---

## 1. 타이포그래피 시스템

### 1.1 폰트 패밀리

| 용도 | CSS 값 |
|------|--------|
| **기본 (한국어/영문)** | `'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| **코드 / 모노스페이스** | `'Courier New', Consolas, 'Noto Sans Mono', monospace` |

> **참고:** Figma 원본은 Roboto 기반이나, 한글 관리자 시스템은 **Noto Sans KR**로 대체 적용.  
> 폰트 가중치(weight) 및 line-height 수치는 Figma 스펙과 동일하게 유지.

```html
<!-- CDN 로드 (HTML <head>) -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
```

---

### 1.2 타입 스케일 (Heading)

> Figma 토큰: `H1/medium` ~ `H5/medium`  
> 모든 Heading은 `font-weight: 500` (Medium)

| 레벨 | 토큰명 | Size | Line Height | Weight | CSS 변수 예시 |
|------|--------|------|-------------|--------|--------------|
| H1 | `H1/medium` | **38px** | 46px | 500 | `--text-h1` |
| H2 | `H2/medium` | **30px** | 40px | 500 | `--text-h2` |
| H3 | `H3/medium` | **24px** | 32px | 500 | `--text-h3` |
| H4 | `H4/medium` | **20px** | 28px | 500 | `--text-h4` |
| H5 | `H5/medium` | **16px** | 24px | 500 | `--text-h5` |

```css
/* admin.css에 정의할 CSS 변수 */
:root {
  --text-h1-size:    38px;  --text-h1-lh: 46px;
  --text-h2-size:    30px;  --text-h2-lh: 40px;
  --text-h3-size:    24px;  --text-h3-lh: 32px;
  --text-h4-size:    20px;  --text-h4-lh: 28px;
  --text-h5-size:    16px;  --text-h5-lh: 24px;
}

h1, .text-h1 { font-size: 38px; line-height: 46px; font-weight: 500; }
h2, .text-h2 { font-size: 30px; line-height: 40px; font-weight: 500; }
h3, .text-h3 { font-size: 24px; line-height: 32px; font-weight: 500; }
h4, .text-h4 { font-size: 20px; line-height: 28px; font-weight: 500; }
h5, .text-h5 { font-size: 16px; line-height: 24px; font-weight: 500; }
```

---

### 1.3 바디 텍스트 (Body)

> Figma 토큰: `Body/regular`, `Body/medium`, `Body/bold`  
> 기본 본문 크기는 **14px**, line-height **22px**

| 토큰명 | Size | Line Height | Weight | 용도 |
|--------|------|-------------|--------|------|
| `Body/regular` | **14px** | 22px | **400** | 기본 본문, 라벨, 설명 |
| `Body/medium` | **14px** | 22px | **500** | 강조 본문, 폼 라벨, 탭 활성 |
| `Body/bold` | **14px** | 22px | **700** | 강한 강조, 수치 표시 |

```css
/* 사용 예시 */
.text-body         { font-size: 14px; line-height: 22px; font-weight: 400; }
.text-body-medium  { font-size: 14px; line-height: 22px; font-weight: 500; }
.text-body-bold    { font-size: 14px; line-height: 22px; font-weight: 700; }
```

---

### 1.4 서브 텍스트 (H5 Regular & Footnote)

| 토큰명 | Size | Line Height | Weight | 용도 |
|--------|------|-------------|--------|------|
| `H5/regular` | **16px** | 24px | **400** | 버튼 텍스트, 입력 필드 값, 소제목 |
| `Footnote/description` | **12px** | 20px | **400** | 캡션, 부연 설명, 테이블 헤더 서브 |

```css
.text-md        { font-size: 16px; line-height: 24px; font-weight: 400; }
.text-footnote  { font-size: 12px; line-height: 20px; font-weight: 400; }
.text-caption   { font-size: 12px; line-height: 20px; font-weight: 400; color: rgba(0,0,0,0.45); }
```

---

### 1.5 텍스트 데코레이션 스타일

> Figma 기준 Body 14px에 적용하는 장식 스타일

| 스타일명 | CSS 속성 | 용도 |
|----------|---------|------|
| `Body/regular-underline` | `text-decoration: underline` | 링크 강조 |
| `Body/regular-strikethrough` | `text-decoration: line-through` | 삭제된 항목 표시 |
| `Body/italic` | `font-style: italic` | 인용, 보조 설명 |
| `Body/code` | `font-family: monospace` + 배경색 | 코드, 정규식, 패턴 값 표시 |

```css
.text-underline     { text-decoration: underline; text-underline-offset: 2px; }
.text-strikethrough { text-decoration: line-through; }
.text-italic        { font-style: italic; }
.text-code {
  font-family: 'Courier New', Consolas, monospace;
  font-size: 13px;
  background: rgba(0,0,0,0.04);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 3px;
  padding: 1px 5px;
  color: rgba(0,0,0,0.65);
}
```

---

### 1.6 텍스트 색상 시스템 (Character Colors)

> Figma 토큰: `Character/Primary .85` ~ `Character/danger`

| 토큰명 | 색상 값 | CSS 변수 | 용도 |
|--------|---------|----------|------|
| `Character/Primary .85` | `rgba(0,0,0,0.85)` | `--color-text-main` | 기본 본문, 제목 |
| `Character/Secondary .45` | `rgba(0,0,0,0.45)` | `--color-text-sub` | 부제목, 설명, 힌트 |
| `Character/Disabled .25` | `rgba(0,0,0,0.25)` | `--color-text-disabled` | 비활성 텍스트, 플레이스홀더 |
| `Character/danger` | `#FF4D4F` | `--color-error` | 에러, 위험 강조 |
| `Character/warning` | `#FAAD14` | `--color-warning` | 경고 메시지 |
| `Character/mark` | `#000000` | — | 하이라이트 배경 위 텍스트 |
| `Character/inverse` | `#FFFFFF` | `--color-text-white` | 어두운 배경 위 텍스트 |

```css
/* 유틸리티 클래스 */
.text-primary   { color: rgba(0,0,0,0.85); }
.text-secondary { color: rgba(0,0,0,0.45); }
.text-disabled  { color: rgba(0,0,0,0.25); }
.text-danger    { color: #FF4D4F; }
.text-warning   { color: #FAAD14; }
.text-success   { color: #52C41A; }
.text-link      { color: #1890FF; cursor: pointer; }
.text-link:hover { color: #096DD9; }
.text-white     { color: #FFFFFF; }
```

---

### 1.7 타이포그래피 사용 지침

#### ✅ 올바른 사용

```
페이지 타이틀        → H4 (20px/500)
카드 섹션 제목       → H5 (16px/500)
테이블 컬럼 헤더     → Body/medium (14px/500) + color-text-sub
본문 데이터          → Body/regular (14px/400)
부연 설명, 캡션      → Footnote (12px/400) + color-text-sub
버튼 라벨            → H5/regular (16px/400) 또는 Body/regular (14px/400)
입력 플레이스홀더    → Body/regular (14px/400) + color-text-disabled
정규식/패턴 값       → Body/code (monospace, 13px)
에러 메시지          → Footnote (12px/400) + color-error
```

#### ❌ 잘못된 사용

```
H1(38px)을 카드 제목으로 사용 → 시각적 위계 붕괴
페이지 내 3개 이상의 폰트 굵기 혼용 → 시각 노이즈
body 텍스트에 #000000 직접 사용 → rgba(0,0,0,0.85) 사용
임의 font-size 값 사용 → 위 스케일 외 크기 금지
```

---

### 1.8 CSS 전체 변수 정의 (admin.css 반영용)

```css
:root {
  /* 폰트 패밀리 */
  --font-family:        'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-family-code:   'Courier New', Consolas, 'Noto Sans Mono', monospace;

  /* 폰트 크기 */
  --font-size-xs:       12px;   /* Footnote */
  --font-size-sm:       13px;   /* 코드 내 소형 텍스트 */
  --font-size-base:     14px;   /* Body 기본 */
  --font-size-md:       16px;   /* H5, 버튼 */
  --font-size-lg:       20px;   /* H4, 페이지 타이틀 */
  --font-size-xl:       24px;   /* H3 */
  --font-size-2xl:      30px;   /* H2 */
  --font-size-3xl:      38px;   /* H1 */

  /* 폰트 두께 */
  --font-weight-regular: 400;
  --font-weight-medium:  500;
  --font-weight-bold:    700;

  /* Line Height */
  --line-height-xs:     20px;   /* Footnote 12px */
  --line-height-base:   22px;   /* Body 14px */
  --line-height-md:     24px;   /* H5/regular 16px */
  --line-height-lg:     28px;   /* H4 20px */
  --line-height-xl:     32px;   /* H3 24px */
  --line-height-2xl:    40px;   /* H2 30px */
  --line-height-3xl:    46px;   /* H1 38px */

  /* 텍스트 색상 */
  --color-text-main:     rgba(0,0,0,0.85);
  --color-text-sub:      rgba(0,0,0,0.45);
  --color-text-disabled: rgba(0,0,0,0.25);
  --color-text-white:    #FFFFFF;
}
```

---

## 2. 컬러 시스템

### 2.1 Primary 컬러 (Ant Design Blue)

| 단계 | 색상 | HEX | 용도 |
|------|------|-----|------|
| Blue-1 | ![](https://via.placeholder.com/12/E6F7FF/E6F7FF) | `#E6F7FF` | 호버 배경, 선택 배경 |
| Blue-5 | ![](https://via.placeholder.com/12/40A9FF/40A9FF) | `#40A9FF` | 호버 상태 버튼 |
| **Blue-6** | ![](https://via.placeholder.com/12/1890FF/1890FF) | **`#1890FF`** | **Primary — 기본 버튼, 링크, 활성 상태** |
| Blue-7 | ![](https://via.placeholder.com/12/096DD9/096DD9) | `#096DD9` | 클릭 상태 버튼 |
| Blue-9 | ![](https://via.placeholder.com/12/003A8C/003A8C) | `#003A8C` | 사이드바 배경 깊은 강조 |

### 2.2 Neutral 컬러 (Gray Scale)

| 단계 | HEX | CSS 변수 | 용도 |
|------|-----|----------|------|
| Neutral-1 | `#FFFFFF` | `--color-bg-white` | 카드, 입력 배경 |
| Neutral-2 | `#FAFAFA` | — | 테이블 헤더, 흐린 패널 |
| Neutral-3 | `#F5F5F5` | — | 호버 배경, 비활성 영역 |
| Neutral-4 | `#F0F0F0` | — | 구분선 배경 |
| Neutral-5 | `#D9D9D9` | `--color-border` | 기본 보더, 입력 테두리 |
| Neutral-6 | `#BFBFBF` | — | 비활성 보더 |
| Neutral-7 | `#8C8C8C` | — | 아이콘 기본 |
| Neutral-13 | `#000000` | — | 최고 강조 |

### 2.3 시맨틱 컬러

| 용도 | HEX | CSS 변수 |
|------|-----|----------|
| Success | `#52C41A` | `--color-success` |
| Warning | `#FAAD14` | `--color-warning` |
| Error/Danger | `#FF4D4F` | `--color-error` |
| Info | `#1890FF` | `--color-primary` |

### 2.4 사이드바 전용 컬러

| 항목 | 값 |
|------|-----|
| 배경 | `#001529` |
| 메뉴 텍스트 (기본) | `rgba(255,255,255,0.65)` |
| 메뉴 텍스트 (호버) | `rgba(255,255,255,1)` |
| 메뉴 호버 배경 | `rgba(255,255,255,0.08)` |
| 메뉴 활성 배경 | `#1890FF` |
| 서브메뉴 배경 | `rgba(0,0,0,0.2)` |
| 구분선 | `rgba(255,255,255,0.08)` |

---

## 3. 스페이싱 시스템

Ant Design의 **8px 그리드** 기반 스페이싱을 적용합니다.

| 토큰 | 값 | 용도 |
|------|----|------|
| `--space-1` | 4px | 미세 간격, 아이콘-텍스트 |
| `--space-2` | 8px | 기본 내부 패딩 |
| `--space-3` | 12px | 입력 패딩, 서브메뉴 |
| `--space-4` | 16px | 버튼 패딩, 카드 패딩 소 |
| `--space-5` | 20px | 메뉴 아이템 패딩 |
| `--space-6` | 24px | 카드 패딩 기본 |
| `--space-8` | 32px | 섹션 간격 |
| `--space-10` | 40px | 페이지 상단 간격 |
| `--space-12` | 48px | 대형 섹션 간격 |

---

## 4. 그림자 & 보더

### 4.1 Border Radius

| 토큰 | 값 | 용도 |
|------|----|------|
| `--radius-base` | `2px` | 버튼, 입력, 태그 (Ant Design 기본) |
| `--radius-card` | `4px` | 카드, 패널, 드롭다운 |
| `--radius-lg` | `8px` | 모달, 알림, 토스트 |
| `--radius-full` | `9999px` | 태그 pill, 아바타 |

### 4.2 Shadow

| 토큰 | 값 | 용도 |
|------|----|------|
| `--shadow-btn` | `0 2px 0 rgba(0,0,0,0.04)` | 기본 버튼 |
| `--shadow-card` | `0 1px 2px rgba(0,0,0,0.1)` | 카드 |
| `--shadow-dropdown` | `0 6px 16px rgba(0,0,0,0.12)` | 드롭다운, 팝오버 |
| `--shadow-modal` | `0 8px 30px rgba(0,0,0,0.15)` | 모달 |

### 4.3 Divider

- **컬러:** `#F0F0F0` (Neutral-4)
- **두께:** `1px`
- **용도:** 카드 내부 구분선, 테이블 행 구분, 섹션 구분

---

## 5. 컴포넌트 규격

### 5.1 버튼

| 크기 | Height | Padding (좌우) | Font |
|------|--------|----------------|------|
| Small | 24px | 8px | 14px/400 |
| Default | 32px | 16px | 14px/400 |
| Large | 40px | 20px | 16px/400 |

**상태:** default → hover (`border-color: primary`) → active (`bg: Blue-7`) → disabled (`opacity: 0.6`)

### 5.2 입력 필드

| 크기 | Height | Padding | Font |
|------|--------|---------|------|
| Default | 32px | 8px 12px | 14px/400 |
| Large | 40px | 8px 12px | 16px/400 |

**Focus ring:** `box-shadow: 0 0 0 2px rgba(24,144,255,0.2)`, `border-color: #1890FF`

### 5.3 테이블

- **헤더 배경:** `#FAFAFA`
- **헤더 텍스트:** Body/medium (14px/500) + `color-text-sub`
- **셀 패딩:** 12px 16px
- **행 hover:** `background: #FAFAFA`
- **행 구분선:** `1px solid #F0F0F0`

### 5.4 토글 스위치

- **Width × Height:** 44px × 22px
- **기본:** `background: rgba(0,0,0,0.25)`
- **활성:** `background: #1890FF`
- **전환:** `transition: 0.2s`

### 5.5 모달

- **배경 오버레이:** `rgba(0,0,0,0.45)`
- **너비:** 기본 520px, 소 380px, 대 720px
- **헤더 높이:** 56px, `border-bottom: 1px solid #F0F0F0`
- **바디 패딩:** 24px
- **푸터 패딩:** 12px 24px, justify-content: flex-end

### 5.6 콘텐츠 탭 (Underline Tabs) ✅ 확정 스타일

> 기준: Ant Design `Tabs/Line` 컴포넌트  
> 사용 클래스: `.admin-tabs` (컨테이너) / `.admin-tab` (아이템) / `.tab-count` (배지)  
> 적용 화면: 관리자 콘텐츠 영역 상단 기능 탭 전체

#### 스타일 미리보기

```
내장 PII 패턴  8    커스텀 패턴  9
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ← border-bottom 1px #F0F0F0
        ↑
  활성 탭: 파란 언더라인 2px
```

#### HTML 구조

```html
<div class="admin-tabs">
  <div class="admin-tab active" data-tab="builtin">
    내장 PII 패턴 <span class="tab-count">8</span>
  </div>
  <div class="admin-tab" data-tab="custom">
    커스텀 패턴 <span class="tab-count">9</span>
  </div>
</div>
```

#### 컨테이너 `.admin-tabs`

| 속성 | 값 |
|------|----|
| Display | `flex` |
| Border Bottom | `1px solid #F0F0F0` |
| Margin Bottom | `20px` |

#### 탭 아이템 `.admin-tab`

| 속성 | 비활성 | 활성 | Hover |
|------|--------|------|-------|
| Padding | `10px 20px` | 동일 | 동일 |
| Font Size | 14px | 14px | 14px |
| Font Weight | 400 | **500** | 400 |
| Text Color | `rgba(0,0,0,0.45)` | `#1890FF` | `rgba(0,0,0,0.85)` |
| Border Bottom | `2px solid transparent` | `2px solid #1890FF` | transparent |
| Margin Bottom | `-1px` (하단 라인 overlap) | `-1px` | `-1px` |
| Transition | `color 0.2s, border-color 0.2s` | — | — |

#### 카운트 배지 `.tab-count`

| 속성 | 비활성 | 활성 |
|------|--------|------|
| Background | `#D9D9D9` | `rgba(24,144,255,0.15)` |
| Color | `rgba(0,0,0,0.45)` | `#1890FF` |
| Height | `18px` | `18px` |
| Min Width | `18px` | `18px` |
| Padding | `0 5px` | `0 5px` |
| Font | 11px/500 | 11px/500 |
| Border Radius | `9px` | `9px` |
| Margin Left | `4px` | `4px` |

#### CSS 전체 (admin.css 정의)

```css
.admin-tabs {
  display: flex;
  border-bottom: 1px solid var(--color-border-light);
  margin-bottom: 20px;
}
.admin-tab {
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  color: rgba(0,0,0,0.45);
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: color 0.2s, border-color 0.2s;
  white-space: nowrap;
  user-select: none;
}
.admin-tab.active {
  color: #1890FF;
  border-bottom-color: #1890FF;
  font-weight: 500;
}
.admin-tab:hover:not(.active) { color: rgba(0,0,0,0.85); }

.tab-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  font-size: 11px;
  font-weight: 500;
  background: #D9D9D9;
  color: rgba(0,0,0,0.45);
  border-radius: 9px;
  margin-left: 4px;
}
.admin-tab.active .tab-count {
  background: rgba(24,144,255,0.15);
  color: #1890FF;
}
```

#### 사용 규칙

- 화면 내 콘텐츠 탭은 **반드시 `.admin-tabs` / `.admin-tab` 클래스** 사용
- 탭마다 임의의 `.page-tab` 또는 커스텀 클래스 생성 금지
- 카운트 표시가 필요한 탭은 `.tab-count` 배지 사용
- JS 탭 전환은 `#piiTabs .admin-tab` 패턴으로 컨테이너 ID를 지정해 범위 한정

### 5.7 워크스페이스 탭 (Closable Workspace Tabs)

> 기준: Ant Design `Tabs/Card` closable 패턴  
> 적용 화면: 관리자 공통 콘텐츠 영역 상단  
> 목적: 사이드바 메뉴 이동 시 화면을 탭으로 열고, 이미 열린 화면은 기존 탭을 활성화한다.

#### 동작 규칙

- 메뉴 클릭 시 새 워크스페이스 탭 생성
- 이미 열린 화면은 새 탭을 만들지 않고 기존 탭 활성화
- 각 탭은 닫기 버튼 `×` 제공
- 더보기 메뉴에서 `전체 닫기`, `기타 닫기` 제공
- 탭 목록과 활성 탭은 `sessionStorage`로 유지
- 탭 바는 페이지 헤더와 콘텐츠 사이에 위치

#### 스타일 규칙

| 요소 | 값 |
|------|----|
| 탭 바 배경 | `#FFFFFF` |
| 탭 바 하단 구분 | `1px solid #F0F0F0` |
| 탭 아이템 배경 | `#FFFFFF` |
| 탭 아이템 보더 | `1px solid #F0F0F0` |
| 활성 탭 텍스트 | `#1890FF` |
| 활성 탭 쉐도우 | `0 2px 8px rgba(0,0,0,0.12)` |
| 닫기 버튼 | 16px 아이콘 버튼, hover 시 연회색 배경 |

```css
.workspace-tabs-wrap {
  background: #FFFFFF;
  border-bottom: 1px solid #F0F0F0;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
}

.workspace-tab.active {
  color: #1890FF;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  position: relative;
  z-index: 1;
}
```

### 5.8 세로형 콘텐츠 탭 (Vertical Inline Tabs)

> 기준: Ant Design inline menu 패턴  
> 적용 화면: PII 관리 등 콘텐츠 내부 좌측 설정 목록

#### 스타일 규칙

| 상태 | 배경 | 텍스트 | 우측 보더 |
|------|------|--------|-----------|
| 기본 | `#FFFFFF` | `rgba(0,0,0,0.85)` | `3px solid transparent` |
| Hover | `#FFFFFF` | `rgba(0,0,0,0.85)` | `3px solid transparent` |
| Active | `#E6F7FF` | `#1890FF` | `3px solid #1890FF` |

#### 치수

- **Container Background:** `#FFFFFF`
- **Item Height:** 최소 `40px`
- **Item Padding:** `0 24px 0 48px`
- **Item Gap:** `8px`
- **Text:** 14px/400, line-height 22px
- **Badge Active:** `background: rgba(24,144,255,0.15)`, `color: #1890FF`

```css
.setting-group-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0;
  background: #FFFFFF;
}

.setting-group-item {
  min-height: 40px;
  padding: 0 24px 0 48px;
  background: #FFFFFF;
  border-right: 3px solid transparent;
}

.setting-group-item.active {
  background: #E6F7FF;
  color: #1890FF;
  border-right-color: #1890FF;
}
```

---

## 6. 레이아웃 구조

### 6.1 전체 레이아웃

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (60px) — 고정, z-index: 100                        │
│  logo(240px) | toggle | [spacer] | icons | avatar          │
├──────────────┬──────────────────────────────────────────────┤
│              │                                              │
│  SIDEBAR     │  CONTENT AREA                               │
│  240px       │  (1440 - 240 = 1200px 기준)                 │
│  (64px 접힘) │  padding: 24px                              │
│              │                                              │
│  고정, z-90  │  page-header + breadcrumb                   │
│              │  + 콘텐츠 카드                              │
│              │                                              │
└──────────────┴──────────────────────────────────────────────┘
```

### 6.2 사이드바 상태

| 상태 | 너비 | 동작 |
|------|------|------|
| 펼침 (기본) | 240px | 아이콘 + 텍스트 표시, 최초 진입 기본값 |
| 접힘 | 64px | 아이콘만 표시, hover 시 툴팁 |
| 전환 | `transition: width 0.2s` | CSS transition |

- 사이드바 기본 상태는 항상 펼침이다.
- 공통 사이드바는 각 HTML에서 직접 반복 작성하지 않고 공통 레이아웃 스크립트로 렌더링한다.
- 활성 메뉴는 페이지별 `data-admin-menu`, `data-admin-submenu` 값을 기준으로 표시한다.

### 6.3 콘텐츠 영역 그리드

- **기본:** 24px padding 사방
- **카드 그리드:** `gap: 16px`
- **통계 카드:** 4열 그리드 (`grid-template-columns: repeat(4, 1fr)`)
- **2분할:** `grid-template-columns: 1fr 1fr`
- **3분할:** `grid-template-columns: repeat(3, 1fr)`

### 6.4 공통 레이아웃 분리

공통 영역은 페이지별 HTML에 직접 복제하지 않고 mount point만 배치한다.

```html
<header id="adminHeader"></header>
<aside id="adminSidebar"></aside>
```

- `adminHeader`: 로고, 사이드바 토글, 알림, 설정, 관리자 프로필
- `adminSidebar`: 1depth/2depth 관리자 메뉴와 활성 상태
- `mainWrap`: 워크스페이스 탭과 페이지 콘텐츠를 포함
- 페이지별 HTML은 본문 콘텐츠와 현재 메뉴 식별자만 관리

```html
<body data-admin-menu="data-management" data-admin-submenu="내장 PII 패턴">
```

공통 레이아웃을 변경할 때는 개별 HTML이 아니라 공통 렌더러와 공통 CSS를 우선 수정한다.

### 6.5 콘텐츠 화면 탭 상태

- 워크스페이스 탭 상태는 브라우저 세션 단위로 유지한다.
- 새로고침 후에도 열린 탭과 활성 탭을 복원한다.
- 전체 닫기 시 최소 기본 탭을 다시 열어 빈 화면을 방지한다.

---

## 7. 아이콘

- **라이브러리:** Bootstrap Icons v1.11 (CDN)
- **기본 크기:** 16px
- **색상 상속:** `currentColor` (부모 color 따름)
- **버튼 내 아이콘:** 16px, gap 6px
- **메뉴 아이콘:** 16px, width 24px (정렬용)
- **큰 아이콘 (stat card):** 22~24px

```html
<!-- CDN -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

<!-- 사용 예시 -->
<i class="bi bi-shield-lock"></i>
```

---

## 8. 인터렉션 규칙

### 8.1 전환 속도

| 종류 | 값 | 용도 |
|------|----|------|
| 미세 전환 | `0.1s ease` | 텍스트 색상, 배경색 |
| 기본 전환 | `0.2s ease` | 버튼, 입력 포커스, 토글 |
| 사이드바 | `0.2s ease` | 너비 전환 |
| 아코디언 | `0.25s ease` | 높이 전환 |
| 모달 | `0.3s ease` | 나타남/사라짐 |

### 8.2 비가역 작업 처리 패턴

```
삭제 / 초기화 / 실행 → Confirm 팝업 표시
  - 제목: 작업명 (예: "패턴 삭제")
  - 내용: 1줄 경고 메시지
  - 버튼: [취소] [확인] (확인은 Primary Blue)
  - 취소: 팝업 닫기만, 동작 없음
  - 확인: 해당 작업 실행 후 Toast 알림
```

### 8.3 비동기 Task 처리 패턴

```
시작 버튼 클릭
  → 로딩 스피너 (버튼 내)
  → 완료 시 진행 상태 화면으로 전환
  → 폴링 시뮬레이션 (더미: setTimeout)
  → 완료/오류 Toast 알림
```

### 8.4 토스트 알림

| 타입 | 색상 | 아이콘 | 지속 시간 |
|------|------|--------|----------|
| success | `#52C41A` | `bi-check-circle-fill` | 3초 |
| error | `#FF4D4F` | `bi-x-circle-fill` | 4초 |
| warning | `#FAAD14` | `bi-exclamation-triangle-fill` | 3초 |

- 위치: `top: 80px, right: 24px`
- 진입 애니메이션: `translateX(40px) → 0, opacity 0 → 1`

### 8.5 빈 상태 (Empty State)

```
데이터 없음 화면:
  - 아이콘: 48px (연회색)
  - 메시지: Body/regular, color-text-sub
  - 서브메시지: Footnote, color-text-disabled
  - 액션 버튼: 선택적 (신규 추가 등)
```

---

## 9. 신규 컴포넌트 (prototype 화면 추가 정의)

### 9.1 스텝 진행 바 (Step Bar)

> 적용: 일괄 처리(`batch-processing.html`) — 단계형 워크플로우 표시

```
STEP 1 ──── STEP 2 ──── STEP 3 ──── STEP 4
  ●              ○              ○              ○     ← 완료:녹색, 현재:파랑, 미완:회색
```

| 상태 | 번호 원 배경 | 텍스트 색 |
|------|------------|---------|
| 완료(done) | `#52C41A` (success) | `#52C41A` |
| 현재(active) | `#1890FF` (primary) | `rgba(0,0,0,0.85)` |
| 미완료 | `#D9D9D9` | `rgba(0,0,0,0.25)` |

- 완료 스텝 원: 숫자 → `✓` 체크 아이콘
- 연결선(connector): 기본 `1px solid #F0F0F0`, 완료 구간: `1px solid #52C41A`

---

### 9.2 슬라이더 설정 그룹 (Slider Group)

> 적용: FAQ 생성 관리(`faq-management.html`) — 클러스터링 파라미터 설정

```
클러스터 수                              [100]
|━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━|
5                                           100
```

| 항목 | 값 |
|------|-----|
| 슬라이더 강조색 | `accent-color: #1890FF` |
| 현재값 배지 | Primary Blue 배경 `#E6F7FF`, 텍스트 `#1890FF`, 굵기 700 |
| 라벨 | 13px/500, `rgba(0,0,0,0.85)` |
| 범위 텍스트 | 11px/400, `rgba(0,0,0,0.25)` |

---

### 9.3 파이프라인 탭 (Pipeline Tabs)

> 적용: FAQ 거버넌스 관리(`governance.html`) — PDF 처리 단계별 탭

- `.admin-tabs` / `.admin-tab` 동일 클래스 사용
- 각 탭 앞에 **단계 번호 원** (18×18px, 비활성 `#D9D9D9`, 활성 `#1890FF`, 완료 `#52C41A`)
- 탭 순서 = 업무 처리 순서 (PDF 업로드 → 파싱 → 검수 → 전처리 → 임베딩 → RAG 확인)
- 완료된 단계: `.done` 클래스로 녹색 원 표시

---

### 9.4 생성 모드 토글 버튼 (Mode Toggle)

> 적용: FAQ 생성 관리 — 전체 재생성 / 증분 업데이트 전환

```
[ 전체 재생성 | 증분 업데이트 ]   ← 박스형 분리 토글 (라디오 버튼 대체)
```

| 상태 | 배경 | 텍스트 |
|------|------|--------|
| 활성 | `#1890FF` | `#FFFFFF` |
| 비활성 | `#FFFFFF` | `rgba(0,0,0,0.45)` |
- 컨테이너: `border: 1px solid #D9D9D9`, `border-radius: 2px`
- 버튼 사이 구분: `border-right: 1px solid #D9D9D9`

---

### 9.5 Master-Detail 분할 레이아웃

> 적용: 일괄 처리 결과, 검토·승인, PDF 검수

```
┌──────────────────────────────────┬──────────────────┐
│  목록 그리드 (click-to-select)   │  슬라이드 상세   │
│  60~65% 너비                     │  35~40% 너비     │
│                                  │  ✕ 닫기 버튼     │
└──────────────────────────────────┴──────────────────┘
```

- 행 선택: `background: var(--color-primary-light)` (활성 행)
- 상세 패널 열기: 행 클릭 이벤트, CSS `display: block`
- 상세 패널 닫기: 패널 내 닫기 버튼 or 다른 행 클릭

---

### 9.6 데이터 비교 뷰 (Diff View)

> 적용: 정규식/LLM 전처리 — 원본 vs 처리 결과 비교

```
[ 원본 텍스트 ]         [ 처리 결과 ]
┌───────────────┐      ┌───────────────┐
│  원문 내용    │      │ 삭제 취소선   │
│               │      │ 추가 녹색강조 │
└───────────────┘      └───────────────┘
```

| 요소 | 스타일 |
|------|--------|
| 삭제된 텍스트 | `background: rgba(255,77,79,0.15); text-decoration: line-through; color: #FF4D4F` |
| 추가된 텍스트 | `background: rgba(82,196,26,0.15); color: #52C41A` |
| 비교 박스 | `background: #FAFAFA; border: 1px solid #F0F0F0; border-radius: 2px; padding: 10px 12px` |
| 레이아웃 | `display: grid; grid-template-columns: 1fr 1fr; gap: 16px` |

---

### 9.7 RAG 검색 결과 카드

> 적용: FAQ 거버넌스 관리 > RAG 시스템 컬렉션, 컬렉션 문서 조회

```
#1  [R 0.799]  [H 0.611]  source: as_kms          메타데이터 ▼
블랙박스 점검요청 — IB BLACK PRIME 2K 점검 요청합니다.
```

| 요소 | 스타일 |
|------|--------|
| 검색 순번 | `font-size: 12px; color: rgba(0,0,0,0.45); font-weight: 600` |
| R 점수 배지 | `background: rgba(24,144,255,0.12); color: #1890FF` |
| H 점수 배지 | `background: rgba(82,196,26,0.12); color: #52C41A` |
| 결과 텍스트 | Body/regular 14px/400 |
| 메타데이터 | 접기/펼치기 토글, 11px, `rgba(0,0,0,0.45)` |
| 카드 구분 | `border: 1px solid #F0F0F0; border-radius: 2px; padding: 14px 16px; margin-bottom: 8px` |

---

## 변경 이력

| 날짜 | 버전 | 내용 |
|------|------|------|
| 2026-05-31 | v1.3 | 신규 컴포넌트 9.1~9.7 추가 — 스텝바, 슬라이더, 파이프라인탭, 모드토글, Master-Detail, Diff View, RAG 카드 |
| 2026-05-31 | v1.2 | 공통 레이아웃 분리, 워크스페이스 탭, 세로형 콘텐츠 탭, 사이드바 기본 펼침 규칙 추가 |
| 2026-05-31 | v1.1 | Ant Design Card Tabs 스타일 규격 추가 |
| 2026-05-31 | v1.0 | 최초 작성 — 타이포그래피, 컬러, 스페이싱, 컴포넌트 규격, 레이아웃, 인터렉션 |
