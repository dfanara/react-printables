import type { DocumentMeta, DocumentProps } from "../types/documents.types";
import dedent from "dedent";
import useBaseMargin from "../components/hooks/useBaseMargin";
import Page from "../components/layout/Page";
import Document from "../components/layout/Document";
import TextArea from "../components/TextArea.tsx";
import { twMerge } from "tailwind-merge";

export const EncounterSheetMeta: DocumentMeta = {
  title: "Encounter Sheet",
  description: "A front and back half sheet for tracking a DnD encounter.",
  overview: dedent`
    Just a simple front and back half sheet I use for tracking DnD encounters. Nothing fancy, just the basics.
  `,
  sizes: ["Letter"],
  orientation: "portrait",
  margin: useBaseMargin("0.25in")
}

export const EncounterSheetDocument = ({ meta }: DocumentProps) => (
  <Document meta={meta}>
    <Page>
      <div className="grid grid-rows-2 bg-white h-full gap-8">
        <EncounterFront />
        <EncounterFront />
      </div>
    </Page>
    <Page>
      <div className="grid grid-rows-2 bg-white h-full gap-8">
        <EncounterFront />
        <EncounterFront />
      </div>
    </Page>
  </Document>
)

function EncounterFront() {
  return (
    <div className="h-full w-full grid grid-cols-5 gap-2">
      <div className="col-span-3 flex flex-col gap-2">
        <TextArea label="Encounter" />
        <div className='grid grid-cols-2 grid-rows-2 gap-2 h-full'>
          {Array.from({ length: 4 }).map((_, i) => {
            return (
              <div className='flex flex-col gap-0.5 border border-slate-100' key={i}>
                <div className='grid grid-cols-3 gap-0.5'>
                  <TextArea label='❯' className='col-span-2' />
                  <TextArea label='AC' />
                </div>
                <div className='grid grid-cols-3 gap-0.5'>
                  <TextArea label='STR' />
                  <TextArea label='DEX' />
                  <TextArea label='CON' />
                  <TextArea label='INT' />
                  <TextArea label='WIS' />
                  <TextArea label='CHA' />
                </div>
              </div>
            )
          })}
        </div>
        <div className="border-slate-100 border h-40 w-full">
          <TextArea label="Developments" />
        </div>
      </div>
      <div className='col-span-2 h-full'>
        <div className='border-slate-100 border w-full h-full flex flex-col'>
          <div className='font-mono tracking-wider font-medium text-sm bg-slate-100 py-1 px-2'>Turn Order</div>
          <div className="h-full grid" style={{ gridTemplateRows: `repeat(1fr, 17)` }}>
            {Array.from({ length: 14 }).map((_, i) => (
              <div className={twMerge('h-full border-b-slate-100', i < 13 && "border-b")} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}