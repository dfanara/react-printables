import type { DocumentMeta, DocumentProps, CardDefinition } from "../types/documents.types";
import dedent from "dedent";
import useBaseMargin from "../components/hooks/useBaseMargin";
import Page from "../components/layout/Page";
import Document from "../components/layout/Document";

// ── Utility constants & functions ────────────────────────────────────────────

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const MONTH_ABBR = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec",
];

const DAY_HEADERS = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function buildCalendarRows(year: number, month: number): (number | null)[][] {
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInMonth = getDaysInMonth(year, month);
  const rows: (number | null)[][] = [];
  let currentDay = 1;
  let startCol = firstDay;

  while (currentDay <= daysInMonth) {
    const row: (number | null)[] = Array(7).fill(null);
    for (let col = startCol; col < 7 && currentDay <= daysInMonth; col++) {
      row[col] = currentDay++;
    }
    rows.push(row);
    startCol = 0;
  }
  return rows;
}

// ── Shared primitives ─────────────────────────────────────────────────────────

function Card({
  width = 5,
  height = 3,
  children,
}: {
  width?: number;
  height?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white" style={{ width: `${width}in`, height: `${height}in` }}>
      <div className="h-full w-full flex flex-col" style={{ padding: "0.12in" }}>
        {children}
      </div>
    </div>
  );
}

function FieldLabel({ children, slash = true }: { children: React.ReactNode; slash?: boolean }) {
  return (
    <div
      className="flex items-center justify-start bg-slate-100 px-1.5 text-left"
      style={{ minHeight: "0.28in" }}
    >
      <span className="font-mono tracking-wider font-semibold text-[8px]">{children}</span>
      {slash && (
        <span className="font-mono tracking-wider text-slate-400 px-0.5 text-sm">/</span>
      )}
    </div>
  );
}

function SmallFieldLabel({
  children,
  slash = true,
}: {
  children: React.ReactNode;
  slash?: boolean;
}) {
  return (
    <div
      className="flex items-center justify-start bg-slate-100 px-1.5 text-left"
      style={{ minHeight: "0.22in" }}
    >
      <span className="font-mono tracking-wider font-medium text-[7px]">{children}</span>
      {slash && (
        <span className="font-mono tracking-wider text-slate-400 px-0.5 text-[9px]">/</span>
      )}
    </div>
  );
}

// ── Card components ───────────────────────────────────────────────────────────

function MonthlyCalendarFront({ year, month }: { year: number; month: number }) {
  const rows = buildCalendarRows(year, month);

  return (
    <Card width={5} height={3}>
      <FieldLabel slash={false}>
        {MONTH_NAMES[month].toUpperCase()} {year}
      </FieldLabel>

      {/* Day header row */}
      <div className="flex border-b border-slate-200">
        {DAY_HEADERS.map((day) => (
          <div
            key={day}
            className="flex-1 flex items-center justify-center bg-slate-100 border-r border-slate-200 last:border-r-0"
            style={{ height: "0.18in" }}
          >
            <span className="font-mono text-[7px]">{day}</span>
          </div>
        ))}
      </div>

      {/* Calendar grid — rows expand to fill remaining height */}
      <div className="flex-1 flex flex-col min-h-0">
        {rows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className="flex flex-1 min-h-0 border-b border-slate-200 last:border-b-0"
          >
            {row.map((day, colIdx) => (
              <div
                key={colIdx}
                className="flex-1 flex flex-col min-h-0 border-r border-slate-200 last:border-r-0"
              >
                {day !== null && (
                  <span className="font-mono text-[8px] text-slate-500 p-0.5 leading-none">
                    {day}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
}

function MiniMonth({ year, month }: { year: number; month: number }) {
  const rows = buildCalendarRows(year, month);

  return (
    <div className="flex flex-col">
      <div className="font-mono text-[6px] font-semibold mb-px">
        {MONTH_NAMES[month].toUpperCase()}
      </div>
      {/* Single-letter day headers */}
      <div className="flex">
        {DAY_HEADERS.map((d) => (
          <div key={d} className="flex-1 text-center font-mono text-[5px]">
            {d[0]}
          </div>
        ))}
      </div>
      {/* Date rows */}
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} className="flex">
          {row.map((day, colIdx) => (
            <div
              key={colIdx}
              className="flex-1 text-center font-mono text-[6px]"
              style={{ lineHeight: "1.3" }}
            >
              {day !== null ? day : ""}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function YearlyCalendarFront({ year }: { year: number }) {
  return (
    <Card width={5} height={3}>
      <SmallFieldLabel slash={false}>YEAR / {year}</SmallFieldLabel>
      <div className="flex-1 grid grid-cols-4 gap-x-2 gap-y-1 mt-1 min-h-0">
        {Array.from({ length: 12 }, (_, i) => (
          <MiniMonth key={i} year={year} month={i} />
        ))}
      </div>
    </Card>
  );
}

function ImportantDatesBack() {
  return (
    <Card width={5} height={3}>
      <FieldLabel slash={false}>IMPORTANT DATES</FieldLabel>

      {/* Column header row */}
      <div className="flex bg-slate-100 border-b border-slate-200">
        <div
          className="font-mono text-[7px] flex items-center px-1 border-r border-slate-200 flex-shrink-0"
          style={{ width: "0.5in", minHeight: "0.2in" }}
        >
          DATE
        </div>
        <div
          className="font-mono text-[7px] flex items-center px-1 flex-1"
          style={{ minHeight: "0.2in" }}
        >
          EVENT / REMINDER
        </div>
      </div>

      {/* Data rows */}
      <div className="flex-1 flex flex-col min-h-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-1 min-h-0 border-b border-slate-200 last:border-b-0"
          >
            <div
              className="border-r border-slate-200 flex-shrink-0"
              style={{ width: "0.5in" }}
            />
            <div className="flex-1" />
          </div>
        ))}
      </div>
    </Card>
  );
}

// ── Document preview layout ───────────────────────────────────────────────────

function CalendarCardPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {children}
      </div>
    </div>
  );
}

// ── Exports ───────────────────────────────────────────────────────────────────

export const CalendarCardsMeta: DocumentMeta = {
  title: "Calendar Pack 2026",
  description: "5×3 landscape index card templates for 2026/2027 planning.",
  overview: dedent`
    Print-and-cut 5×3 landscape index cards for 2026/2027 planning. Two yearly overview
    cards showing all 12 months in a mini-grid, plus 12 individual monthly cards with
    writable day cells. All cards share an Important Dates back with DATE | EVENT/REMINDER rows.
  `,
  sizes: ["Letter"],
  orientation: "landscape",
  margin: useBaseMargin("0in"),
};

export const CalendarCardsDocument = ({ meta }: DocumentProps) => (
  <Document meta={meta}>
    <Page>
      <CalendarCardPage>
        <div className="flex gap-4">
          <YearlyCalendarFront year={2026} />
          <YearlyCalendarFront year={2027} />
        </div>
        <div className="flex gap-4">
          <MonthlyCalendarFront year={2026} month={0} />
          <MonthlyCalendarFront year={2026} month={1} />
        </div>
      </CalendarCardPage>
    </Page>
    <Page>
      <CalendarCardPage>
        <div className="flex gap-4">
          <ImportantDatesBack />
          <ImportantDatesBack />
        </div>
        <div className="flex gap-4">
          <MonthlyCalendarFront year={2026} month={2} />
          <MonthlyCalendarFront year={2026} month={3} />
        </div>
      </CalendarCardPage>
    </Page>
  </Document>
);

export const CalendarCardDefinitions: CardDefinition[] = [
  {
    name: "yearly-2026",
    front: () => <YearlyCalendarFront year={2026} />,
    back: ImportantDatesBack,
    width: 5,
    height: 3,
  },
  {
    name: "yearly-2027",
    front: () => <YearlyCalendarFront year={2027} />,
    back: ImportantDatesBack,
    width: 5,
    height: 3,
  },
  ...Array.from({ length: 12 }, (_, i) => ({
    name: `${MONTH_ABBR[i]}-2026`,
    front: () => <MonthlyCalendarFront year={2026} month={i} />,
    back: ImportantDatesBack,
    width: 5,
    height: 3,
  })),
];
