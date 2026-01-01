import type { ProjectGridProps } from "../types/layout";

type Props = { props: ProjectGridProps };

export default function ProjectGridBlock({ props }: Props) {
  return (
    <div style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: 16, background: "#fff" }}>
      <div style={{ fontWeight: 800, marginBottom: 8 }}>{props.heading ?? "Projects"}</div>
      <div style={{ opacity: 0.7, fontSize: 12 }}>
        Source: {props.source ?? "featured"} | Columns: {props.columns ?? 3}
      </div>
      <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: `repeat(${props.columns ?? 3}, 1fr)`, gap: 10 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{ height: 70, borderRadius: 12, border: "1px solid rgba(0,0,0,0.08)", background: "rgba(0,0,0,0.02)" }} />
        ))}
      </div>
    </div>
  );
}
