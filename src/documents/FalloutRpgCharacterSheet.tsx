import type { DocumentMeta, DocumentProps } from "../types/documents.types";
import dedent from "dedent";
import useBaseMargin from "../components/hooks/useBaseMargin";
import Page from "../components/layout/Page";
import Document from "../components/layout/Document";

export const FalloutRpgCharacterSheetMeta: DocumentMeta = {
  title: "Fallout RPG Character Sheet",
  description: "A multi-page Fallout RPG player character, region, NPC, location, and quest tracker.",
  overview: dedent`
    A clean printable set for Fallout RPG play. It covers the core player character sheet,
    notes, region mapping, location tracking, NPC tracking, and quest tracking without
    preserving decorative book layout elements.
  `,
  sizes: ["Letter"],
  orientation: "landscape",
  margin: useBaseMargin("0.2in")
}

export const FalloutRpgCharacterSheetDocument = ({ meta }: DocumentProps) => (
  <Document meta={meta}>
    <Page>
      <SheetSpread left={<CharacterPage />} right={<NotesPage />} />
    </Page>
    <Page>
      <SheetSpread left={<RegionPage />} right={<LocationsPage start={1} />} />
    </Page>
    <Page>
      <SheetSpread left={<LocationsPage start={11} />} right={<NpcPage />} />
    </Page>
    <Page>
      <SheetSpread left={<QuestPage />} right={<QuestPage />} />
    </Page>
  </Document>
)

const page = "h-full w-full text-slate-950 font-mono flex flex-col gap-2";
const label = "bg-slate-950 text-white uppercase tracking-wider font-semibold text-[10px] px-2 py-1";

function SheetSpread({ left, right }: { left: React.ReactNode, right: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 h-full w-full">
      <HalfSheet className="pr-3" style={{ marginLeft: "-0.125in" }}>{left}</HalfSheet>
      <HalfSheet className="pl-[0.45in]">{right}</HalfSheet>
    </div>
  )
}

function HalfSheet({ children, className = "", style }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) {
  return (
    <div className={`h-full min-w-0 border-l border-dotted border-slate-300 pl-[0.45in] ${className}`} style={style}>
      {children}
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className={label}>{children}</div>
}

function Section({ label, children, className = "" }: { label: string, children?: React.ReactNode, className?: string }) {
  return (
    <div className={`border border-slate-900 flex flex-col overflow-hidden ${className}`}>
      <Label>{label}</Label>
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  )
}

function Field({ label, className = "" }: { label: string, className?: string }) {
  return (
    <div className={`border border-slate-900 flex min-h-[0.34in] ${className}`}>
      <Label>{label}</Label>
      <div className="flex-1" />
    </div>
  )
}

function LinedArea({ rows = 6 }: { rows?: number }) {
  return (
    <div className="h-full grid" style={{ gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className={i < rows - 1 ? "border-b border-dotted border-slate-400" : ""} />
      ))}
    </div>
  )
}

function TableRows({ rows, columns }: { rows: number, columns?: string[] }) {
  return (
    <div className="h-full grid" style={{ gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className={`grid ${i < rows - 1 ? "border-b border-slate-900" : ""}`} style={{ gridTemplateColumns: columns?.join(" ") }}>
          {(columns ?? ["1fr"]).map((_, col) => (
            <div key={col} className={col < (columns?.length ?? 1) - 1 ? "border-r border-slate-900" : ""} />
          ))}
        </div>
      ))}
    </div>
  )
}

function CharacterPage() {
  return (
    <div className={page}>
      <div className="grid grid-cols-8 gap-2">
        <Field label="Name" className="col-span-4" />
        <Field label="Level" />
        <Field label="XP" className="col-span-2" />
        <Field label="AP" />
      </div>

      <div className="grid grid-cols-7 border border-slate-900 h-[0.55in]">
        {"SPECIAL".split("").map((stat, i) => (
          <div key={stat} className={`flex flex-col ${i < 6 ? "border-r border-slate-900" : ""}`}>
            <Label>{stat}</Label>
            <div className="flex-1" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-2 flex-1 min-h-0">
        <Section label="Skills" className="col-span-2 row-span-2">
          <LinedArea rows={16} />
        </Section>
        <div className="col-span-3 flex flex-col gap-2 min-h-0">
          <div className="grid grid-cols-2 gap-2 h-[1.05in]">
            <Section label="HP Max"><LinedArea rows={2} /></Section>
            <Section label="LP Max"><LinedArea rows={2} /></Section>
            <Section label="Supplies"><LinedArea rows={2} /></Section>
            <Section label="Caps"><LinedArea rows={2} /></Section>
          </div>
          <Section label="Perks" className="flex-1">
            <LinedArea rows={8} />
          </Section>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 h-[3.9in]">
        <Section label="Gear" className="col-span-3">
          <div className="h-full flex flex-col">
            <div className="grid grid-cols-3 border-b border-slate-900">
              <div className="col-span-2 px-2 py-1 text-[10px] uppercase font-semibold tracking-wider">Item</div>
              <div className="border-l border-slate-900 px-2 py-1 text-[10px] uppercase font-semibold tracking-wider">Qty / Ammo</div>
            </div>
            <div className="flex-1">
              <TableRows rows={10} columns={["2fr", "1fr"]} />
            </div>
          </div>
        </Section>
        <Section label="Injuries" className="col-span-2">
          <LinedArea rows={12} />
        </Section>
      </div>
    </div>
  )
}

function NotesPage() {
  return (
    <div className={page}>
      <Section label="Notes" className="flex-1">
        <LinedArea rows={32} />
      </Section>
    </div>
  )
}

function RegionPage() {
  return (
    <div className={page}>
      <div className="grid grid-cols-2 gap-2">
        <Field label="Vault Dweller" />
        <Field label="Region" />
      </div>
      <Section label="Region Map" className="flex-1">
        <MapGrid />
      </Section>
      <div className="grid grid-cols-2 gap-2 h-[2.1in]">
        <Section label="Vault"><LinedArea rows={8} /></Section>
        <Section label="NPC"><LinedArea rows={8} /></Section>
      </div>
    </div>
  )
}

function MapGrid() {
  return (
    <div className="h-full grid grid-cols-5 grid-rows-5">
      {Array.from({ length: 25 }).map((_, i) => (
        <div
          key={i}
          className={`${i % 5 < 4 ? "border-r" : ""} ${i < 20 ? "border-b" : ""} border-slate-900`}
        />
      ))}
    </div>
  )
}

function LocationsPage({ start }: { start: number }) {
  return (
    <div className={page}>
      <Label>Locations</Label>
      <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
        {Array.from({ length: 10 }).map((_, i) => (
          <LocationCard key={i} number={start + i} />
        ))}
      </div>
    </div>
  )
}

function LocationCard({ number }: { number: number }) {
  return (
    <div className="border border-slate-900 grid grid-cols-[0.75in_1fr] min-h-0">
      <div className="bg-slate-950 text-white uppercase tracking-wider font-semibold text-[10px] px-2 py-1 flex flex-col justify-between">
        <span>{number}:</span>
        <span>Truth</span>
        <span>Settlement</span>
      </div>
      <LinedArea rows={3} />
    </div>
  )
}

function NpcPage() {
  return (
    <div className={page}>
      <Field label="Vault Dweller" />
      <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
        {Array.from({ length: 14 }).map((_, i) => (
          <NpcCard key={i} />
        ))}
      </div>
    </div>
  )
}

function NpcCard() {
  return (
    <div className="border border-slate-900 grid grid-cols-[0.9in_1fr] min-h-0">
      <div className="bg-slate-950 text-white uppercase tracking-wider font-semibold text-[10px] px-2 py-1 flex flex-col justify-between">
        <span>NPC Name</span>
        <span>Truths</span>
        <span>Location</span>
      </div>
      <LinedArea rows={3} />
    </div>
  )
}

function QuestPage() {
  return (
    <div className={page}>
      <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
        {Array.from({ length: 10 }).map((_, i) => (
          <QuestCard key={i} />
        ))}
      </div>
      <div className="h-[1.35in]">
        <QuestCard main />
      </div>
    </div>
  )
}

function QuestCard({ main = false }: { main?: boolean }) {
  return (
    <div className="border border-slate-900 grid grid-cols-[1.05in_1fr] min-h-0 h-full">
      <div className="bg-slate-950 text-white uppercase tracking-wider font-semibold text-[10px] px-2 py-1 flex flex-col justify-between">
        <span>{main ? "Main Quest" : "Quest Name"}</span>
        <span>Notes</span>
        <span>Location</span>
        <span>{main ? "Blocker Location" : "Reward"}</span>
      </div>
      <LinedArea rows={4} />
    </div>
  )
}
