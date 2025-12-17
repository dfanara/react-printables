import type { DocumentMeta, DocumentProps } from "../types/documents.types";
import dedent from "dedent";
import useBaseMargin from "../components/hooks/useBaseMargin";
import Page from "../components/layout/Page";
import Document from "../components/layout/Document";

export const RecipeCardMeta: DocumentMeta = {
  title: "Recipe Card",
  description: "A two-sided recipe card with macro labels.",
  overview: dedent`
    A clean recipe card with space for ingredients, instructions, and nutritional macros.
    
    The front includes recipe title, servings, prep/cook time, ingredients, instructions, 
    and macro information (Protein, Carbs, Fat, Calories).
    
    The back provides space for notes, variations, and substitutions.    
  `,
  sizes: ["3x5", "5x7"],
  orientation: "landscape",
  margin: useBaseMargin("0.2in")
}

export const RecipeCardDocument = ({ meta, pageSize }: DocumentProps) => {
  const is3x5 = pageSize === "3x5";

  return (
    <Document meta={meta}>
      <Page>
        <RecipeCardFront compact={is3x5} />
      </Page>
      <Page>
        <RecipeCardBack compact={is3x5} />
      </Page>
    </Document>
  )
}

interface CardProps {
  compact: boolean;
}

function RecipeCardFront({ compact }: CardProps) {
  const ingredientLines = compact ? 10 : 14;
  const instructionLines = compact ? 5 : 8;

  return (
    <div className="h-full w-full flex bg-white gap-2">
      <div className="flex-1 flex flex-col">
        {/* Header Row */}
        <div className="grid grid-cols-5 gap-2 mb-1.5">
          <div className="flex items-center bg-slate-50 px-1 py-0.5 col-span-4">
            <span className="font-mono tracking-wider font-medium text-[7px]">RECIPE</span>
            <span className="font-mono tracking-wider text-slate-400 px-0.5 text-[9px]">/</span>
          </div>
          <div className="flex items-center bg-slate-50 px-1 py-0.5">
            <span className="font-mono tracking-wider font-medium text-[7px]">SERVINGS</span>
            <span className="font-mono tracking-wider text-slate-400 px-0.5 text-[9px]">/</span>
          </div>
        </div>

        {/* Macros & Time Row */}
        <div className="grid grid-cols-5 w-full gap-2 mb-2">
          <div className="flex items-center bg-slate-50 px-1 py-0.5">
            <span className="font-mono tracking-wider font-medium text-[7px] leading-none">CALORIES</span>
            <span className="font-mono tracking-wider text-slate-400 px-0.5 text-[9px]">/</span>
          </div>
          <div className="flex items-center bg-slate-50 px-1 py-0.5">
            <span className="font-mono tracking-wider font-medium text-[7px] leading-none">PROTEIN</span>
            <span className="font-mono tracking-wider text-slate-400 px-0.5 text-[9px]">/</span>
          </div>
          <div className="flex items-center bg-slate-50 px-1 py-0.5">
            <span className="font-mono tracking-wider font-medium text-[7px] leading-none">CARBS</span>
            <span className="font-mono tracking-wider text-slate-400 px-0.5 text-[9px]">/</span>
          </div>
          <div className="flex items-center bg-slate-50 px-1 py-0.5">
            <span className="font-mono tracking-wider font-medium text-[7px] leading-none">FAT</span>
            <span className="font-mono tracking-wider text-slate-400 px-0.5 text-[9px]">/</span>
          </div>
          <div className="flex items-center bg-slate-50 px-1 py-0.5">
            <span className="font-mono tracking-wider font-medium text-[7px] leading-none">TIME</span>
            <span className="font-mono tracking-wider text-slate-400 px-0.5 text-[9px]">/</span>
          </div>
        </div>

        {/* Two Column Layout: Ingredients & Instructions */}
        <div className="flex-1 grid grid-cols-2 gap-3">
          {/* Ingredients */}
          <div className="flex flex-col">
            <div className="font-mono tracking-wider font-medium text-[8px] border-b border-slate-900 pb-0.5 mb-1">
              INGREDIENTS
            </div>
            <div className="flex-1 grid" style={{ gridTemplateRows: `repeat(${ingredientLines}, 1fr)` }}>
              {Array.from({ length: ingredientLines }).map((_, i) => (
                <div key={i} className="border-b border-slate-200 flex items-center gap-1 px-0.5">
                  <div className="w-1.5 h-1.5 rounded-sm border border-slate-300 flex-shrink-0"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="flex flex-col">
            <div className="font-mono tracking-wider font-medium text-[8px] border-b border-slate-900 pb-0.5 mb-1">
              INSTRUCTIONS
            </div>
            <div className="flex-1 grid" style={{ gridTemplateRows: `repeat(${instructionLines}, 1fr)` }}>
              {Array.from({ length: instructionLines }).map((_, i) => (
                <div key={i} className="border-b border-slate-200 flex items-start gap-1 px-0.5 pt-0.5">
                  <span className="font-mono text-[7px] text-slate-400 flex-shrink-0">{i + 1}.</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RecipeCardBack({ compact }: CardProps) {
  const noteLines = compact ? 6 : 10;
  const sectionLines = compact ? 3 : 5;

  return (
    <div className="h-full w-full flex flex-col bg-white">
      {/* Notes Section - Takes most of the space */}
      <div className="flex-[2] flex flex-col mb-2">
        <div className="font-mono tracking-wider font-medium text-[8px] border-b border-slate-900 pb-0.5 mb-1">
          NOTES
        </div>
        <div className="flex-1 grid" style={{ gridTemplateRows: `repeat(${noteLines}, 1fr)` }}>
          {Array.from({ length: noteLines }).map((_, i) => (
            <div key={i} className="border-b border-slate-200"></div>
          ))}
        </div>
      </div>

      {/* Bottom Row: Variations & Substitutions side by side */}
      <div className="flex-1 grid grid-cols-2 gap-3">
        <div className="flex flex-col">
          <div className="font-mono tracking-wider font-medium text-[8px] border-b border-slate-900 pb-0.5 mb-1">
            VARIATIONS
          </div>
          <div className="flex-1 grid" style={{ gridTemplateRows: `repeat(${sectionLines}, 1fr)` }}>
            {Array.from({ length: sectionLines }).map((_, i) => (
              <div key={i} className="border-b border-slate-200"></div>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="font-mono tracking-wider font-medium text-[8px] border-b border-slate-900 pb-0.5 mb-1">
            SUBSTITUTIONS
          </div>
          <div className="flex-1 grid" style={{ gridTemplateRows: `repeat(${sectionLines}, 1fr)` }}>
            {Array.from({ length: sectionLines }).map((_, i) => (
              <div key={i} className="border-b border-slate-200"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
