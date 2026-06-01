import { useEffect, useRef, useState } from "react";
import type { CompanionTimeOverride } from "../../../../core/storage/schemas";

export type OverrideMode = CompanionTimeOverride["mode"];

export function effectiveOverrideMs(
  override: CompanionTimeOverride | undefined | null,
  nowMs: number,
): number {
  if (!override || override.mode === "off") return nowMs;
  if (override.mode === "frozen") return override.anchorMs;
  return override.anchorMs + (nowMs - override.setAtMs);
}

export function toLocalInputValue(ms: number): string {
  const d = new Date(ms);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}`;
}

export function useCompanionTimeOverrideEditor(
  override: CompanionTimeOverride | undefined | null,
  onApply: (next: CompanionTimeOverride | null) => void | Promise<void>,
  canEdit: boolean,
) {
  const activeMode: OverrideMode = override?.mode ?? "off";
  const [nowMs, setNowMs] = useState(() => Date.now());
  const [selectedMode, setSelectedMode] = useState<OverrideMode>(activeMode);
  const [draft, setDraft] = useState("");
  const editingRef = useRef(false);

  useEffect(() => {
    const id = window.setInterval(() => setNowMs(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    setSelectedMode(activeMode);
  }, [activeMode]);

  const shownMs = effectiveOverrideMs(override, nowMs);

  useEffect(() => {
    if (selectedMode === "off" || editingRef.current) return;
    const next = toLocalInputValue(shownMs);
    setDraft((prev) => (prev === next ? prev : next));
  }, [selectedMode, shownMs]);

  const selectMode = (mode: OverrideMode) => {
    if (!canEdit) return;
    editingRef.current = false;
    setSelectedMode(mode);
    if (mode === "off") {
      void onApply(null);
      return;
    }
    setDraft(toLocalInputValue(shownMs));
  };

  const apply = () => {
    if (!canEdit || selectedMode === "off") return;
    const anchorMs = new Date(draft).getTime();
    if (Number.isNaN(anchorMs)) return;
    editingRef.current = false;
    void onApply({ mode: selectedMode, anchorMs, setAtMs: Date.now() });
  };

  return {
    activeMode,
    selectedMode,
    selectMode,
    draft,
    setDraft,
    beginEditing: () => {
      editingRef.current = true;
    },
    apply,
    shownMs,
    nowMs,
    isOverridden: activeMode !== "off",
  };
}
