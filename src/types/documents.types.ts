import { Page } from '@react-pdf/renderer';

export type PageSize = "Letter" | "Legal" | "A4" | "A5";
export type ReactPDFPageSize = React.ComponentPropsWithoutRef<typeof Page>["size"]

export interface DocumentMeta {
  title: string;
  description: string;
  content: string;
  sizes: PageSize[];
}

export interface DocumentProps {
  meta: DocumentMeta;
  pageSize: PageSize;
}

export interface DocumentRegistration {
  meta: DocumentMeta
  component: React.ComponentType<DocumentProps>
}