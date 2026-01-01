import type { ProjectMediaProps } from "../types/layout";

type Props = { props: ProjectMediaProps };

export default function ProjectMediaBlock({ props }: Props) {
  const label = props.mediaAssetId ? `Asset ${props.mediaAssetId}` : props.mediaUrl || props.embedUrl || "";

  return (
    <div style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: 16, background: "#fff" }}>
      <div style={{ fontWeight: 700 }}>Media ({props.mediaType ?? "image"})</div>
      <div style={{ marginTop: 8, fontSize: 12, opacity: 0.7 }}>{label || "Add media URL or asset."}</div>
      <div style={{ marginTop: 12, height: 140, borderRadius: 12, border: "1px dashed rgba(0,0,0,0.15)", background: "rgba(0,0,0,0.02)" }} />
    </div>
  );
}
