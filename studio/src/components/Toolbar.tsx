import { useState } from "react";
import { publishVersion, saveDraft } from "../api/pages";
import { useEditorStore } from "../store/editorStore";

export default function Toolbar() {
  const slug = useEditorStore((s) => s.pageSlug);
  const layout = useEditorStore((s) => s.history.present);
  const versionId = useEditorStore((s) => s.versionId);
  const markSaved = useEditorStore((s) => s.markSaved);
  const isDirty = useEditorStore((s) => s.isDirty);
  const isSaving = useEditorStore((s) => s.isSaving);
  const setSaving = useEditorStore((s) => s.setSaving);

  const [msg, setMsg] = useState("");

  async function onSave() {
    try {
      setSaving(true);
      setMsg("");
      const res = await saveDraft(slug, layout);
      markSaved(res.id as number);
      setMsg("Saved");
    } catch {
      setMsg("Save failed");
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(""), 1500);
    }
  }

  async function onPublish() {
    if (!versionId) {
      setMsg("Save first");
      return;
    }
    try {
      setSaving(true);
      setMsg("");
      await publishVersion(slug, versionId);
      setMsg("Published");
    } catch {
      setMsg("Publish failed");
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(""), 1500);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 12px",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        background: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div style={{ fontWeight: 800 }}>Studio | {slug}</div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 12, opacity: 0.7 }}>
          {isSaving ? "Saving..." : isDirty ? "Unsaved changes" : "Up to date"}
        </span>

        <button
          onClick={onSave}
          disabled={isSaving}
          style={{
            border: "1px solid rgba(0,0,0,0.10)",
            background: "#fff",
            borderRadius: 999,
            padding: "8px 12px",
            cursor: "pointer",
          }}
        >
          Save Draft
        </button>

        <button
          onClick={onPublish}
          disabled={isSaving}
          style={{
            border: "1px solid rgba(0,0,0,0.10)",
            background: "#111827",
            color: "#fff",
            borderRadius: 999,
            padding: "8px 12px",
            cursor: "pointer",
          }}
        >
          Publish
        </button>

        {msg && <span style={{ fontSize: 12, opacity: 0.8 }}>{msg}</span>}
      </div>
    </div>
  );
}
