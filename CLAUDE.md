@AGENTS.md

# 팅크웨어 챗봇 관리자 시스템 - 프로젝트 규칙

## 프로젝트 개요
챗봇 시스템 관리자용 퍼블리싱 UI/UX 프로젝트 (HTML/CSS/JS 기반, 백엔드 기능 없음)

## 작업 규칙
- 한국어로 답변한다.
- 영향 범위와 구현 계획을 먼저 설명하고, 사용자 승인 후 파일을 수정한다.
- 기존 아키텍처와 네이밍 규칙을 유지한다.
- 불필요한 리팩토링을 하지 않는다.
- 기능 수정 후 검증 방법을 제시한다.
- 공공기관 서비스 기준의 보안코딩을 우선 적용한다.

## 폴더 구조
```
팅크웨어_챗봇/
├── CLAUDE.md                     ← 이 파일
├── admin/
│   ├── docs/
│   │   ├── 팅크웨어 챗봇 -관리자 기능정의서.xlsx  (원본)
│   │   ├── ref_images/           ← xlsx에서 추출한 참고 이미지 (34개)
│   │   └── feature-spec.md       ← 기능정의서 분석 md
│   ├── design-system.md          ← 디자인시스템 (생성 예정)
│   ├── prototype/                ← 1차 디자인 시안
│   │   ├── *.html
│   │   ├── css/
│   │   ├── js/
│   │   └── image/
│   └── src/                      ← 최종 퍼블리싱 (인터렉션 완전 구현)
│       ├── *.html
│       ├── css/
│       ├── js/
│       └── image/
└── user/                         ← 1차 마감 완료, 현행 유지
```

## 퍼블리싱 규칙
- HTML/CSS/JS만 사용 (서버 통신 없음, 더미 데이터 사용)
- 모든 클릭 요소·모달·인터렉션은 JS로 구현
- CSS는 별도 파일 분리 (`css/` 폴더)
- JS는 별도 파일 분리 (`js/` 폴더)
- 이미지는 `image/` 폴더에 관리
- 디자인시스템(`admin/design-system.md`)에 정의된 토큰·컴포넌트를 반드시 준수한다.
- 디자인시스템에 없는 UI 요소가 필요한 경우, Ant Design 라이브러리를 우선 참고하거나 사용자에게 먼저 물어본 후 적용한다.

## 기술 스택 (CDN 기반)
- **Bootstrap 5**: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css`
- **Tailwind CSS Play CDN**: `https://cdn.tailwindcss.com`
- **폰트**: Noto Sans KR (Google Fonts CDN)
- **아이콘**: Bootstrap Icons CDN
- ※ Bootstrap + Tailwind 병용 시 유틸리티 충돌 주의 → Tailwind prefix 설정으로 분리

## 디자인 기준 (Ant Design Pro v4 기반)
- Primary Color: `#1890FF` (Ant Design Blue)
- Page Background: `#F0F2F5`
- Sidebar: `#001529` (dark) / 활성 항목: `#1890FF`
- Border: `#D9D9D9` / Border Radius: `2px`
- Text: `rgba(0,0,0,0.85)` / Secondary: `rgba(0,0,0,0.45)`
- 한글 폰트: Noto Sans KR
- 대상 해상도: 1440px Wide (PC 전용)
- 참고 이미지 위치: admin/docs/ref_images/
- 상세 디자인 규칙: admin/design-system.md 참조

## 작업 순서
1. feature-spec.md 완성 (기능정의서 분석)
2. prototype/ 디자인 시안 제작 (사용자 제공 이미지/링크 기반)
3. design-system.md 제작
4. src/ 최종 퍼블리싱 (인터렉션 완전 구현)
5. QA 및 최종 검수
