import type { InternshipTitleProps } from "../types/layout";

type Props = { props: InternshipTitleProps };

export default function InternshipTitleBlock({ props }: Props) {
  return (
    <div style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: 16, background: "#fff" }}>
      <div style={{ fontSize: 24, fontWeight: 800 }}>{props.title ?? "Internship"}</div>
      {props.subtitle && <div style={{ marginTop: 8, opacity: 0.7 }}>{props.subtitle}</div>}
    </div>
  );
}
