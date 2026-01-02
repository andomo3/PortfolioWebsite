import { nanoid } from "nanoid";
import { useEditorStore } from "../store/editorStore";
import { blockLabels } from "../blocks/registry";
import type { BlockType } from "../types/layout";

function defaultProps(type: BlockType) {
  if (type === "hero") {
    return {
      kicker: "Builder | Quant-Oriented Data Analyst",
      title: "Hi, I'm Abba.",
      body: "Dependable and empathetic.",
      pills: ["Seeking Summer 2026", "Building: Boxxer AI", "Learning: Deep Learning"],
      mediaType: "image",
      mediaUrl: "",
      mediaAlt: "Hero media",
      mediaLink: "",
      mediaAssetId: null,
      ctaPrimary: { label: "View Projects", href: "#projects" },
      ctaSecondary: { label: "Download Resume", href: "/p/resume/" },
    };
  }
  if (type === "richText") {
    return { kicker: "About", title: "Background", body: "Write something." };
  }
  if (type === "projectTitle") {
    return { title: "Project Title", githubUrl: "", githubLabel: "View GitHub" };
  }
  if (type === "projectBody") {
    return { body: "Project details go here." };
  }
  if (type === "projectMedia") {
    return {
      mediaType: "image",
      mediaUrl: "",
      mediaAlt: "Project media",
      mediaAssetId: null,
      embedUrl: "",
      embedHeight: 720,
    };
  }
  if (type === "imageGallery") {
    return {
      images: [
        { url: "/media/builder_assets/example-1.jpg", alt: "Gallery image 1" },
        { url: "/media/builder_assets/example-2.jpg", alt: "Gallery image 2" },
        { url: "/media/builder_assets/example-3.jpg", alt: "Gallery image 3" },
      ],
    };
  }
  if (type === "contactBlock") {
    return {
      title: "Get in touch",
      body: "Email: hello@example.com\nLinkedIn: https://linkedin.com/in/username",
    };
  }
  if (type === "internshipList") {
    return {
      heading: "Internships",
      subtitle: "Roles and internships where I built systems, shipped features, and measured impact.",
      items: [],
    };
  }
  if (type === "internshipTimeline") {
    return {
      heading: "Experience Timeline",
      subtitle: "Most recent first.",
      items: [],
    };
  }
  if (type === "internshipTitle") {
    return { title: "Internship Title", subtitle: "Short summary" };
  }
  if (type === "internshipMeta") {
    return { role: "Role", team: "Team", duration: "Dates" };
  }
  if (type === "internshipBody") {
    return { overview: "Overview", whatBuilt: "", impact: "" };
  }
  return { heading: "Featured Projects", source: "featured", columns: 3 };
}

export default function BlockLibrary() {
  const addBlock = useEditorStore((state) => state.addBlock);
  const types: BlockType[] = [
    "hero",
    "richText",
    "projectGrid",
    "projectTitle",
    "projectBody",
    "projectMedia",
    "imageGallery",
    "contactBlock",
    "internshipList",
    "internshipTimeline",
    "internshipTitle",
    "internshipMeta",
    "internshipBody",
  ];

  return (
    <div style={{ padding: 12 }}>
      <div style={{ fontWeight: 800, marginBottom: 8 }}>Blocks</div>
      <div style={{ display: "grid", gap: 8 }}>
        {types.map((type) => (
          <button
            key={type}
            onClick={() => addBlock({ id: nanoid(), type, props: defaultProps(type) })}
            style={{
              textAlign: "left",
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.10)",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            + {blockLabels[type]}
          </button>
        ))}
      </div>
    </div>
  );
}
