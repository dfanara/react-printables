import type { DocumentRegistration } from "../types/documents.types";
import { IdeaNotebookDocument, IdeaNotebookMeta } from "./IdeaNotebook";
import { SevenColumnLedgerMeta, SevenColumnLedgerDocument } from "./SevenColumnLedger";

export const Documents: DocumentRegistration[] = [
  {
    meta: IdeaNotebookMeta,
    component: IdeaNotebookDocument
  },
  {
    meta: SevenColumnLedgerMeta,
    component: SevenColumnLedgerDocument
  }
]