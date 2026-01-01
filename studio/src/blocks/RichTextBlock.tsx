import type { RichTextProps } from "../types/layout";

type Props = { props: RichTextProps };

export default function RichTextBlock({ props }: Props) {
  const title = props.title ?? props.heading;

  return (
    <div style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: 16, background: "#fff" }}>
      {props.kicker && (
        <div style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.6 }}>
          {props.kicker}
        </div>
      )}
      {title && <div style={{ fontWeight: 800, marginTop: 8 }}>{title}</div>}
      <div style={{ opacity: 0.75, marginTop: 8, whiteSpace: "pre-wrap" }}>{props.body}</div>
    </div>
  );
}
