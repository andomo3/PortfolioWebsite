import type { InternshipMetaProps } from "../types/layout";

type Props = { props: InternshipMetaProps };

export default function InternshipMetaBlock({ props }: Props) {
  return (
    <div style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: 16, background: "#fff" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12 }}>
        <div>
          <div style={{ fontSize: 12, opacity: 0.6 }}>Role</div>
          <div style={{ fontWeight: 700 }}>{props.role ?? "-"}</div>
        </div>
        <div>
          <div style={{ fontSize: 12, opacity: 0.6 }}>Team</div>
          <div style={{ fontWeight: 700 }}>{props.team ?? "-"}</div>
        </div>
        <div>
          <div style={{ fontSize: 12, opacity: 0.6 }}>Duration</div>
          <div style={{ fontWeight: 700 }}>{props.duration ?? "-"}</div>
        </div>
      </div>
    </div>
  );
}
