import dedent from 'dedent';
import Document from '../components/layout/Document';
import type { DocumentMeta, DocumentProps } from '../types/documents.types';
import Page from '../components/layout/Page';
import useBaseMargin from '../components/hooks/useBaseMargin';

export const IdeaNotebookMeta: DocumentMeta = {
  title: "Idea Notebook",
  description: "A collection of pages to evaluate a business idea, and document concept sketches.",
  overview: dedent`
    I personally use these pages for new business ideas, and to document concept sketches. 

    The detatched pages help me organize them better, and allow my sketches to be more freeform. I also capture more context to my sketches, which is incredibly helpful.

    I also use the sketch pages to capture the diemensions of an object alongside a rough sketch, so I can better model it in 3D CAD software.

    To use this booklet, I print multiple copies of a specific page type that I want. For instance, I usually print 10 or so of the sketch pages at a time.
  `,
  sizes: ["Letter", "Legal"],
  orientation: "portrait",
  margin: useBaseMargin("0.25in")
}

export const IdeaNotebookDocument = ({ meta }: DocumentProps) => (
  <Document meta={meta}>
    <Page>
      <div className='h-screen w-screen'>
        <div className='relative top-1/2 -translate-y-1/2 text-center'>
          <span className='block font-mono tracking-wider font-medium text-2xl mb-24'>Idea Notebook</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto w-24 h-24 text-slate-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
          </svg>
          <div className='flex text-slate-900 pb-2 content-middle gap-x-4 w-2/3 mx-auto mt-24 flex-wrap gap-y-2'>
            <div className='flex items-center border-slate-400 w-full px-4 bg-slate-100 py-2'>
              <span className='inline-block font-mono tracking-wider font-medium text-lg'>IDEA</span>
              <span className='inline-block font-mono tracking-wider text-slate-400 px-0.5 text-xl'>/</span>
            </div>
            <div className='flex items-center border-slate-400 w-full px-4 bg-slate-100 py-2'>
              <span className='inline-block font-mono tracking-wider font-medium text-lg'>DATE</span>
              <span className='inline-block font-mono tracking-wider text-slate-400 px-0.5 text-xl'>/</span>
            </div>
          </div>
        </div>
      </div>
    </Page>
    <Page>
      <div className='flex text-slate-900 pb-2 content-middle gap-x-4'>
        <div className='flex items-center border-slate-400 w-3/4 px-2 bg-slate-100'>
          <span className='inline-block font-mono tracking-wider font-medium text-xs'>IDEA</span>
          <span className='inline-block font-mono tracking-wider text-slate-400 px-0.5 text-xl'>/</span>
        </div>
        <div className='flex items-center border-slate-400 w-1/4 px-2 bg-slate-100'>
          <span className='inline-block font-mono tracking-wider font-medium text-xs'>DATE</span>
          <span className='inline-block font-mono tracking-wider text-slate-400 px-0.5 text-xl'>/</span>
        </div>
      </div>
      <section className="border-t-2 border-slate-900 text-slate-900 py-2 my-2 h-[1in]">
        <h1 className='uppercase font-mono text-xs font-medium'>Description</h1>
      </section>
      <section className="border-t-2 border-slate-900 text-slate-900 py-2 my-2 h-[2in]">
        <h1 className='uppercase font-mono text-xs font-medium'>Problem & Solution</h1>
      </section>
      <section className="border-t-2 border-slate-900 text-slate-900 py-2 my-2 h-[2in]">
        <h1 className='uppercase font-mono text-xs font-medium'>Market / Audience / Demand</h1>
      </section>
      <section className="flex border-t-2 border-slate-900 text-slate-900 py-2 my-2 gap-x-4 divide-x-2 divide-slate-400 justify-between h-[2.5in]">
        <div className='w-full pr-4'>
          <h1 className='uppercase font-mono text-xs font-medium'>MVP Features</h1>
        </div>
        <div className='w-full pl-4'>
          <h1 className='uppercase font-mono text-xs font-medium'>Possible Features</h1>
        </div>
      </section>
      <section className="border-t-2 border-slate-900 text-slate-900 py-2 my-2 h-[1.5in]">
        <h1 className='uppercase font-mono text-xs font-medium'>Competitors</h1>
      </section>
    </Page>
    <Page>
      <div className='flex text-slate-900 pb-2 content-middle gap-x-4'>
        <div className='flex items-center border-slate-400 w-3/4 px-2 bg-slate-100'>
          <span className='inline-block font-mono tracking-wider font-medium text-xs'>IDEA</span>
          <span className='inline-block font-mono tracking-wider text-slate-400 px-0.5 text-xl'>/</span>
        </div>
        <div className='flex items-center border-slate-400 w-1/4 px-2 bg-slate-100'>
          <span className='inline-block font-mono tracking-wider font-medium text-xs'>DATE</span>
          <span className='inline-block font-mono tracking-wider text-slate-400 px-0.5 text-xl'>/</span>
        </div>
      </div>
      <section className="border-t-2 border-b-2 border-slate-900 text-slate-900 py-2 my-2 h-[1in]">
        <h1 className='uppercase font-mono text-xs font-medium'>Description</h1>
      </section>
      <div className='absolute bottom-0 left-0 right-0'>
        <div className='flex text-slate-900 content-middle gap-x-4'>
          <div className='flex items-center border-slate-400 w-3/4 px-2 bg-slate-100'>
            <span className='inline-block font-mono tracking-wider font-medium text-xs'>SKETCH</span>
            <span className='inline-block font-mono tracking-wider text-slate-400 px-0.5 text-xl'>/</span>
          </div>
          <div className='flex items-center border-slate-400 w-1/4 px-2 bg-slate-100'>
            <span className='inline-block font-mono tracking-wider font-medium text-xs'>No.</span>
            <span className='inline-block font-mono tracking-wider text-slate-400 px-0.5 text-xl'>/</span>
          </div>
        </div>
      </div>
    </Page>
  </Document>
);