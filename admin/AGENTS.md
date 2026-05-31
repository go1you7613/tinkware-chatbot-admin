# Admin Publishing Rules

## 현재 작업 상태 (2026-05-31 기준)

### 완료된 화면 (prototype/ + src/ 동기화 완료)
| 파일 | 화면 | 핵심 패턴 |
|------|------|----------|
| `login.html` | 로그인 | 카드 폼, 유효성 검사 |
| `index.html` | 대시보드 | 통계 카드, 빠른 메뉴, 시스템 상태 |
| `pii-management.html` | 데이터 관리 > PII 패턴 정보 관리 | admin-tab, 토글 리스트, 인라인 폼, 모달 CRUD |
| `batch-processing.html` | 데이터 관리 > 일괄 처리 | 스텝 플로우, 체크박스 설정, 진행률, Master-Detail 그리드 |
| `faq-management.html` | 벡터 DB > FAQ 생성 관리 | 슬라이더, 모드 토글, 검토·승인, 컬렉션 조회 |
| `governance.html` | 데이터 거버넌스 > FAQ 거버넌스 관리 | 파이프라인 탭 7개, PDF 워크플로우, Scorecard, Diff View, RAG 검색 |

### 미제작 화면 (다음 세션 작업 대상)
| 파일 | 화면 | screen-spec 참조 | UX 패턴 |
|------|------|-----------------|---------|
| `anonymization.html` | 데이터 관리 > 익명화 처리 | Screen 04 | 2단 분할 (설정+실행), PII 하이라이팅 |
| `preprocessing.html` | 데이터 관리 > 데이터 전처리 관리 | Screen 06 | 탭×6, CRUD 목록 (토글+수정+삭제) |
| `document-management.html` | 벡터 DB > 문서 정보 관리 | Screen 08 | 목록+슬라이드 상세, 상태 뱃지 |
| `chat-sessions.html` | 채팅 관리 > 채팅 세션 관리 | Screen 10 | Master-Detail, 대화 타임라인 |
| `kakao-integration.html` | 채팅 관리 > 카카오톡 채널연동 | Screen 11 | 단일 상태 카드, 설정 폼 |

### 다음 세션 작업 지시
1. `screen-spec.md`의 미제작 화면 명세를 읽고 하나씩 제작한다.
2. 모든 화면은 `admin/prototype/`에 먼저 만들고, 완료 후 `admin/src/`에 복사한다.
3. 제작 순서: anonymization → preprocessing → document-management → chat-sessions → kakao-integration
4. 전체 완료 후 최종 QA → 사용자 최종 검수 진행.

---

## Module Context

`admin/`은 팅크웨어 챗봇 관리자 화면의 문서, 1차 프로토타입, 최종 퍼블리싱 산출물을 관리한다. `prototype/`의 시안을 참고하되 실제 납품 수준 구현은 `src/`에 작성한다.

## Operational Commands

- 정적 HTML 확인: 프로젝트 루트에서 `python3 -m http.server 8000` 실행 후 `/admin/src/` 또는 `/admin/prototype/` 접속.
- JS 문법 확인: `node --check admin/src/js/<file>.js`.
- 단순 파일 열람 검증은 브라우저에서 직접 확인한다.
- 빌드, 패키지 설치, API 서버 실행 명령은 기본적으로 사용하지 않는다.

## Tech Stack & Constraints

- HTML, CSS, Vanilla JavaScript만 사용한다.
- Bootstrap 5 CDN, Bootstrap Icons CDN, Noto Sans KR CDN을 유지한다.
- Tailwind Play CDN 사용 시 prefix 설정과 Bootstrap 충돌 여부를 확인한다.
- PC 전용 1440px Wide 기준으로 작업한다.
- Ant Design Pro v4 스타일 기준을 따른다.
- Primary Color는 `#1890FF`, Page Background는 `#F0F2F5`, Sidebar는 `#001529`를 유지한다.

## Implementation Patterns

- 최종 파일은 `admin/src/`에 배치한다.
- 공통 스타일은 `admin/src/css/`에 둔다.
- 공통 스크립트는 `admin/src/js/`에 둔다.
- 화면 단위 HTML은 `admin/src/*.html` 형태로 둔다.
- `admin/prototype/` 파일은 참고용으로 읽고, 명시 요청 없이는 수정하지 않는다.
- 공통 레이아웃은 고정 헤더, 좌측 사이드바, 메인 콘텐츠 구조를 유지한다.
- 관리자 UI의 버튼, 탭, 모달, 토스트, 토글, 드롭다운 패턴은 기존 `prototype/js/admin.js` 흐름을 우선 참고한다.
- 새 화면은 `feature-spec.md`의 IA와 기능 ID를 기준으로 메뉴명과 화면명을 맞춘다.

## Local Golden Rules

- `admin/design-system.md`를 반드시 준수한다. 정의된 클래스·토큰·컴포넌트를 그대로 사용하고, 임의 스타일을 별도로 만들지 않는다.
- 디자인시스템에 없는 UI 요소가 필요한 경우, Ant Design 라이브러리를 우선 참고하거나 사용자에게 먼저 물어본 후 적용한다.
- 원본 기능정의서 `.xlsx`와 `docs/ref_images/`는 수정하지 않는다.
- 화면에는 실제 주민번호, 전화번호, 이메일처럼 보이는 민감정보 샘플을 넣지 않는다.
- 인터랙션 없는 버튼을 남기지 않는다. 준비 중 동작이라도 토스트, 모달, 상태 변경 등 확인 가능한 반응을 제공한다.
- 페이지 내 CSS를 과도하게 늘리지 말고, 반복되는 스타일은 공통 CSS로 이동한다.
- HTML 구조 변경이 CSS/JS selector에 미치는 영향을 확인한다.
- `admin/src` 작업 중 `admin/prototype`을 무심코 덮어쓰지 않는다.

## Testing Strategy

- HTML 화면을 브라우저에서 열어 레이아웃, 메뉴, 모달, 탭, 토글 동작을 확인한다.
- JS 파일을 수정한 경우 `node --check`를 실행한다.
- 반응형 요구가 없더라도 최소 1280px 이상에서 텍스트 겹침과 가로 스크롤을 확인한다.
- CDN 의존 화면은 네트워크가 없는 환경에서 아이콘과 폰트가 대체 표시될 수 있음을 사용자에게 알린다.

## References

- 기능 정의: `docs/feature-spec.md`
- 디자인 시스템: `design-system.md`
- 참고 이미지: `docs/ref_images/`
- 1차 시안: `prototype/`
- 최종 구현: `src/`
