# Changelog

## [1.0.3] - 2026-06-09

### Verified
- **Assets**: Confirmed dark icon variants (`*_dark.svg`) retained for future theme support — no truly orphaned assets found
- **Rust code**: Verified 7 `eprintln!` statements in `infra/utils.rs` and `app/bootstrap.rs` are legitimate fallback logging for early initialization/panic scenarios
- **TypeScript**: Confirmed 637 `console.log` statements are intentional debugging traces throughout the codebase
- **Documentation**: No outdated comments requiring updates
- **Rename verification**: Final scan confirms no user-facing "LettuceAI" references remain in i18n strings or UI

## [1.0.2] - 2026-06-09

### Fixed
- **Critical**: Fixed 27 instances of `.map(|r| r.unwrap())` in `sync/db.rs` that could panic on database deserialization errors - now properly returns error instead of crashing
- Fixed Android backup storage path from "LettuceAI/" to "RP.Universe.AI/"
- Fixed Android log path from "lettuceai/logs/" to "rp-universe-ai/logs/"
- Fixed broken eSpeak Android bundle download URL (was pointing to old LettuceAI repo)
- Updated all User-Agent headers from "LettuceAI" to "RP.Universe.AI" across all provider adapters
- Updated HTTP-Referer and X-Title headers from "lettuceai.app" to "rp-universe-ai.app"

### Removed
- **Deleted entire `gen/android/` directory** (401 items) - Android project files no longer needed for Windows-only build
- **Removed Android target dependencies from Cargo.toml:**
  - `tauri-plugin-android-fs`
  - `jni`
  - Mobile-specific `ort` features (nnapi)
  - `tauri-plugin-barcode-scanner`
  - `tauri-plugin-haptics`
- **Removed macOS and Linux target dependencies** - project is Windows-only
- **Removed Android conditional code blocks** from:
  - `storage_manager/backup.rs` - Android backup export/import
  - `storage_manager/jsonl.rs` - Android file handling
  - `tts_manager/kokoro/runtime.rs` - Android eSpeak bridge
  - `tts_manager/kokoro/phonemizer.rs` - Android native phonemizer
  - `infra/logger.rs` - Android log export
- The remaining `#[cfg(target_os = "android")]` blocks in other files are dead code that won't compile on Windows

## [1.0.1] - 2026-06-09

### Changed
- Completed rename from LettuceAI to RP.Universe.AI across all remaining files
- Updated `src/core/chat/errorExplainer.ts`: replaced last "LettuceAI" string with "RP.Universe.AI"
- Updated `scripts/prepare-aur-package.sh`: renamed all `lettuceai-*` pkg names to `rp-universe-ai-*`, updated URLs and metadata filename
- Updated `scripts/package-linux-release-tarball.sh`: renamed `.lettuceai-release.json` to `.rp-universe-ai-release.json`
- Updated `scripts/publish-debian-repo.sh`: updated default `origin` value from `LettuceAI` to `RP.Universe.AI`
- Updated `README.md`: removed "fork of LettuceAI" language, added independent project statement with attribution, updated Android bundle URL
- Updated `CONTRIBUTING.md`: added independent project statement with attribution to original LettuceAI codebase
- Updated `docs/README.md`: same independent project language with attribution
- Rewrote `README.md`: Windows-only scope, removed all Android/iOS/macOS/Linux sections, accurate to current project state
- Rewrote `CONTRIBUTING.md`: replaced copied LettuceAI content with project-specific guidelines, Windows-only platform scope
- Updated `docs/TODO.md`: 1.0.2 testing scope narrowed to Windows only, removed mobile build tasks
- Deleted non-Windows scripts: `apply-android-overrides.mjs`, `build-espeak-android-bundle.sh`, `install-onnxruntime-ios.mjs`, `package-linux-release-tarball.sh`, `prepare-aur-package.sh`, `publish-debian-repo.sh`, `run-tauri-android-local-tmp.mjs`, `run-tauri-cuda-auto.mjs`, `run-tauri-ios-xcode-onnxruntime.sh`, `run-tauri-webkit-safe.mjs`, `write-sha256-sidecars.sh`
- Deleted Android wrappers from `scripts/windows/`: `android-build`, `android-dev`, `android-init` (`.cmd` + `.ps1`)

## [1.0.0] - 2026-06-08

### Changed
- **Renamed project from LettuceAI to RP.Universe.AI**
- Updated package name: `rp-universe-ai`
- Updated Tauri identifier: `com.bouclem.rp-universe-ai`
- Updated Cargo package name and lib name
- Updated window title to "RP.Universe.AI"
- Updated file associations (`.rpuniverse` backup extension)
- Updated GitHub repo link to https://github.com/bouclem/RP.Universe.AI
- Reset version to 1.0.0 for fork
- Updated event names from `lettuceai:*` to `rp-universe-ai:*`

### Added
- Fork attribution in README
- New project documentation (README, TODO, CHANGELOG)

### Notes
Initial release as a fork of the LettuceAI codebase. The project has since separated from the fork tree and is now developed independently. All core functionality from the original LettuceAI app is preserved.
