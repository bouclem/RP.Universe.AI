import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { WidgetNode } from "../../../../../core/storage/schemas";

export type WidgetSide = "left" | "right";

export interface WidgetSlots {
  left: WidgetNode[];
  right: WidgetNode[];
}

interface WidgetEditContextValue {
  editing: boolean;
  saving: boolean;
  enterEdit: () => void;
  done: () => void;
  revert: () => void;
  getNodes: (side: WidgetSide) => WidgetNode[];
  setNodes: (side: WidgetSide, nodes: WidgetNode[]) => void;
  addNode: (side: WidgetSide, node: WidgetNode) => void;
  updateNode: (side: WidgetSide, node: WidgetNode) => void;
  removeNode: (side: WidgetSide, id: string) => void;
}

const WidgetEditCtx = createContext<WidgetEditContextValue | null>(null);

interface WidgetEditProviderProps {
  slots: WidgetSlots;
  onPersist: (slots: WidgetSlots) => Promise<void> | void;
  children: ReactNode;
}

export function WidgetEditProvider({
  slots,
  onPersist,
  children,
}: WidgetEditProviderProps) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [draft, setDraft] = useState<WidgetSlots>(slots);

  useEffect(() => {
    if (!editing) setDraft(slots);
  }, [slots, editing]);

  const enterEdit = useCallback(() => {
    setDraft(slots);
    setEditing(true);
  }, [slots]);

  const revert = useCallback(() => {
    setDraft(slots);
    setEditing(false);
  }, [slots]);

  const done = useCallback(async () => {
    setSaving(true);
    try {
      await onPersist(draft);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  }, [draft, onPersist]);

  const getNodes = useCallback(
    (side: WidgetSide) => (editing ? draft[side] : slots[side]),
    [editing, draft, slots],
  );

  const setNodes = useCallback((side: WidgetSide, nodes: WidgetNode[]) => {
    setDraft((prev) => ({ ...prev, [side]: nodes }));
  }, []);

  const addNode = useCallback((side: WidgetSide, node: WidgetNode) => {
    setDraft((prev) => ({ ...prev, [side]: [...prev[side], node] }));
  }, []);

  const updateNode = useCallback((side: WidgetSide, node: WidgetNode) => {
    setDraft((prev) => ({
      ...prev,
      [side]: prev[side].map((n) => (n.id === node.id ? node : n)),
    }));
  }, []);

  const removeNode = useCallback((side: WidgetSide, id: string) => {
    setDraft((prev) => ({
      ...prev,
      [side]: prev[side].filter((n) => n.id !== id),
    }));
  }, []);

  const value = useMemo<WidgetEditContextValue>(
    () => ({
      editing,
      saving,
      enterEdit,
      done: () => void done(),
      revert,
      getNodes,
      setNodes,
      addNode,
      updateNode,
      removeNode,
    }),
    [editing, saving, enterEdit, done, revert, getNodes, setNodes, addNode, updateNode, removeNode],
  );

  return <WidgetEditCtx.Provider value={value}>{children}</WidgetEditCtx.Provider>;
}

export function useWidgetEdit(): WidgetEditContextValue {
  const ctx = useContext(WidgetEditCtx);
  if (!ctx) {
    throw new Error("useWidgetEdit used outside WidgetEditProvider");
  }
  return ctx;
}
