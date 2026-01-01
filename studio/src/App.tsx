import { useEffect } from "react";
import BlockLibrary from "./components/BlockLibrary";
import Canvas from "./components/Canvas";
import Inspector from "./components/Inspector";
import Toolbar from "./components/Toolbar";
import { fetchDraft } from "./api/pages";
import { useEditorStore } from "./store/editorStore";

export default function App() {
  const loadLayout = useEditorStore((s) => s.loadLayout);
  const setSlug = useEditorStore((s) => s.setPageSlug);

  useEffect(() => {
    const root = document.getElementById("studio-root");
    const slug = root?.getAttribute("data-page-slug") || "home";
    setSlug(slug);

    fetchDraft(slug).then((dto) => {
      loadLayout(dto.layout_json, dto.id, dto.is_published ? (dto.id as number) : null);
    });
  }, [loadLayout, setSlug]);

  return (
    <div
      style={{
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 18,
        overflow: "hidden",
        background: "#fbfbfd",
      }}
    >
      <Toolbar />

      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr 320px", minHeight: "75vh" }}>
        <div style={{ borderRight: "1px solid rgba(0,0,0,0.08)", background: "#fbfbfd" }}>
          <BlockLibrary />
        </div>

        <div style={{ background: "#fbfbfd" }}>
          <Canvas />
        </div>

        <div style={{ borderLeft: "1px solid rgba(0,0,0,0.08)", background: "#fbfbfd" }}>
          <Inspector />
        </div>
      </div>
    </div>
  );
}
