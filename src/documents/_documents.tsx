import type { DocumentRegistration } from "../types/documents.types";
import { IdeaNotebookDocument, IdeaNotebookMeta } from "./IdeaNotebook";
import { MealPlanDocument, MealPlanMeta } from "./MealPlan";
import { SevenColumnLedgerMeta, SevenColumnLedgerDocument } from "./SevenColumnLedger";
import {EncounterSheetDocument, EncounterSheetMeta} from "./EncounterSheet.tsx";
import { RecipeCardDocument, RecipeCardMeta } from "./RecipeCard";

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
  },
  {
    meta: EncounterSheetMeta,
    component: EncounterSheetDocument
  },
  {
    meta: RecipeCardMeta,
    component: RecipeCardDocument
  }
]