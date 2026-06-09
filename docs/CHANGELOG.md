# Changelog

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
