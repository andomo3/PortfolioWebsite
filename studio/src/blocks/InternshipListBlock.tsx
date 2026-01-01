import type { InternshipListProps } from "../types/layout";

type Props = { props: InternshipListProps };

export default function InternshipListBlock({ props }: Props) {
  const items = props.items ?? [];

  return (
    <div style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: 16, background: "#fff" }}>
      {props.heading && <div style={{ fontWeight: 800 }}>{props.heading}</div>}
      {props.subtitle && <div style={{ marginTop: 6, opacity: 0.7 }}>{props.subtitle}</div>}
      <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
        {items.length === 0 && <div style={{ fontSize: 12, opacity: 0.6 }}>Add internship items.</div>}
        {items.map((item, index) => (
          <div key={index} style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: 12 }}>
            <div style={{ fontWeight: 700 }}>{item.title ?? "Internship"}</div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>{item.company ?? ""}</div>
            {item.subtitle && <div style={{ fontSize: 12, marginTop: 6 }}>{item.subtitle}</div>}
            {item.duration && <div style={{ fontSize: 12, opacity: 0.6, marginTop: 6 }}>{item.duration}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
