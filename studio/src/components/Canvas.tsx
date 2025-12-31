import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEditorStore } from "../store/editorStore";
import { blockRegistry } from "../blocks/registry";

function SortableBlockItem({ id }: { id: string }) {
  const blocks = useEditorStore((s) => s.history.present.blocks);
  const select = useEditorStore((s) => s.selectBlock);
  const selectedId = useEditorStore((s) => s.selectedBlockId);

  const block = blocks.find((b) => b.id === id)!;
  const Component = blockRegistry[block.type];

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    borderRadius: 16,
    outline: selectedId === id ? "3px solid rgba(37,99,235,0.25)" : "none",
  };

  return (
    <div ref={setNodeRef} style={style} onClick={() => select(id)}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span
          {...attributes}
          {...listeners}
          style={{
            cursor: "grab",
            border: "1px solid rgba(0,0,0,0.10)",
            borderRadius: 999,
            padding: "4px 8px",
            fontSize: 12,
            background: "rgba(0,0,0,0.02)",
          }}
        >
          Drag
        </span>
        <span style={{ fontSize: 12, opacity: 0.6 }}>{block.type}</span>
      </div>
      <Component props={block.props} />
    </div>
  );
}

export default function Canvas() {
  const blocks = useEditorStore((s) => s.history.present.blocks);
  const reorder = useEditorStore((s) => s.reorderBlocks);

  const ids = blocks.map((b) => b.id);

  return (
    <div style={{ padding: 12, display: "grid", gap: 12 }}>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={(event) => {
          const { active, over } = event;
          if (!over || active.id === over.id) return;
          reorder(String(active.id), String(over.id));
        }}
      >
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          {ids.map((id) => (
            <SortableBlockItem key={id} id={id} />
          ))}
        </SortableContext>
      </DndContext>

      {blocks.length === 0 && (
        <div style={{ border: "1px dashed rgba(0,0,0,0.18)", borderRadius: 16, padding: 18, opacity: 0.7 }}>
          Add a block from the left panel to start.
        </div>
      )}
    </div>
  );
}
