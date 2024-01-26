import dedent from "dedent"
import type { DocumentMeta, DocumentProps } from "../types/documents.types"
import Document from "../components/layout/Document"
import Page from "../components/layout/Page"
import useBaseMargin from "../components/hooks/useBaseMargin"
import TextArea from "../components/TextArea"

export const MealPlanMeta: DocumentMeta = {
  title: "Meal Plan",
  description: "Weekly meal plan and grocery list",
  overview: dedent`
    This is a meal plan sheet we use every week to plan out our meals and put together a grocery list. 

    Planning our meals has really helped us cut back on unnecessary spending at the grocery store. It also makes
    cooking after work alot easier because you already know what you're going to make.
  `,
  sizes: ["Letter"],
  oritentation: "portrait",
  margin: useBaseMargin("0.5in")
}

export const MealPlanDocument = ({ meta }: DocumentProps) => {
  const shoppingListLines = 26;

  return (
    <Document meta={meta}>
      <Page>
        <div className="h-full w-full flex flex-col">
          <div className="flex justify-between items-center prose mb-8">
            <h1 className="font-mono text-2xl font-bold tracking-wider">Meal Plan</h1>
            <TextArea label="Date" style={{ width: "1.75in" }} className="bg-gray-100" />
          </div>

          <div className="h-full grid grid-cols-2 justify-between prose gap-8">
            <div className="flex flex-col">
              <p className="tracking-wide font-bold text-sm">MEALS</p>
              <div className="h-full flex-shrink grid grid-rows-7 border-t border-b border-gray-500 divide-y divide-gray-500">
                {["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"].map((day, i) => {
                  return (
                    <div key={day} className="flex">
                      <div className={`relative border-r border-gray-500 w-10`}>
                        <div className="absolute top-1/2 left-1/2 -rotate-90 -translate-y-1/2 -translate-x-1/2 text-xs font-bold tracking-wider">{day}</div>
                      </div>
                      <div className={`w-full`}></div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="flex flex-col">
              <p className="tracking-wide font-bold text-sm">GROCERIES</p>
              <div className="h-full grid border-t border-b border-gray-500 divide-y divide-gray-500" style={{ gridTemplateRows: `repeat(1fr, ${shoppingListLines})`}}>
                {Array.from({ length: shoppingListLines }).map((_, i) => {
                  return (
                    <div className="py-2" key={i}>
                      <div className="h-4 w-4 rounded-full border border-gray-500"></div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </Page>
    </Document>
  )
}