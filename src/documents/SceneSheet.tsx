import type { DocumentMeta, DocumentProps } from "../types/documents.types";
import dedent from "dedent";
import useBaseMargin from "../components/hooks/useBaseMargin";
import Page from "../components/layout/Page";
import Document from "../components/layout/Document";


export const SceneSheetMeta: DocumentMeta = {
  title: "Scene Sheet",
  description: "A half-letter sheet for preparing and running D&D scenes.",
  overview: dedent`
    A compact scene prep sheet designed for environmental storytelling. Each half-letter
    page covers a single scene with narration space and reactive levers for improvisation.
  `,
  sizes: ["Letter"],
  orientation: "landscape",
  margin: useBaseMargin("0.2in")
}

export const SceneSheetDocument = ({ meta }: DocumentProps) => (
  <Document meta={meta}>
    <Page>
      <CoverSheet />
    </Page>
    <Page>
      <div className="grid grid-cols-2 h-full">
        <div style={{ marginLeft: "-0.125in", paddingRight: "0.2in" }}>
          <SceneHalf />
        </div>
        <SceneHalf />
      </div>
    </Page>
  </Document>
)

function CoverSheet() {
  const sectionTitle = "font-mono tracking-wider font-semibold text-sm bg-slate-100 py-1.5 px-2";
  const fieldLabel = "font-mono text-xs font-semibold text-slate-600 uppercase tracking-wider";
  const body = "text-sm text-slate-700 leading-relaxed";
  const examples = "text-sm text-slate-500 italic";
  const section = "flex flex-col gap-1";

  return (
    <div className="h-full w-full flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4 flex-1">
        <div className="flex flex-col gap-4">
          <div>
            <div className="font-mono tracking-wider font-bold text-lg">Scene Sheet</div>
            <div className="font-mono text-xs text-slate-400 tracking-wider">Reference Guide</div>
          </div>
          <div className="border border-slate-100 flex flex-col">
            <div className={sectionTitle}>Tone</div>
            <div className="p-2 flex flex-col gap-1.5">
              <div className={section}>
                <span className={fieldLabel}>What it is</span>
                <span className={body}>The emotional atmosphere of the scene. Controls how the scene feels to the reader/listener.</span>
              </div>
              <div className={section}>
                <span className={fieldLabel}>Examples</span>
                <span className={examples}>Serene, Oppressive, Melancholic, Vast, Tense, Luminous, Decayed</span>
              </div>
              <div className={section}>
                <span className={fieldLabel}>Instructions</span>
                <ul className={`${body} list-disc list-inside`}>
                  <li>Choose one dominant emotional quality.</li>
                  <li>Ensure the prose reflects it through imagery and pacing.</li>
                  <li>Avoid labeling the tone inside the narration. Show it.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border border-slate-100 flex flex-col">
            <div className={sectionTitle}>Driver</div>
            <div className="p-2 flex flex-col gap-1.5">
              <div className={section}>
                <span className={fieldLabel}>What it is</span>
                <span className={body}>The primary descriptive element carrying the scene. Expands stylistic range and prevents repetitive imagery.</span>
              </div>
              <div className={section}>
                <span className={fieldLabel}>Examples</span>
                <span className={examples}>Weather, Silence, Architecture, Light, Smell, Texture, Movement, Scale</span>
              </div>
              <div className={section}>
                <span className={fieldLabel}>Instructions</span>
                <ul className={`${body} list-disc list-inside`}>
                  <li>Pick one dominant driver.</li>
                  <li>Let it influence multiple details in the scene.</li>
                  <li>Rotate drivers across entries to build versatility.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="border border-slate-100 flex flex-col">
            <div className={sectionTitle}>Scene Narration</div>
            <div className="p-2 flex flex-col gap-1.5">
              <div className={section}>
                <span className={fieldLabel}>What it is</span>
                <span className={body}>The core descriptive passage. Practice concise, table-ready fantasy prose.</span>
              </div>
              <div className={section}>
                <span className={fieldLabel}>Requirements</span>
                <ul className={`${body} list-disc list-inside`}>
                  <li>75–120 words.</li>
                  <li>Include 1 sound, 1 physical sensation, 1 motion.</li>
                  <li>Avoid generic adjectives (dark, ancient, creepy).</li>
                  <li>Prefer specific, concrete imagery.</li>
                  <li>Write so it can be read aloud naturally.</li>
                </ul>
              </div>
              <div className={section}>
                <span className={fieldLabel}>Guidelines</span>
                <ul className={`${body} list-disc list-inside`}>
                  <li>Show implied history through details.</li>
                  <li>Use movement to avoid static description.</li>
                  <li>Stop at 120 words. Do not over-expand.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border border-slate-100 flex flex-col">
            <div className={sectionTitle}>Scene Levers</div>
            <div className="p-2 flex flex-col gap-1.5">
              <div className={section}>
                <span className={fieldLabel}>What it is</span>
                <span className={body}>Dynamic escalation hooks. Ensure the scene can evolve if interacted with.</span>
              </div>
              <div className={section}>
                <span className={fieldLabel}>If they linger...</span>
                <span className={body}>What subtly changes? What builds tension or shifts atmosphere?</span>
              </div>
              <div className={section}>
                <span className={fieldLabel}>If they disturb something...</span>
                <span className={body}>What reacts? What escalates or reveals itself?</span>
              </div>
              <div className="mt-1 px-2 py-1.5 bg-slate-50 rounded">
                <span className="text-xs text-slate-500 font-mono">Keep levers concise. Focus on momentum, not mechanics.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DotGrid() {
  const spacing = 19; // ~5mm
  const cols = 80;
  const rows = 80;
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        className="absolute inset-0 flex items-center justify-center"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, ${spacing}px)`,
            gridTemplateRows: `repeat(${rows}, ${spacing}px)`,
          }}
        >
          {Array.from({ length: cols * rows }).map((_, i) => (
            <div key={i} className="flex items-center justify-center">
              <div className="w-px h-px bg-slate-400 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Label({ children, slash = true }: { children: React.ReactNode, slash?: boolean }) {
  return (
    <div className="flex items-center bg-slate-100 px-2" style={{ minHeight: "1.75rem" }}>
      <span className="inline-block font-mono tracking-wider font-medium text-xs">{children}</span>
      {slash && <span className="inline-block font-mono tracking-wider text-slate-400 px-0.5 text-xl">/</span>}
    </div>
  )
}

function SceneHalf() {
  return (
    <div className="h-full w-full flex flex-col gap-2 pl-[0.5in]">
      <Label>TITLE</Label>
      <div className="grid grid-cols-3 gap-2">
        <Label>DATE</Label>
        <Label>TONE</Label>
        <Label>DRIVER</Label>
      </div>
      <div className="flex-1 border border-slate-100 flex flex-col">
        <Label slash={false}>SCENE NARRATION</Label>
        <div className="flex-1 p-1">
          <DotGrid />
        </div>
      </div>

      <div className="border border-slate-100 flex flex-col h-1/4">
        <Label slash={false}>SCENE LEVERS</Label>
        <div className="flex-1 p-1">
          <DotGrid />
        </div>
      </div>
    </div>
  )
}
