# Contributing

RP.Universe.AI is an independent project. It originated from the [LettuceAI](https://github.com/LettuceAI/app) codebase, which provided the initial foundation and is gratefully acknowledged. The project has since separated from that codebase and is developed independently.

Contributions are welcome. This document explains how to work with the project effectively.

## Platform Scope

RP.Universe.AI currently targets **Windows desktop only**. Do not add, fix, or test features for Android, iOS, macOS, or Linux. Changes that are platform-agnostic (frontend logic, Rust core) are fine as long as they do not break the Windows build.

## Getting Started

```powershell
git clone https://github.com/bouclem/RP.Universe.AI.git
cd RP.Universe.AI
bun install
bun run tauri dev
```

See `README.md` for full setup instructions.

## Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
feat: add universe system core
fix: prevent duplicate memory saves
refactor: simplify provider state handling
docs: update README install steps
```

## Before Opening a Pull Request

- Keep the change focused. One concern per PR.
- Discuss large or invasive changes before starting work.
- Test on Windows before opening a PR.
- Update `docs/README.md`, `docs/TODO.md`, and `docs/CHANGELOG.md` if the change affects documented behavior or the roadmap.

## Code Style

- Follow the patterns already in the codebase before introducing new abstractions.
- Prefer the simplest change that fits cleanly.
- Frontend: React + TypeScript + Tailwind. Keep components focused on rendering and UI state.
- Backend: Rust (Tauri). Business logic, validation, and data processing belong here, not in the frontend.
- Avoid dead code, placeholder code, and local-environment workarounds in committed changes.

## AI Usage

AI tools are allowed as an assistive tool. You must understand, be able to explain, and take responsibility for every line you submit. Do not submit AI-generated code you cannot maintain.
