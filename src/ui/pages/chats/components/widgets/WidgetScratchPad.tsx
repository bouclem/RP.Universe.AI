import type { ScratchPadNode } from "../../../../../core/storage/chatWidgetSchemas";
import { cn } from "../../../../design-tokens";
import { MarkdownRenderer } from "../MarkdownRenderer";
import { useWidgetContext } from "./WidgetContext";
import { widgetCardClass } from "./widgetSurface";

interface WidgetScratchPadProps {
  node: ScratchPadNode;
}

export function WidgetScratchPad({ node }: WidgetScratchPadProps) {
  const { hasBackground } = useWidgetContext();
  const content = node.content?.trim() ?? "";
  return (
    <section className="flex flex-col gap-1.5">
      {(node.title || node.description) && (
        <header className="flex flex-col gap-0.5 px-0.5">
          {node.title && (
            <h3 className="text-sm font-semibold text-fg/75">{node.title}</h3>
          )}
          {node.description && (
            <p className="text-[11px] leading-snug text-fg/45">{node.description}</p>
          )}
        </header>
      )}
      <div
        className={cn(
          "rounded-xl border px-3 py-2 text-sm text-fg/80",
          widgetCardClass(hasBackground),
        )}
      >
        {content ? (
          <MarkdownRenderer content={content} />
        ) : (
          <span className="text-[12px] italic text-fg/35">Empty scratch pad.</span>
        )}
      </div>
    </section>
  );
}
