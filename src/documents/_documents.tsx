import type { DocumentRegistration } from "../types/documents.types";
import { IdeaNotebookDocument, IdeaNotebookMeta } from "./IdeaNotebook";
import { MealPlanDocument, MealPlanMeta } from "./MealPlan";
import { SevenColumnLedgerMeta, SevenColumnLedgerDocument } from "./SevenColumnLedger";

export const Documents: DocumentRegistration[] = [
  {
    meta: IdeaNotebookMeta,
    component: IdeaNotebookDocument
  },
  {
    meta: SevenColumnLedgerMeta,
    component: SevenColumnLedgerDocument
  },
  {
    meta: MealPlanMeta,
    component: MealPlanDocument
  }
]