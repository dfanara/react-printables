import dedent from "dedent";
import type { DocumentMeta, DocumentProps } from "../types/documents.types";
import Document from "../components/layout/Document";
import Page from "../components/layout/Page";
import useBaseMargin from "../components/hooks/useBaseMargin";

export const DndNpcHalfSheetMeta: DocumentMeta = {
  title: "D&D NPC Half Sheet",
  description: "A printable half-sheet for tracking important D&D NPC details.",
  overview: dedent`
    A compact NPC tracker sized as two half sheets per landscape letter page.

    Use this for recurring names, motivations, relationships, and session notes.
    Print, cut in half, and keep one per notable NPC in a half-sheet binder.
  `,
  sizes: ["Letter"],
  orientation: "landscape",
  margin: useBaseMargin("0.2in")
};

export const DndLocationHalfSheetMeta: DocumentMeta = {
  title: "D&D Location Half Sheet",
  description: "A printable half-sheet for tracking D&D locations and scene hooks.",
  overview: dedent`
    A compact location tracker sized as two half sheets per landscape letter page.

    Capture atmosphere, landmarks, NPC presence, and encounter hooks in one place
    so locations are easier to run at the table. Print, cut in half, and keep in
    a half-sheet binder.
  `,
  sizes: ["Letter"],
  orientation: "landscape",
  margin: useBaseMargin("0.2in")
};

export const HalfSheetGridMeta: DocumentMeta = {
  title: "Half Sheet Grid",
  description: "A simple half-sheet square grid page for maps, diagrams, and notes.",
  overview: dedent`
    Two half-sheet square grids per landscape letter page.

    Useful for quick map sketches, puzzle layouts, marching order ideas,
    dungeon geometry, and encounter planning. Each half includes binder gutter space.
  `,
  sizes: ["Letter"],
  orientation: "landscape",
  margin: useBaseMargin("0.2in")
};

export const HalfSheetLinedNotesMeta: DocumentMeta = {
  title: "Half Sheet Lined Notes",
  description: "A clean lined half-sheet for session notes and worldbuilding ideas.",
  overview: dedent`
    Two lined half sheets per landscape letter page.

    Great for in-session note taking, recaps, prep checklists, and loose campaign
    thoughts that do not fit a strict template. Each half includes binder gutter space.
  `,
  sizes: ["Letter"],
  orientation: "landscape",
  margin: useBaseMargin("0.2in")
};

export const DndDmHalfSheetsMeta: DocumentMeta = {
  title: "D&D DM Half Sheets",
  description: "A combined set of half-sheet templates for D&D NPCs, locations, grids, and notes.",
  overview: dedent`
    A combined half-sheet binder set for Dungeon Masters.

    Includes NPC front/back sheets, location front/back sheets, a grid sheet, and
    a lined notes sheet. Each page prints two landscape half sheets with a binder
    gutter for hole punches after cutting.
  `,
  sizes: ["Letter"],
  orientation: "landscape",
  margin: useBaseMargin("0.2in")
};

export const DndNpcHalfSheetDocument = ({ meta }: DocumentProps) => (
  <Document meta={meta}>
    <Page>
      <HalfSheetPage left={<NpcHalfSheet />} right={<NpcHalfSheet />} />
    </Page>
    <Page>
      <HalfSheetPage left={<NpcBackHalfSheet />} right={<NpcBackHalfSheet />} />
    </Page>
  </Document>
);

export const DndLocationHalfSheetDocument = ({ meta }: DocumentProps) => (
  <Document meta={meta}>
    <Page>
      <HalfSheetPage left={<LocationHalfSheet />} right={<LocationHalfSheet />} />
    </Page>
    <Page>
      <HalfSheetPage left={<LocationBackHalfSheet />} right={<LocationBackHalfSheet />} />
    </Page>
  </Document>
);

export const HalfSheetGridDocument = ({ meta }: DocumentProps) => (
  <Document meta={meta}>
    <Page>
      <HalfSheetPage left={<GridHalfSheet />} right={<GridHalfSheet />} />
    </Page>
  </Document>
);

export const HalfSheetLinedNotesDocument = ({ meta }: DocumentProps) => (
  <Document meta={meta}>
    <Page>
      <HalfSheetPage left={<LinedHalfSheet />} right={<LinedHalfSheet />} />
    </Page>
  </Document>
);

export const DndDmHalfSheetsDocument = ({ meta }: DocumentProps) => (
  <Document meta={meta}>
    <Page>
      <HalfSheetPage left={<NpcHalfSheet />} right={<NpcHalfSheet />} />
    </Page>
    <Page>
      <HalfSheetPage left={<NpcBackHalfSheet />} right={<NpcBackHalfSheet />} />
    </Page>
    <Page>
      <HalfSheetPage left={<LocationHalfSheet />} right={<LocationHalfSheet />} />
    </Page>
    <Page>
      <HalfSheetPage left={<LocationBackHalfSheet />} right={<LocationBackHalfSheet />} />
    </Page>
    <Page>
      <HalfSheetPage left={<GridHalfSheet />} right={<GridHalfSheet />} />
    </Page>
    <Page>
      <HalfSheetPage left={<LinedHalfSheet />} right={<LinedHalfSheet />} />
    </Page>
  </Document>
);

function HalfSheetPage({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 h-full">
      <div style={{ marginLeft: "-0.125in", paddingRight: "0.2in" }}>{left}</div>
      <div>{right}</div>
    </div>
  );
}

function SheetFrame({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full bg-white pl-[0.5in] flex flex-col text-slate-900">
      <div className="flex items-end justify-between border-b border-slate-300 pb-1 mb-2">
        <div className="font-mono text-sm tracking-wider font-semibold">{title}</div>
        <div className="font-mono text-[10px] tracking-wide text-slate-500">{subtitle}</div>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function FieldHeader({ label }: { label: string }) {
  return (
    <div className="bg-slate-100 px-2 py-1 font-mono text-[10px] font-semibold tracking-wider text-slate-700">
      {label}
    </div>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <div className="grid gap-1">
      {items.map((item) => (
        <div key={item} className="flex items-center gap-1.5 font-mono text-[9px] tracking-wide text-slate-600">
          <div className="h-2.5 w-2.5 border border-slate-300" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

function RuledArea({ lines }: { lines: number }) {
  return (
    <div
      className="h-full grid border border-slate-200"
      style={{ gridTemplateRows: `repeat(${lines}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="border-b border-slate-200 last:border-b-0" />
      ))}
    </div>
  );
}

function NpcHalfSheet() {
  return (
    <SheetFrame title="NPC TRACKER" subtitle="HALF SHEET">
      <div className="h-full grid grid-rows-[auto_auto_1fr_auto] gap-2">
        <div className="grid grid-cols-3 gap-2">
          <FieldHeader label="NAME" />
          <FieldHeader label="ROLE / JOB" />
          <FieldHeader label="FACTION / HOME" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="border border-slate-200 flex flex-col">
            <FieldHeader label="GOAL / WANTS" />
            <div className="h-14 p-1">
              <RuledArea lines={3} />
            </div>
          </div>
          <div className="border border-slate-200 flex flex-col">
            <FieldHeader label="FEAR / PRESSURE" />
            <div className="h-14 p-1">
              <RuledArea lines={3} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 h-full">
          <div className="border border-slate-200 flex flex-col h-full">
            <FieldHeader label="TABLE PORTRAYAL" />
            <div className="flex-1 p-1">
              <RuledArea lines={7} />
            </div>
          </div>
          <div className="border border-slate-200 flex flex-col h-full">
            <FieldHeader label="KNOWS / OFFERS / HIDES" />
            <div className="flex-1 p-1">
              <RuledArea lines={7} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="border border-slate-200 p-1">
            <CheckList items={["ALLY", "RIVAL", "PATRON"]} />
          </div>
          <div className="border border-slate-200 p-1">
            <CheckList items={["OWES PARTY", "PARTY OWES", "WATCH"]} />
          </div>
          <FieldHeader label="LAST SEEN" />
        </div>
      </div>
    </SheetFrame>
  );
}

function NpcBackHalfSheet() {
  return (
    <SheetFrame title="NPC NOTES" subtitle="BACK">
      <div className="h-full grid grid-rows-[auto_1fr_auto] gap-2">
        <div className="grid grid-cols-3 gap-2">
          <FieldHeader label="NPC" />
          <FieldHeader label="PLAYER CONNECTIONS" />
          <FieldHeader label="UPDATED" />
        </div>

        <div className="grid grid-cols-2 gap-2 h-full">
          <div className="border border-slate-200 flex flex-col h-full">
            <FieldHeader label="SESSION LOG / WHAT CHANGED" />
            <div className="flex-1 p-1">
              <RuledArea lines={10} />
            </div>
          </div>
          <div className="border border-slate-200 flex flex-col h-full">
            <FieldHeader label="RELATIONSHIPS / THREADS" />
            <div className="flex-1 p-1">
              <RuledArea lines={10} />
            </div>
          </div>
        </div>

        <div className="border border-slate-200 flex flex-col">
          <FieldHeader label="NEXT TIME THEY APPEAR" />
          <div className="h-12 p-1">
            <RuledArea lines={2} />
          </div>
        </div>
      </div>
    </SheetFrame>
  );
}

function LocationHalfSheet() {
  return (
    <SheetFrame title="LOCATION TRACKER" subtitle="HALF SHEET">
      <div className="h-full grid grid-rows-[auto_auto_1fr_auto] gap-2">
        <div className="grid grid-cols-3 gap-2">
          <FieldHeader label="LOCATION" />
          <FieldHeader label="REGION / ROUTE" />
          <FieldHeader label="STATUS QUO" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="border border-slate-200 flex flex-col">
            <FieldHeader label="VIBE / FIRST IMPRESSION" />
            <div className="h-14 p-1">
              <RuledArea lines={3} />
            </div>
          </div>
          <div className="border border-slate-200 flex flex-col">
            <FieldHeader label="TENSION / PROBLEM" />
            <div className="h-14 p-1">
              <RuledArea lines={3} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 h-full">
          <div className="border border-slate-200 flex flex-col h-full">
            <FieldHeader label="POINTS OF INTEREST" />
            <div className="flex-1 p-1">
              <RuledArea lines={7} />
            </div>
          </div>
          <div className="border border-slate-200 flex flex-col h-full">
            <FieldHeader label="NPCS / FACTIONS / THREATS" />
            <div className="flex-1 p-1">
              <RuledArea lines={7} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="border border-slate-200 flex flex-col">
            <FieldHeader label="SECRET / REVEAL" />
            <div className="h-12 p-1">
              <RuledArea lines={2} />
            </div>
          </div>
          <div className="border border-slate-200 p-1">
            <CheckList items={["SAFE", "DANGEROUS", "CHANGING"]} />
          </div>
        </div>
      </div>
    </SheetFrame>
  );
}

function LocationBackHalfSheet() {
  return (
    <SheetFrame title="LOCATION NOTES" subtitle="BACK">
      <div className="h-full grid grid-rows-[auto_1fr_auto] gap-2">
        <div className="grid grid-cols-3 gap-2">
          <FieldHeader label="LOCATION" />
          <FieldHeader label="PARTY IMPACT" />
          <FieldHeader label="UPDATED" />
        </div>

        <div className="grid grid-cols-2 gap-2 h-full">
          <div className="border border-slate-200 flex flex-col h-full">
            <FieldHeader label="SESSION LOG / WHAT HAPPENED HERE" />
            <div className="flex-1 p-1">
              <RuledArea lines={10} />
            </div>
          </div>
          <div className="border border-slate-200 flex flex-col h-full">
            <FieldHeader label="MAP / ROUTES / OPEN THREADS" />
            <div className="flex-1 p-1">
              <RuledArea lines={10} />
            </div>
          </div>
        </div>

        <div className="border border-slate-200 flex flex-col">
          <FieldHeader label="NEXT CHANGE IF THE PARTY IGNORES IT" />
          <div className="h-12 p-1">
            <RuledArea lines={2} />
          </div>
        </div>
      </div>
    </SheetFrame>
  );
}

function GridHalfSheet() {
  return (
    <SheetFrame title="GRID NOTES" subtitle="HALF SHEET">
      <div className="h-full grid grid-rows-[auto_1fr] gap-2">
        <div className="grid grid-cols-3 gap-2">
          <FieldHeader label="PROJECT / SESSION" />
          <FieldHeader label="DATE" />
          <FieldHeader label="SCALE" />
        </div>
        <div className="border border-slate-200 relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgb(226 232 240) 1px, transparent 1px), linear-gradient(to bottom, rgb(226 232 240) 1px, transparent 1px)",
              backgroundSize: "18px 18px"
            }}
          />
        </div>
      </div>
    </SheetFrame>
  );
}

function LinedHalfSheet() {
  return (
    <SheetFrame title="LINED NOTES" subtitle="HALF SHEET">
      <div className="h-full grid grid-rows-[auto_1fr] gap-2">
        <div className="grid grid-cols-3 gap-2">
          <FieldHeader label="TOPIC" />
          <FieldHeader label="SESSION" />
          <FieldHeader label="DATE" />
        </div>
        <div className="border border-slate-200 relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 27px, rgb(226 232 240) 27px, rgb(226 232 240) 28px)"
            }}
          />
          <div className="absolute top-0 bottom-0 left-[0.8in] border-l border-rose-200" />
        </div>
      </div>
    </SheetFrame>
  );
}
