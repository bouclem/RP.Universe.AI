# TODO / Roadmap

## 1.0.1 - Complete Rename
- [x] Remove All Languages Except English (US), French, Spanish
- [x] Update i18n registry (removed 18 locale imports and entries)
- [x] Update i18n strings in en.ts, es.ts, fr.ts (replace "LettuceAI" → "RP.Universe.AI")
- [x] Update UI strings in settings/help pages (`WhereToFind.tsx`, `HelpPage.tsx`, etc.)
- [x] Update remaining "LettuceAI" references in source code
- [x] Update GitHub URLs in CONTRIBUTING.md

## 1.0.2 - Bug Fixes
- [x] Address any build issues from rename
- [x] Fix any broken links/references
- [x] Test desktop build (Windows)

## 1.0.3 - Cleanup
- [ ] Remove unused assets/references
- [ ] Code cleanup and organization
- [ ] Update comments and documentation
- [ ] Final verification of all renames

## 1.1.0-pre1 - Universe System (Phase 1)
- [ ] **Add Universe System** - Core architecture for managing multiple RP worlds/settings
- [ ] **Simple Lorebook per Universe** - AI-generated lorebooks tied to each universe
- [ ] **Remove Characters from UI** - Hide character system from main UI (keep backend intact for future use)
  - Characters remain in storage/backend
  - UI navigation updated to focus on Universes
  - Migration path for existing character data

## 1.1.0-pre2 - Universe System (Phase 2)
- [ ] **Custom Universe Icons** - Add/upload custom images for universe icons
- [ ] **Custom Universe Names** - User-defined names for universes
- [ ] **Sub-Universes** - Nested universe structure (e.g., multiple "Real Life" variants without merging)
  - Allows different scenarios/settings under same parent theme
  - Independent lorebooks per sub-universe

## 1.1.0-pre3 - Universe System (Phase 3)
- [ ] **Universe Descriptions** - Detailed text descriptions for each universe
- [ ] **Extended Context Windows** - External/optimized context window system for larger prompts
- [ ] **Better Lorebook Organization** - Improved lorebook structure and management

## 1.1.0 - Universe System (Final)
- [ ] TBD - Complete universe system release
