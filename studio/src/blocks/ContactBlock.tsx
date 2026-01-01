import type { ContactBlockProps } from "../types/layout";

type Props = { props: ContactBlockProps };

export default function ContactBlock({ props }: Props) {
  return (
    <div style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: 16, background: "#fff" }}>
      <div style={{ fontWeight: 800 }}>{props.title ?? "Contact"}</div>
      <div style={{ marginTop: 8, opacity: 0.75, whiteSpace: "pre-wrap" }}>{props.body ?? ""}</div>
    </div>
  );
}
