# Superpowers 안내

이 파일은 현재 Codex 환경에 설치된 Superpowers 플러그인의 스킬 목록과 원문 위치를 보기 쉽게 정리한 문서입니다.

설치 위치:

`/Users/tanauxd/.codex/plugins/cache/openai-curated/superpowers/fef63ecf/skills`

## 핵심 원칙

- 적용 가능한 스킬이 있으면 작업 전에 확인한다.
- 구현 전에는 요구사항과 현재 코드 맥락을 먼저 파악한다.
- 버그는 증상 수정이 아니라 원인 확인 후 수정한다.
- 완료를 말하기 전에는 검증 결과를 확인한다.
- 큰 작업은 계획, 실행, 검토 단계를 나눠 진행한다.

## 사용 가능한 스킬

| 스킬 | 목적 | 원문 파일 |
|---|---|---|
| `using-superpowers` | 대화/작업 시작 시 적용 가능한 스킬을 확인하는 기본 절차 | `/Users/tanauxd/.codex/plugins/cache/openai-curated/superpowers/fef63ecf/skills/using-superpowers/SKILL.md` |
| `brainstorming` | 기능, 컴포넌트, 동작 변경 등 창의적 작업 전 요구와 설계를 정리 | `/Users/tanauxd/.codex/plugins/cache/openai-curated/superpowers/fef63ecf/skills/brainstorming/SKILL.md` |
| `writing-plans` | 요구사항이 정리된 뒤 구현 계획을 세움 | `/Users/tanauxd/.codex/plugins/cache/openai-curated/superpowers/fef63ecf/skills/writing-plans/SKILL.md` |
| `executing-plans` | 작성된 구현 계획을 단계별로 실행 | `/Users/tanauxd/.codex/plugins/cache/openai-curated/superpowers/fef63ecf/skills/executing-plans/SKILL.md` |
| `test-driven-development` | 기능/버그 수정 전 테스트를 먼저 작성하고 실패를 확인 | `/Users/tanauxd/.codex/plugins/cache/openai-curated/superpowers/fef63ecf/skills/test-driven-development/SKILL.md` |
| `systematic-debugging` | 버그나 예기치 않은 동작을 원인 중심으로 디버깅 | `/Users/tanauxd/.codex/plugins/cache/openai-curated/superpowers/fef63ecf/skills/systematic-debugging/SKILL.md` |
| `verification-before-completion` | 완료 보고 전 검증 명령과 결과를 확인 | `/Users/tanauxd/.codex/plugins/cache/openai-curated/superpowers/fef63ecf/skills/verification-before-completion/SKILL.md` |
| `using-git-worktrees` | 격리된 작업공간이 필요한 기능 작업에서 worktree 사용 | `/Users/tanauxd/.codex/plugins/cache/openai-curated/superpowers/fef63ecf/skills/using-git-worktrees/SKILL.md` |
| `dispatching-parallel-agents` | 서로 독립적인 여러 작업을 병렬 에이전트로 나눔 | `/Users/tanauxd/.codex/plugins/cache/openai-curated/superpowers/fef63ecf/skills/dispatching-parallel-agents/SKILL.md` |
| `subagent-driven-development` | 구현 계획의 독립 작업을 서브에이전트 중심으로 실행 | `/Users/tanauxd/.codex/plugins/cache/openai-curated/superpowers/fef63ecf/skills/subagent-driven-development/SKILL.md` |
| `requesting-code-review` | 주요 작업 완료 전 코드리뷰를 요청 | `/Users/tanauxd/.codex/plugins/cache/openai-curated/superpowers/fef63ecf/skills/requesting-code-review/SKILL.md` |
| `receiving-code-review` | 코드리뷰 피드백을 검증하고 구현 | `/Users/tanauxd/.codex/plugins/cache/openai-curated/superpowers/fef63ecf/skills/receiving-code-review/SKILL.md` |
| `finishing-a-development-branch` | 테스트 통과 후 병합/PR/정리 선택지를 제시하고 마무리 | `/Users/tanauxd/.codex/plugins/cache/openai-curated/superpowers/fef63ecf/skills/finishing-a-development-branch/SKILL.md` |
| `writing-skills` | 새 스킬 작성, 기존 스킬 편집, 배포 전 검증 | `/Users/tanauxd/.codex/plugins/cache/openai-curated/superpowers/fef63ecf/skills/writing-skills/SKILL.md` |

## 각 스킬의 짧은 설명

### `using-superpowers`

작업을 시작할 때 관련 스킬이 있는지 먼저 확인하라는 기본 규칙입니다. “간단한 작업”처럼 보여도 스킬 적용 가능성을 확인하도록 요구합니다.

### `brainstorming`

새 기능, 컴포넌트, 동작 변경 같은 창의적 작업 전에 현재 맥락을 파악하고 요구사항을 정리하도록 안내합니다. 원칙상 디자인을 제안하고 승인받은 뒤 구현으로 넘어가도록 되어 있습니다.

### `writing-plans`

요구사항이 정해진 뒤 구현 계획을 세우는 스킬입니다. 어떤 파일을 건드릴지, 어떤 순서로 작업할지, 어떻게 검증할지를 문서화하는 데 초점이 있습니다.

### `executing-plans`

이미 작성된 계획을 실제로 수행하는 절차입니다. 계획을 비판적으로 검토한 뒤 단계별로 실행하고 검증합니다.

### `test-driven-development`

테스트를 먼저 작성하고 실패를 본 뒤, 최소 구현으로 통과시키는 방식입니다. “실패를 보지 않은 테스트는 믿을 수 없다”는 원칙을 강조합니다.

### `systematic-debugging`

버그를 즉흥적으로 고치지 않고, 재현 → 원인 파악 → 최소 수정 → 검증 순서로 접근하도록 합니다.

### `verification-before-completion`

완료를 보고하기 전에 실제 검증 명령을 실행하고 결과를 확인하도록 합니다. “증거가 먼저, 주장은 나중”이라는 원칙입니다.

### `using-git-worktrees`

큰 기능 작업이나 격리가 필요한 작업을 별도 worktree에서 진행하도록 안내합니다.

### `dispatching-parallel-agents`

서로 독립적인 여러 조사나 수정 작업을 병렬로 나눠 수행할 때 사용합니다.

### `subagent-driven-development`

계획의 각 작업을 독립 서브에이전트에 맡기고, 스펙 준수 리뷰와 품질 리뷰를 거치는 방식입니다.

### `requesting-code-review`

작업 완료 전 별도 리뷰어 관점으로 문제를 찾도록 하는 절차입니다.

### `receiving-code-review`

리뷰 피드백을 무조건 수용하지 않고, 기술적으로 타당한지 검증한 뒤 반영하도록 합니다.

### `finishing-a-development-branch`

구현과 테스트가 끝난 뒤 병합, PR, 정리 같은 마무리 선택지를 다룹니다.

### `writing-skills`

새 Superpowers 스타일 스킬을 작성하거나 기존 스킬을 고칠 때 사용하는 가이드입니다.

## 참고

이 프로젝트의 현재 우선 규칙은 `AGENTS.md`에 적힌 지침입니다. 즉, 화면설계 작업에서는 Superpowers의 긴 승인 절차보다 사용자의 요청, 최소 변경, 정확성, 검증을 우선 적용합니다.
