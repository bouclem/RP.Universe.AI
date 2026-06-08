# RP.Universe.AI

A fork of [LettuceAI](https://github.com/LettuceAI/app) - Privacy-first AI roleplay & storytelling app with long-term memory, custom characters, and 20+ providers.

## Overview

RP.Universe.AI is a privacy-focused, free and open-source AI character chat app for immersive roleplay, storytelling, and realistic AI companions with long-term memory that actually lasts.

## Repository

- **GitHub:** https://github.com/bouclem/RP.Universe.AI
- **Original:** https://github.com/LettuceAI/app

## Tech Stack

- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS
- **Backend:** Tauri v2 (Rust)
- **Mobile:** Android & iOS support via Tauri
- **AI:** Local models via llama.cpp + 20+ remote providers

## Development

```bash
# Install dependencies
bun install

# Dev server
bun run dev

# Desktop build
bun run tauri dev

# Android
bun run tauri:android:dev
```

## License

GNU Affero General Public License v3.0
