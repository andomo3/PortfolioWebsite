import type { InternshipBodyProps } from "../types/layout";

type Props = { props: InternshipBodyProps };

export default function InternshipBodyBlock({ props }: Props) {
  return (
    <div style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: 16, background: "#fff" }}>
      {props.overview && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Overview</div>
          <div style={{ opacity: 0.7, whiteSpace: "pre-wrap" }}>{props.overview}</div>
        </div>
      )}
      {props.whatBuilt && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>What I Built</div>
          <div style={{ opacity: 0.7, whiteSpace: "pre-wrap" }}>{props.whatBuilt}</div>
        </div>
      )}
      {props.impact && (
        <div>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Impact</div>
          <div style={{ opacity: 0.7, whiteSpace: "pre-wrap" }}>{props.impact}</div>
        </div>
      )}
    </div>
  );
}
