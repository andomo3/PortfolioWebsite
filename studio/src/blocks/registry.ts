import HeroBlock from "./HeroBlock";
import RichTextBlock from "./RichTextBlock";
import ProjectGridBlock from "./ProjectGridBlock";
import ProjectTitleBlock from "./ProjectTitleBlock";
import ProjectBodyBlock from "./ProjectBodyBlock";
import ProjectMediaBlock from "./ProjectMediaBlock";
import ContactBlock from "./ContactBlock";
import InternshipListBlock from "./InternshipListBlock";
import InternshipTimelineBlock from "./InternshipTimelineBlock";
import InternshipTitleBlock from "./InternshipTitleBlock";
import InternshipMetaBlock from "./InternshipMetaBlock";
import InternshipBodyBlock from "./InternshipBodyBlock";
import type { BlockType } from "../types/layout";

export const blockRegistry: Record<BlockType, any> = {
  hero: HeroBlock,
  richText: RichTextBlock,
  projectGrid: ProjectGridBlock,
  researchList: RichTextBlock,
  testimonialsGrid: RichTextBlock,
  resumeEmbed: RichTextBlock,
  pdfEmbed: RichTextBlock,
  projectTitle: ProjectTitleBlock,
  projectBody: ProjectBodyBlock,
  projectMedia: ProjectMediaBlock,
  contactBlock: ContactBlock,
  internshipList: InternshipListBlock,
  internshipTimeline: InternshipTimelineBlock,
  internshipTitle: InternshipTitleBlock,
  internshipMeta: InternshipMetaBlock,
  internshipBody: InternshipBodyBlock,
};

export const blockLabels: Record<BlockType, string> = {
  hero: "Hero",
  richText: "Rich Text",
  projectGrid: "Project Grid",
  researchList: "Research List",
  testimonialsGrid: "Testimonials",
  resumeEmbed: "Resume Embed",
  pdfEmbed: "PDF Embed",
  projectTitle: "Project Title",
  projectBody: "Project Body",
  projectMedia: "Project Media",
  contactBlock: "Contact",
  internshipList: "Internship List",
  internshipTimeline: "Internship Timeline",
  internshipTitle: "Internship Title",
  internshipMeta: "Internship Meta",
  internshipBody: "Internship Body",
};
