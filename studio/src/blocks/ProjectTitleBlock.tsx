import type { ProjectTitleProps } from "../types/layout";

type Props = { props: ProjectTitleProps };

export default function ProjectTitleBlock({ props }: Props) {
  return (
    <div style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: 16, background: "#fff" }}>
      <div style={{ fontSize: 24, fontWeight: 800 }}>{props.title ?? "Project Title"}</div>
      {props.githubUrl && (
        <div style={{ fontSize: 12, marginTop: 8, opacity: 0.7 }}>
          {props.githubLabel ?? "View GitHub"}: {props.githubUrl}
        </div>
      )}
    </div>
  );
}
