import { Document, Page } from "@react-pdf/renderer";

export interface PageSizeProps {
  pageSize: React.ComponentPropsWithoutRef<typeof Page>["size"]
}

export interface DocumentRegistration {
  title: string
  component: Document
}