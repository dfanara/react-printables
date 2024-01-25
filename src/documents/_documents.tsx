import type { DocumentRegistration } from "../types/documents.types";
import { MyDocument, MyDocumentMeta } from "./TestDocument";

export const Documents: DocumentRegistration[] = [
  {
    meta: MyDocumentMeta,
    component: MyDocument
  }
]