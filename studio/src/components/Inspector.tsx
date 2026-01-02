import { useEffect, useState } from "react";
import { useEditorStore } from "../store/editorStore";
import { listAssets } from "../api/assets";
import type { MediaAssetDTO } from "../api/assets";

export default function Inspector() {
  const [assets, setAssets] = useState<MediaAssetDTO[]>([]);
  const [itemsJson, setItemsJson] = useState("");
  const selectedId = useEditorStore((state) => state.selectedBlockId);
  const blocks = useEditorStore((state) => state.history.present.blocks);
  const updateProps = useEditorStore((state) => state.updateBlockProps);
  const remove = useEditorStore((state) => state.removeBlock);

  useEffect(() => {
    listAssets().then(setAssets).catch(() => setAssets([]));
  }, []);

  const block = blocks.find((item) => item.id === selectedId);
  
  useEffect(() => {
    if (!block || (block.type !== "internshipList" && block.type !== "internshipTimeline")) {
      setItemsJson("");
      return;
    }
    setItemsJson(JSON.stringify((block.props as any)?.items || [], null, 2));
  }, [block?.id, block?.type]);

  if (!block) {
    return <div style={{ padding: 12, opacity: 0.7 }}>Select a block to edit.</div>;
  }

  const props = block.props as any;

  const updateCta = (
    key: "ctaPrimary" | "ctaSecondary",
    patch: { label?: string; href?: string }
  ) => {
    const next = { ...(props[key] || {}) };
    if (patch.label !== undefined) next.label = patch.label;
    if (patch.href !== undefined) next.href = patch.href;
    updateProps(block.id, { [key]: next });
  };


  const updateImage = (index: number, patch: { url?: string; alt?: string }) => {
    const next = Array.isArray(props.images) ? [...props.images] : [];
    while (next.length < 3) {
      next.push({});
    }
    next[index] = { ...next[index], ...patch };
    updateProps(block.id, { images: next });
  };

  return (
    <div style={{ padding: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 800 }}>Inspector</div>
        <button
          onClick={() => remove(block.id)}
          style={{
            border: "1px solid rgba(0,0,0,0.10)",
            background: "#fff",
            borderRadius: 12,
            padding: "6px 10px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>

      <div style={{ marginTop: 12, fontSize: 12, opacity: 0.6 }}>
        {block.type} | {block.id}
      </div>

      <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
        {block.type === "hero" && (
          <>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Kicker</div>
              <input
                value={props.kicker || ""}
                onChange={(event) => updateProps(block.id, { kicker: event.target.value })}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Title</div>
              <input
                value={props.title || ""}
                onChange={(event) => updateProps(block.id, { title: event.target.value })}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Body</div>
              <textarea
                value={props.body ?? props.subtitle ?? ""}
                onChange={(event) => updateProps(block.id, { body: event.target.value })}
                rows={3}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Pills (one per line)</div>
              <textarea
                value={(props.pills || []).join("\n")}
                onChange={(event) => updateProps(block.id, { pills: event.target.value.split("\n").filter(Boolean) })}
                rows={4}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>CTA Primary Label</div>
              <input
                value={props.ctaPrimary?.label || ""}
                onChange={(event) => updateCta("ctaPrimary", { label: event.target.value })}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>CTA Primary URL</div>
              <input
                value={props.ctaPrimary?.href || ""}
                onChange={(event) => updateCta("ctaPrimary", { href: event.target.value })}
                placeholder="/p/projects/"
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>CTA Secondary Label</div>
              <input
                value={props.ctaSecondary?.label || ""}
                onChange={(event) => updateCta("ctaSecondary", { label: event.target.value })}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>CTA Secondary URL</div>
              <input
                value={props.ctaSecondary?.href || ""}
                onChange={(event) => updateCta("ctaSecondary", { href: event.target.value })}
                placeholder="/media/builder_assets/YourResume.pdf"
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Media Type</div>
              <select
                value={props.mediaType || "image"}
                onChange={(event) => updateProps(block.id, { mediaType: event.target.value })}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </label>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Media URL</div>
              <input
                value={props.mediaUrl || ""}
                onChange={(event) => updateProps(block.id, { mediaUrl: event.target.value })}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Media Alt</div>
              <input
                value={props.mediaAlt || ""}
                onChange={(event) => updateProps(block.id, { mediaAlt: event.target.value })}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Media Link (optional)</div>
              <input
                value={props.mediaLink || ""}
                onChange={(event) => updateProps(block.id, { mediaLink: event.target.value })}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Media Asset (from Admin)</div>
              <select
                value={props.mediaAssetId ?? ""}
                onChange={(event) => updateProps(block.id, { mediaAssetId: event.target.value ? Number(event.target.value) : null })}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              >
                <option value="">Use Media URL</option>
                {assets.map((asset) => (
                  <option key={asset.id} value={asset.id}>
                    {asset.id} | {asset.alt_text || asset.file}
                  </option>
                ))}
              </select>
            </label>
          </>
        )}

        {block.type === "richText" && (
          <>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Kicker</div>
              <input
                value={props.kicker || ""}
                onChange={(event) => updateProps(block.id, { kicker: event.target.value })}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Title</div>
              <input
                value={props.title ?? props.heading ?? ""}
                onChange={(event) => updateProps(block.id, { title: event.target.value })}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Body</div>
              <textarea
                value={props.body || ""}
                onChange={(event) => updateProps(block.id, { body: event.target.value })}
                rows={6}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
          </>
        )}

        {block.type === "projectTitle" && (
          <>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Title</div>
              <input
                value={props.title || ""}
                onChange={(event) => updateProps(block.id, { title: event.target.value })}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>GitHub URL</div>
              <input
                value={props.githubUrl || ""}
                onChange={(event) => updateProps(block.id, { githubUrl: event.target.value })}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>GitHub Label</div>
              <input
                value={props.githubLabel || "View GitHub"}
                onChange={(event) => updateProps(block.id, { githubLabel: event.target.value })}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
          </>
        )}

        {block.type === "projectBody" && (
          <label>
            <div style={{ fontSize: 12, opacity: 0.7 }}>Body</div>
            <textarea
              value={props.body || ""}
              onChange={(event) => updateProps(block.id, { body: event.target.value })}
              rows={6}
              style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
            />
          </label>
        )}

        {block.type === "imageGallery" && (
          <>
            {[0, 1, 2].map((index) => {
              const image = (props.images || [])[index] || {};
              return (
                <div key={index} style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: 10 }}>
                  <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 6 }}>Image {index + 1}</div>
                  <label style={{ display: "grid", gap: 6 }}>
                    <input
                      value={image.url || ""}
                      onChange={(event) => updateImage(index, { url: event.target.value })}
                      placeholder="/media/builder_assets/your-image.jpg"
                      style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
                    />
                    <input
                      value={image.alt || ""}
                      onChange={(event) => updateImage(index, { alt: event.target.value })}
                      placeholder="Alt text (optional)"
                      style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
                    />
                  </label>
                </div>
              );
            })}
          </>
        )}

        {block.type === "projectMedia" && (
          <>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Media Type</div>
              <select
                value={props.mediaType || "image"}
                onChange={(event) => updateProps(block.id, { mediaType: event.target.value })}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </label>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Media URL</div>
              <input
                value={props.mediaUrl || ""}
                onChange={(event) => updateProps(block.id, { mediaUrl: event.target.value })}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Embed URL (optional)</div>
              <input
                value={props.embedUrl || ""}
                onChange={(event) => updateProps(block.id, { embedUrl: event.target.value })}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Embed Height (px)</div>
              <input
                type="number"
                min={300}
                value={props.embedHeight ?? 720}
                onChange={(event) => updateProps(block.id, { embedHeight: Number(event.target.value) })}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Media Alt</div>
              <input
                value={props.mediaAlt || ""}
                onChange={(event) => updateProps(block.id, { mediaAlt: event.target.value })}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Media Asset (from Admin)</div>
              <select
                value={props.mediaAssetId ?? ""}
                onChange={(event) => updateProps(block.id, { mediaAssetId: event.target.value ? Number(event.target.value) : null })}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              >
                <option value="">Use Media URL</option>
                {assets.map((asset) => (
                  <option key={asset.id} value={asset.id}>
                    {asset.id} | {asset.alt_text || asset.file}
                  </option>
                ))}
              </select>
            </label>
          </>
        )}

        {block.type === "contactBlock" && (
          <>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Title</div>
              <input
                value={props.title || ""}
                onChange={(event) => updateProps(block.id, { title: event.target.value })}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Body</div>
              <textarea
                value={props.body || ""}
                onChange={(event) => updateProps(block.id, { body: event.target.value })}
                rows={6}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
          </>
        )}

        {block.type === "internshipList" && (
          <>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Heading</div>
              <input
                value={props.heading || ""}
                onChange={(event) => updateProps(block.id, { heading: event.target.value })}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Subtitle</div>
              <textarea
                value={props.subtitle || ""}
                onChange={(event) => updateProps(block.id, { subtitle: event.target.value })}
                rows={3}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Items (JSON array)</div>
              <textarea
                value={itemsJson}
                onChange={(event) => setItemsJson(event.target.value)}
                onBlur={() => {
                  try {
                    const parsed = JSON.parse(itemsJson);
                    if (Array.isArray(parsed)) {
                      updateProps(block.id, { items: parsed });
                    }
                  } catch {
                    // Ignore invalid JSON
                  }
                }}
                rows={8}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
          </>
        )}

        {block.type === "internshipTimeline" && (
          <>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Heading</div>
              <input
                value={props.heading || ""}
                onChange={(event) => updateProps(block.id, { heading: event.target.value })}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Subtitle</div>
              <textarea
                value={props.subtitle || ""}
                onChange={(event) => updateProps(block.id, { subtitle: event.target.value })}
                rows={3}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Items (JSON array)</div>
              <textarea
                value={itemsJson}
                onChange={(event) => setItemsJson(event.target.value)}
                onBlur={() => {
                  try {
                    const parsed = JSON.parse(itemsJson);
                    if (Array.isArray(parsed)) {
                      updateProps(block.id, { items: parsed });
                    }
                  } catch {
                    // Ignore invalid JSON
                  }
                }}
                rows={8}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
          </>
        )}

        {block.type === "internshipTitle" && (
          <>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Title</div>
              <input
                value={props.title || ""}
                onChange={(event) => updateProps(block.id, { title: event.target.value })}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Subtitle</div>
              <input
                value={props.subtitle || ""}
                onChange={(event) => updateProps(block.id, { subtitle: event.target.value })}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
          </>
        )}

        {block.type === "internshipMeta" && (
          <>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Role</div>
              <input
                value={props.role || ""}
                onChange={(event) => updateProps(block.id, { role: event.target.value })}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Team</div>
              <input
                value={props.team || ""}
                onChange={(event) => updateProps(block.id, { team: event.target.value })}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Duration</div>
              <input
                value={props.duration || ""}
                onChange={(event) => updateProps(block.id, { duration: event.target.value })}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
          </>
        )}

        {block.type === "internshipBody" && (
          <>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Overview</div>
              <textarea
                value={props.overview || ""}
                onChange={(event) => updateProps(block.id, { overview: event.target.value })}
                rows={4}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>What I Built (one per line)</div>
              <textarea
                value={props.whatBuilt || ""}
                onChange={(event) => updateProps(block.id, { whatBuilt: event.target.value })}
                rows={4}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
            <label>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Impact (one per line)</div>
              <textarea
                value={props.impact || ""}
                onChange={(event) => updateProps(block.id, { impact: event.target.value })}
                rows={4}
                style={{ width: "100%", padding: 10, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}
              />
            </label>
          </>
        )}
      </div>
    </div>
  );
}
