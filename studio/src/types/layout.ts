export type BlockType =
  | "hero"
  | "richText"
  | "projectGrid"
  | "researchList"
  | "testimonialsGrid"
  | "resumeEmbed"
  | "pdfEmbed"
  | "projectTitle"
  | "projectBody"
  | "projectMedia"
  | "imageGallery"
  | "contactBlock"
  | "internshipList"
  | "internshipTimeline"
  | "internshipTitle"
  | "internshipMeta"
  | "internshipBody";

export type Block<TProps = any> = {
  id: string;
  type: BlockType;
  props: TProps;
};

export type Layout = {
  blocks: Block[];
};

export type HeroProps = {
  kicker: string;
  title: string;
  subtitle?: string;
  body?: string;
  pills: string[];
  mediaType?: "image" | "video";
  mediaUrl?: string;
  mediaAlt?: string;
  mediaLink?: string;
  mediaAssetId?: number | null;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
};

export type RichTextProps = {
  kicker?: string;
  title?: string;
  heading?: string;
  body: string;
  clampLines?: number;
  readMoreLabel?: string;
  readLessLabel?: string;
};

export type ProjectGridProps = {
  heading?: string;
  source?: "featured" | "all";
  columns?: 1 | 2 | 3 | 4;
};

export type ProjectTitleProps = {
  title?: string;
  githubUrl?: string;
  githubLabel?: string;
};

export type ProjectBodyProps = {
  body?: string;
};

export type ProjectMediaProps = {
  mediaType?: "image" | "video";
  mediaUrl?: string;
  mediaAlt?: string;
  mediaAssetId?: number | null;
  embedUrl?: string;
  embedHeight?: number;
};

export type ImageGalleryItem = {
  url?: string;
  alt?: string;
};

export type ImageGalleryProps = {
  images?: ImageGalleryItem[];
};

export type ResearchListProps = {
  heading?: string;
  description?: string;
  embedUrl?: string;
  embedHeight?: number;
};

export type TestimonialsGridProps = {
  heading?: string;
};

export type ResumeEmbedProps = {
  heading?: string;
  resumeUrl?: string;
};

export type PdfEmbedProps = {
  heading?: string;
  embedUrl?: string;
  height?: number;
};

export type ContactBlockProps = {
  title?: string;
  body?: string;
};

export type InternshipListItem = {
  title?: string;
  company?: string;
  subtitle?: string;
  duration?: string;
  techStack?: string[] | string;
  slug?: string;
  url?: string;
};

export type InternshipTimelineItem = {
  title?: string;
  company?: string;
  subtitle?: string;
  duration?: string;
  highlights?: string[] | string;
  techStack?: string[] | string;
  slug?: string;
  url?: string;
};

export type InternshipListProps = {
  heading?: string;
  subtitle?: string;
  items?: InternshipListItem[];
};

export type InternshipTimelineProps = {
  heading?: string;
  subtitle?: string;
  items?: InternshipTimelineItem[];
};

export type InternshipTitleProps = {
  title?: string;
  subtitle?: string;
};

export type InternshipMetaProps = {
  role?: string;
  team?: string;
  duration?: string;
};

export type InternshipBodyProps = {
  overview?: string;
  whatBuilt?: string;
  impact?: string;
};


