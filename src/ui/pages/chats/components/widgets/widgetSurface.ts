export function widgetCardClass(hasBackground: boolean): string {
  return hasBackground
    ? "border-fg/12 bg-surface-el/80 backdrop-blur-md"
    : "border-fg/10 bg-fg/5";
}
