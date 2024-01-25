import type { DocumentRegistration } from "../types/documents.types";
import { IdeaNotebookDocument, IdeaNotebookMeta } from "./IdeaNotebook";

export const Documents: DocumentRegistration[] = [
  {
    meta: IdeaNotebookMeta,
    component: IdeaNotebookDocument
  }
]