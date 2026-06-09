<div align="center">

  # RP.Universe.AI

  Privacy-first AI roleplay & storytelling app with long-term memory, custom characters, and 20+ providers.

  Originally based on the [LettuceAI](https://github.com/LettuceAI/app) codebase — now an independent project with its own direction.

  [Overview](#overview) • [Install](#install) • [Development](#development) • [Contributing](#contributing)
</div>

## Overview

RP.Universe.AI is a free and open-source AI character chat app built for immersive roleplay and storytelling. It supports 20+ AI providers with a bring-your-own-key setup — including OpenAI, Anthropic, Google Gemini, DeepSeek, Mistral, Groq, and more — plus local models via `llama.cpp`.

Your chats, characters, memories, and API keys stay on your device. No accounts, no paywalls, no locked features.

> **Current platform:** Windows desktop. Other platforms are not in scope at this time.

## Install

### Prerequisites

- [Bun](https://bun.sh/) 1.1+
- Rust 1.70+ and Cargo

### Quick Start

```powershell
git clone https://github.com/bouclem/RP.Universe.AI.git
cd RP.Universe.AI
bun install
```

## Development

### Commands

```powershell
# Frontend only (browser preview)
bun run dev

# Desktop app (dev mode)
bun run tauri dev

# Desktop app (release build)
bun run tauri build

# Type checking
bunx tsc --noEmit
bun run check

# Rust checks
cd src-tauri; cargo fmt; cargo check
```

### Windows Scripts

PowerShell and `.cmd` wrappers are available under `scripts/windows/`:

```powershell
.\scripts\windows\desktop-dev.ps1
.\scripts\windows\desktop-build.ps1
.\scripts\windows\check.ps1
```

```bat
scripts\windows\desktop-dev.cmd
scripts\windows\desktop-build.cmd
scripts\windows\check.cmd
```

### Kokoro TTS / eSpeak NG

Kokoro TTS phonemization requires eSpeak NG on `PATH`. If it's missing, the app will surface this at runtime. Install it once:

```powershell
winget install eSpeak-NG.eSpeak-NG
```

Or download from the [eSpeak NG releases](https://github.com/espeak-ng/espeak-ng/releases) and make sure the install directory is on `PATH`.

You can also point the app at a custom binary or data dir from the TTS settings panel.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

GNU Affero General Public License v3.0 — see `LICENSE`

<div align="center">
  <p>Privacy-first • Local-first • Open Source</p>
</div>
