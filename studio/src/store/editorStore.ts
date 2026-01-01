import { create } from "zustand";
import { produce } from "immer";
import type { Block, Layout } from "../types/layout";

type HistoryState = {
  past: Layout[];
  present: Layout;
  future: Layout[];
};

type EditorState = {
  pageSlug: string;
  versionId: number | null;
  publishedVersionId: number | null;
  selectedBlockId: string | null;
  history: HistoryState;
  isDirty: boolean;
  isSaving: boolean;
  setPageSlug: (slug: string) => void;
  loadLayout: (layout: Layout, versionId: number | null, publishedId: number | null) => void;
  selectBlock: (id: string | null) => void;
  addBlock: (block: Block) => void;
  updateBlockProps: (id: string, props: any) => void;
  removeBlock: (id: string) => void;
  reorderBlocks: (activeId: string, overId: string) => void;
  undo: () => void;
  redo: () => void;
  markSaved: (newVersionId: number) => void;
  setSaving: (v: boolean) => void;
};

const emptyLayout: Layout = { blocks: [] };

export const useEditorStore = create<EditorState>((set) => ({
  pageSlug: "home",
  versionId: null,
  publishedVersionId: null,
  selectedBlockId: null,
  history: { past: [], present: emptyLayout, future: [] },
  isDirty: false,
  isSaving: false,

  setPageSlug: (slug) => set({ pageSlug: slug }),

  loadLayout: (layout, versionId, publishedId) =>
    set({
      versionId,
      publishedVersionId: publishedId,
      selectedBlockId: null,
      history: { past: [], present: layout, future: [] },
      isDirty: false,
    }),

  selectBlock: (id) => set({ selectedBlockId: id }),

  addBlock: (block) => {
    set(
      produce((state: EditorState) => {
        state.history.past.push(state.history.present);
        state.history.present = { blocks: [...state.history.present.blocks, block] };
        state.history.future = [];
        state.selectedBlockId = block.id;
        state.isDirty = true;
      })
    );
  },

  updateBlockProps: (id, props) => {
    set(
      produce((state: EditorState) => {
        const blocks = state.history.present.blocks.map((b) =>
          b.id === id ? { ...b, props: { ...b.props, ...props } } : b
        );
        state.history.past.push(state.history.present);
        state.history.present = { blocks };
        state.history.future = [];
        state.isDirty = true;
      })
    );
  },

  removeBlock: (id) => {
    set(
      produce((state: EditorState) => {
        const blocks = state.history.present.blocks.filter((b) => b.id !== id);
        state.history.past.push(state.history.present);
        state.history.present = { blocks };
        state.history.future = [];
        if (state.selectedBlockId === id) state.selectedBlockId = null;
        state.isDirty = true;
      })
    );
  },

  reorderBlocks: (activeId, overId) => {
    set(
      produce((state: EditorState) => {
        const blocks = [...state.history.present.blocks];
        const from = blocks.findIndex((b) => b.id === activeId);
        const to = blocks.findIndex((b) => b.id === overId);
        if (from === -1 || to === -1) return;

        const [moved] = blocks.splice(from, 1);
        blocks.splice(to, 0, moved);

        state.history.past.push(state.history.present);
        state.history.present = { blocks };
        state.history.future = [];
        state.isDirty = true;
      })
    );
  },

  undo: () =>
    set(
      produce((state: EditorState) => {
        const past = state.history.past;
        if (past.length === 0) return;
        const previous = past[past.length - 1];
        state.history.past = past.slice(0, -1);
        state.history.future.unshift(state.history.present);
        state.history.present = previous;
        state.isDirty = true;
      })
    ),

  redo: () =>
    set(
      produce((state: EditorState) => {
        const future = state.history.future;
        if (future.length === 0) return;
        const next = future[0];
        state.history.future = future.slice(1);
        state.history.past.push(state.history.present);
        state.history.present = next;
        state.isDirty = true;
      })
    ),

  markSaved: (newVersionId) => set({ versionId: newVersionId, isDirty: false }),
  setSaving: (v) => set({ isSaving: v }),
}));
