export type PageSize = "Letter" | "Legal";

export interface DocumentMeta {
  title: string;
  description: string;
  overview: string;
  sizes: PageSize[];
  oritentation: "portrait" | "landscape";
}

export interface DocumentProps {
  meta: DocumentMeta;
  pageSize: PageSize;
}

export interface DocumentRegistration {
  meta: DocumentMeta
  component: React.ComponentType<DocumentProps>
}