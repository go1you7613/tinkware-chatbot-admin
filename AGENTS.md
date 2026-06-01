# 팅크웨어 챗봇 관리자 시스템 - Agent Rules

## Operational Commands

- 정적 퍼블리싱 프로젝트이므로 빌드 명령은 없다.
- 로컬 확인이 필요하면 프로젝트 루트에서 `python3 -m http.server 8000`을 실행하고 브라우저에서 `/admin/prototype/` 또는 `/admin/src/`를 연다.
- HTML 문법 확인은 변경 파일을 직접 열어 구조를 검토한다.
- JavaScript 문법 확인은 `node --check <file>`을 사용한다.
- 외부 패키지 설치, 번들러 추가, 서버 프레임워크 도입은 요청 없이는 하지 않는다.

## Project Context

챗봇 시스템 관리자용 HTML/CSS/JS 퍼블리싱 UI 프로젝트다. 백엔드 통신 없이 더미 데이터와 프론트엔드 인터랙션으로 관리자 화면을 구현한다.

Tech Stack:
- HTML
- CSS
- Vanilla JavaScript
- Bootstrap 5 CDN
- Tailwind CSS Play CDN
- Bootstrap Icons CDN
- Noto Sans KR

## Golden Rules

- 한국어로 답변한다.
- 영향 범위와 구현 계획을 먼저 설명하고, 사용자 승인 후 파일을 수정한다.
- 기존 아키텍처, 네이밍, 디자인 토큰을 유지한다.
- 요청 범위 밖의 리팩토링, 포맷 변경, 구조 변경을 하지 않는다.
- `admin/prototype/`는 1차 시안, `admin/src/`는 최종 퍼블리싱 대상으로 구분한다.
- 서버 통신, 인증 API, 데이터베이스 연동을 임의로 추가하지 않는다.
- 모든 클릭 요소, 모달, 탭, 토글, 드롭다운 등 인터랙션은 JS로 동작하게 만든다.
- CSS는 `css/`, JS는 `js/`, 이미지는 `image/` 아래에 둔다.
- 공공기관 서비스 기준을 고려해 하드코딩된 민감정보, 불필요한 개인정보 예시, 위험한 inline 스크립트 확산을 피한다.
- GitHub 커밋·푸시는 즉시 진행하지 않는다. 사용자가 명시적으로 커밋 또는 푸시를 요청한 경우에만 수행한다.

## Do's

- 수정 전 관련 HTML/CSS/JS를 먼저 읽는다.
- `admin/design-system.md`와 `admin/docs/feature-spec.md`를 기준 문서로 삼는다.
- 최소 변경으로 요구사항을 충족한다.
- 변경 후 검증 방법과 확인 결과를 짧게 보고한다.
- 더미 데이터는 실제 개인정보처럼 보이지 않게 작성한다.
- Bootstrap과 Tailwind를 병용할 때 클래스 충돌 가능성을 확인한다.

## Don'ts

- 사용자가 요청하지 않은 기능을 추가하지 않는다.
- 새 프레임워크, 빌드 도구, 상태관리 라이브러리를 도입하지 않는다.
- `user/` 영역을 관리자 작업 중 임의로 수정하지 않는다.
- 원본 기능정의서나 참고 이미지를 변경하지 않는다.
- 디자인 시스템에 없는 임의 컬러, 큰 radius, 과한 장식을 남발하지 않는다.
- 파일 전체 재작성이나 대규모 정렬 변경을 피한다.

## Standards & References

- 프로젝트 규칙: `CLAUDE.md`
- 관리자 기능 정의: `admin/docs/feature-spec.md`
- 관리자 디자인 시스템: `admin/design-system.md`
- 참고 이미지: `admin/docs/ref_images/`
- 1차 시안: `admin/prototype/`
- 최종 퍼블리싱: `admin/src/`

## Context Map

- **[관리자 화면 작업](./admin/AGENTS.md)** — `admin/` 하위 문서, 프로토타입, 최종 퍼블리싱 파일을 수정할 때.

## Maintenance Policy

규칙과 실제 코드 또는 문서가 달라지면, 변경 전에 차이를 사용자에게 알리고 `AGENTS.md` 또는 관련 문서 업데이트를 제안한다.
