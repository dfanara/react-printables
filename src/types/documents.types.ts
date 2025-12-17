import type { PDFMargin } from "puppeteer";

export type PageSize = "Letter" | "Legal" | "5x7" | "3x5";

export interface DocumentMeta {
  title: string;
  description: string;
  overview: string;
  sizes: PageSize[];
  orientation: "portrait" | "landscape";
  margin?: PDFMargin;
}

export interface DocumentProps {
  meta: DocumentMeta;
  pageSize: PageSize;
}

export interface DocumentRegistration {
  meta: DocumentMeta
  component: React.ComponentType<DocumentProps>
}