export type LayoutType =
  | "Special Startpage"
  | "Default"
  | "Fullwidth Hero"
  | "Catalog & Fleet Grid"
  | "Estimator Calculator"
  | "Showcase Gallery"
  | "Contact & Location";

export interface PageNode {
  id: string;
  title: string;
  slug: string;
  depth: number;
  iconType: "globe" | "page" | "spacer" | "folder" | "settings";
  actualLayout: LayoutType;
  layoutThisPage: LayoutType | "None (Inherit)";
  layoutSubpages: LayoutType | "None (Inherit)";
  status: "published" | "draft" | "hidden";
  hasChildren?: boolean;
  expanded?: boolean;
  lastModified?: string;
  author?: string;
  parentId?: string | null;
}

export interface LayoutDefinition {
  id: LayoutType;
  name: string;
  description: string;
  columns: number;
  previewType: "hero-3col" | "standard-sidebar" | "fullwidth" | "grid-cards" | "calculator" | "gallery" | "contact-map";
  tags: string[];
}
