import type { ProjectBodyProps } from "../types/layout";

type Props = { props: ProjectBodyProps };

export default function ProjectBodyBlock({ props }: Props) {
  return (
    <div style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: 16, background: "#fff" }}>
      <div style={{ opacity: 0.8, whiteSpace: "pre-wrap" }}>{props.body ?? "Project details..."}</div>
    </div>
  );
}
