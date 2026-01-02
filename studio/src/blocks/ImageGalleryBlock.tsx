import type { ImageGalleryProps } from "../types/layout";

export default function ImageGalleryBlock({ props }: { props: ImageGalleryProps }) {
  const images = (props.images || []).slice(0, 3);

  return (
    <div
      style={{
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 16,
        padding: 16,
        background: "#fff",
      }}
    >
      <div style={{ fontWeight: 800, marginBottom: 8 }}>Image Gallery</div>
      {images.length === 0 ? (
        <div style={{ opacity: 0.7 }}>Add up to 3 images.</div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: 10,
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          }}
        >
          {images.map((image, index) => (
            <div
              key={`${image.url || "image"}-${index}`}
              style={{
                height: 120,
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.08)",
                background: "rgba(0,0,0,0.02)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                fontSize: 12,
                textAlign: "center",
                padding: 8,
              }}
            >
              {image.url || "Image URL"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
