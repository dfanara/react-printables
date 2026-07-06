import type { DocumentRegistration } from "../types/documents.types";
import { IdeaNotebookDocument, IdeaNotebookMeta } from "./IdeaNotebook";
import { MealPlanDocument, MealPlanMeta } from "./MealPlan";
import { SevenColumnLedgerMeta, SevenColumnLedgerDocument } from "./SevenColumnLedger";
import { EncounterSheetDocument, EncounterSheetMeta } from "./EncounterSheet.tsx";
import { RecipeCardDocument, RecipeCardMeta } from "./RecipeCard";
import { SceneSheetDocument, SceneSheetMeta } from "./SceneSheet";
import { FalloutRpgCharacterSheetDocument, FalloutRpgCharacterSheetMeta } from "./FalloutRpgCharacterSheet";
import { DndCardsDocument, DndCardsMeta } from "./DndCards";
import { CalendarCardsDocument, CalendarCardsMeta } from "./CalendarCards";
import {
  DndNpcHalfSheetDocument,
  DndNpcHalfSheetMeta,
  DndLocationHalfSheetDocument,
  DndLocationHalfSheetMeta,
  HalfSheetGridDocument,
  HalfSheetGridMeta,
  HalfSheetLinedNotesDocument,
  HalfSheetLinedNotesMeta,
  DndDmHalfSheetsDocument,
  DndDmHalfSheetsMeta
} from "./HalfSheets";

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
  },
  {
    meta: SceneSheetMeta,
    component: SceneSheetDocument
  },
  {
    meta: FalloutRpgCharacterSheetMeta,
    component: FalloutRpgCharacterSheetDocument
  },
  {
    meta: DndCardsMeta,
    component: DndCardsDocument
  },
  {
    meta: CalendarCardsMeta,
    component: CalendarCardsDocument
  },
  {
    meta: DndDmHalfSheetsMeta,
    component: DndDmHalfSheetsDocument
  },
  {
    meta: DndNpcHalfSheetMeta,
    component: DndNpcHalfSheetDocument
  },
  {
    meta: DndLocationHalfSheetMeta,
    component: DndLocationHalfSheetDocument
  },
  {
    meta: HalfSheetGridMeta,
    component: HalfSheetGridDocument
  },
  {
    meta: HalfSheetLinedNotesMeta,
    component: HalfSheetLinedNotesDocument
  }
]
