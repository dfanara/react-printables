import type { DocumentMeta, DocumentProps, CardDefinition } from "../types/documents.types";
import dedent from "dedent";
import useBaseMargin from "../components/hooks/useBaseMargin";
import Page from "../components/layout/Page";
import Document from "../components/layout/Document";

export const DndCardsMeta: DocumentMeta = {
  title: "DnD Index Cards",
  description: "3×5 index card templates for D&D roll tables on letter cardstock.",
  overview: dedent`
    Print-and-cut 3×5 index card templates for D&D prep. Four cards per side on letter
    cardstock with roll table templates on the front and notes on the back. Print
    double-sided and cut along the edges.
  `,
  sizes: ["Letter"],
  orientation: "portrait",
  margin: useBaseMargin("0in"),
};

export const DndCardsDocument = ({ meta }: DocumentProps) => (
  <Document meta={meta}>
    <Page>
      <CardPage>
        <RollTableFront />
        <RollTableFront />
        <RollTableFront />
        <RollTableFront />
      </CardPage>
    </Page>
    <Page>
      <CardPage>
        <RollTableBack />
        <RollTableBack />
        <RollTableBack />
        <RollTableBack />
      </CardPage>
    </Page>
  </Document>
);

export const DndCardDefinitions: CardDefinition[] = [
  {
    name: "roll-table",
    front: RollTableFront,
    back: RollTableBack,
    width: 3,
    height: 5,
  },
  {
    name: "reference-table",
    front: ReferenceTableFront,
    back: ReferenceTableBack,
    width: 5,
    height: 3,
  },
  {
    name: "combat-stat",
    front: CombatStatFront,
    back: CombatStatBack,
    width: 5,
    height: 3,
  },
  {
    name: "npc",
    front: NpcCardFront,
    back: NpcCardBack,
    width: 3,
    height: 5,
  },
  {
    name: "location",
    front: LocationCardFront,
    back: LocationCardBack,
    width: 5,
    height: 3,
  },
  {
    name: "session-tracker",
    front: SessionTrackerFront,
    back: SessionTrackerBack,
    width: 3,
    height: 5,
  },
  {
    name: "faction",
    front: FactionCardFront,
    back: FactionCardBack,
    width: 3,
    height: 5,
  },
  {
    name: "town",
    front: TownCardFront,
    back: TownCardBack,
    width: 3,
    height: 5,
  },
  {
    name: "quest",
    front: QuestCardFront,
    back: QuestCardBack,
    width: 3,
    height: 5,
  },
  {
    name: "shop",
    front: ShopCardFront,
    back: ShopCardBack,
    width: 3,
    height: 5,
  },
  {
    name: "dungeon-room",
    front: DungeonRoomCardFront,
    back: DungeonRoomCardBack,
    width: 3,
    height: 5,
  },
  {
    name: "encounter",
    front: EncounterCardFront,
    back: EncounterCardBack,
    width: 3,
    height: 5,
  },
  {
    name: "travel",
    front: TravelCardFront,
    back: TravelCardBack,
    width: 3,
    height: 5,
  },
  {
    name: "condition",
    front: ConditionCardFront,
    back: ConditionCardBack,
    width: 5,
    height: 3,
  },
  {
    name: "action-economy",
    front: ActionEconomyCardFront,
    back: ActionEconomyCardBack,
    width: 5,
    height: 3,
  },
  {
    name: "skill-dc",
    front: SkillDCCardFront,
    back: SkillDCCardBack,
    width: 5,
    height: 3,
  },
  {
    name: "spell-slots",
    front: SpellSlotsCardFront,
    back: SpellSlotsCardBack,
    width: 5,
    height: 3,
  },
  {
    name: "initiative",
    front: InitiativeCardFront,
    back: InitiativeCardBack,
    width: 3,
    height: 5,
  },
  {
    name: "loot",
    front: LootCardFront,
    back: LootCardBack,
    width: 3,
    height: 5,
  },
  {
    name: "rumor",
    front: RumorCardFront,
    back: RumorCardBack,
    width: 3,
    height: 5,
  },
];

function FactionCardFront() {
  return (
    <SidebarCard label="FACTION">
      <div className="grid grid-cols-2 gap-1 mb-1">
        <SmallFieldLabel>NAME</SmallFieldLabel>
        <SmallFieldLabel>TYPE</SmallFieldLabel>
      </div>
      <SmallFieldLabel>LEADER</SmallFieldLabel>
      <div className="border-b border-slate-200 mb-1" style={{ minHeight: "0.28in" }} />
      <SmallFieldLabel slash={false}>GOAL / AGENDA</SmallFieldLabel>
      <DotGrid />
      <div className="mt-1">
        <SmallFieldLabel>ALIGNMENT</SmallFieldLabel>
      </div>
    </SidebarCard>
  );
}

function FactionCardBack() {
  return (
    <Card>
      <SmallFieldLabel slash={false}>ALLIES</SmallFieldLabel>
      <DotGrid />
      <SmallFieldLabel slash={false}>RIVALS / ENEMIES</SmallFieldLabel>
      <DotGrid />
      <SmallFieldLabel slash={false}>RESOURCES</SmallFieldLabel>
      <DotGrid />
      <SmallFieldLabel slash={false}>HOOKS / SECRETS</SmallFieldLabel>
      <DotGrid />
    </Card>
  );
}

function TownCardFront() {
  return (
    <SidebarCard label="TOWN">
      <div className="grid grid-cols-2 gap-1 mb-1">
        <SmallFieldLabel>NAME</SmallFieldLabel>
        <SmallFieldLabel>SIZE</SmallFieldLabel>
      </div>
      <SmallFieldLabel>RULER / GOVERNMENT</SmallFieldLabel>
      <div className="border-b border-slate-200 mb-1" style={{ minHeight: "0.28in" }} />
      <SmallFieldLabel slash={false}>ATMOSPHERE / VIBE</SmallFieldLabel>
      <DotGrid />
      <SmallFieldLabel slash={false}>NOTABLE FEATURES</SmallFieldLabel>
      <DotGrid />
    </SidebarCard>
  );
}

function TownCardBack() {
  return (
    <Card>
      <SmallFieldLabel slash={false}>FACTIONS PRESENT</SmallFieldLabel>
      <DotGrid />
      <SmallFieldLabel slash={false}>KEY NPCS</SmallFieldLabel>
      <DotGrid />
      <SmallFieldLabel slash={false}>RUMORS / CURRENT EVENTS</SmallFieldLabel>
      <DotGrid />
    </Card>
  );
}

function QuestCardFront() {
  return (
    <SidebarCard label="QUEST">
      <div className="grid grid-cols-2 gap-1 mb-1">
        <SmallFieldLabel>NAME</SmallFieldLabel>
        <SmallFieldLabel>STATUS</SmallFieldLabel>
      </div>
      <SmallFieldLabel>QUEST GIVER</SmallFieldLabel>
      <div className="border-b border-slate-200 mb-1" style={{ minHeight: "0.28in" }} />
      <SmallFieldLabel slash={false}>GOAL</SmallFieldLabel>
      <DotGrid />
      <SmallFieldLabel slash={false}>STAKES / DEADLINE</SmallFieldLabel>
      <DotGrid />
    </SidebarCard>
  );
}

function QuestCardBack() {
  return (
    <Card>
      <SmallFieldLabel slash={false}>COMPLICATIONS</SmallFieldLabel>
      <DotGrid />
      <SmallFieldLabel slash={false}>REWARD</SmallFieldLabel>
      <DotGrid />
      <SmallFieldLabel slash={false}>CONNECTED TO</SmallFieldLabel>
      <DotGrid />
    </Card>
  );
}

function ShopCardFront() {
  return (
    <SidebarCard label="SHOP">
      <div className="grid grid-cols-2 gap-1 mb-1">
        <SmallFieldLabel>NAME</SmallFieldLabel>
        <SmallFieldLabel>TYPE</SmallFieldLabel>
      </div>
      <SmallFieldLabel>OWNER</SmallFieldLabel>
      <div className="border-b border-slate-200 mb-1" style={{ minHeight: "0.28in" }} />
      <SmallFieldLabel slash={false}>SPECIALTY / REPUTATION</SmallFieldLabel>
      <DotGrid />
      <SmallFieldLabel slash={false}>CURRENT STOCK FOCUS</SmallFieldLabel>
      <DotGrid />
    </SidebarCard>
  );
}

function ShopCardBack() {
  return (
    <Card>
      <SmallFieldLabel slash={false}>INVENTORY</SmallFieldLabel>
      <div className="flex-1 flex flex-col mt-0.5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center border-b border-slate-200 flex-1 min-h-0">
            <span className="font-mono text-[7px] text-slate-400 flex-shrink-0 w-[0.22in] text-right pr-1.5">{i + 1}</span>
            <div className="h-full border-l border-slate-200 flex-1 pl-1 min-w-0" />
          </div>
        ))}
      </div>
      <SmallFieldLabel slash={false}>PRICES / NOTES</SmallFieldLabel>
      <DotGrid />
    </Card>
  );
}

function DungeonRoomCardFront() {
  return (
    <SidebarCard label="ROOM">
      <div className="grid grid-cols-2 gap-1 mb-1">
        <SmallFieldLabel>NAME</SmallFieldLabel>
        <SmallFieldLabel>SIZE</SmallFieldLabel>
      </div>
      <SmallFieldLabel>EXITS</SmallFieldLabel>
      <div className="border-b border-slate-200 mb-1" style={{ minHeight: "0.28in" }} />
      <SmallFieldLabel slash={false}>FEATURES / CONTENTS</SmallFieldLabel>
      <DotGrid />
      <div className="grid grid-cols-2 gap-1 mt-1">
        <SmallFieldLabel>LIGHT</SmallFieldLabel>
        <SmallFieldLabel>SMELL</SmallFieldLabel>
      </div>
    </SidebarCard>
  );
}

function DungeonRoomCardBack() {
  return (
    <Card>
      <SmallFieldLabel slash={false}>TRAP / ENCOUNTER</SmallFieldLabel>
      <DotGrid />
      <SmallFieldLabel slash={false}>TREASURE</SmallFieldLabel>
      <DotGrid />
      <SmallFieldLabel slash={false}>SECRET / NOTES</SmallFieldLabel>
      <DotGrid />
    </Card>
  );
}

function EncounterCardFront() {
  return (
    <SidebarCard label="ENCOUNTER">
      <div className="grid grid-cols-2 gap-1 mb-1">
        <SmallFieldLabel>NAME</SmallFieldLabel>
        <SmallFieldLabel>DIFFICULTY</SmallFieldLabel>
      </div>
      <SmallFieldLabel>TERRAIN / SETTING</SmallFieldLabel>
      <div className="border-b border-slate-200 mb-1" style={{ minHeight: "0.28in" }} />
      <SmallFieldLabel slash={false}>OBJECTIVE</SmallFieldLabel>
      <DotGrid />
      <SmallFieldLabel slash={false}>ENEMIES</SmallFieldLabel>
      <DotGrid />
    </SidebarCard>
  );
}

function EncounterCardBack() {
  return (
    <Card>
      <SmallFieldLabel slash={false}>TACTICS</SmallFieldLabel>
      <DotGrid />
      <SmallFieldLabel slash={false}>REWARDS / LOOT</SmallFieldLabel>
      <DotGrid />
      <SmallFieldLabel slash={false}>NOTES</SmallFieldLabel>
      <DotGrid />
    </Card>
  );
}

function TravelCardFront() {
  return (
    <SidebarCard label="TRAVEL">
      <div className="grid grid-cols-2 gap-1 mb-1">
        <SmallFieldLabel>REGION</SmallFieldLabel>
        <SmallFieldLabel>SEASON</SmallFieldLabel>
      </div>
      <SmallFieldLabel slash={false}>WEATHER ROLL TABLE</SmallFieldLabel>
      <div className="flex-1 flex flex-col mt-0.5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center border-b border-slate-200 flex-1 min-h-0">
            <span className="font-mono text-[7px] text-slate-400 flex-shrink-0 w-[0.22in] text-right pr-1.5">{i + 1}</span>
            <div className="h-full border-l border-slate-200 flex-1 pl-1 min-w-0" />
          </div>
        ))}
      </div>
      <SmallFieldLabel>TERRAIN TYPE</SmallFieldLabel>
    </SidebarCard>
  );
}

function TravelCardBack() {
  return (
    <Card>
      <SmallFieldLabel slash={false}>RANDOM EVENTS</SmallFieldLabel>
      <DotGrid />
      <SmallFieldLabel slash={false}>HAZARDS</SmallFieldLabel>
      <DotGrid />
      <div className="grid grid-cols-2 gap-1 mt-1">
        <SmallFieldLabel>DAYS</SmallFieldLabel>
        <SmallFieldLabel>DISTANCE</SmallFieldLabel>
      </div>
    </Card>
  );
}

function ConditionCardFront() {
  return (
    <Card width={5} height={3}>
      <div className="flex-1 grid grid-cols-2 gap-2">
        <div className="flex flex-col min-h-0">
          <SmallFieldLabel slash={false}>CONDITIONS</SmallFieldLabel>
          <div className="flex-1 flex flex-col mt-0.5 min-h-0">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex items-center border-b border-slate-200 flex-1 min-h-0">
                <div className="h-full w-[0.6in] border-r border-slate-200 flex-shrink-0" />
                <div className="flex-1 h-full" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col min-h-0">
          <SmallFieldLabel slash={false}>CONDITIONS</SmallFieldLabel>
          <div className="flex-1 flex flex-col mt-0.5 min-h-0">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex items-center border-b border-slate-200 flex-1 min-h-0">
                <div className="h-full w-[0.6in] border-r border-slate-200 flex-shrink-0" />
                <div className="flex-1 h-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function ConditionCardBack() {
  return (
    <Card width={5} height={3}>
      <FieldLabel slash={false}>NOTES</FieldLabel>
      <DotGrid className="flex-1 mt-1" />
    </Card>
  );
}

function ActionEconomyCardFront() {
  return (
    <Card width={5} height={3}>
      <div className="flex-1 grid grid-cols-3 gap-2">
        <div className="flex flex-col min-h-0">
          <SmallFieldLabel slash={false}>ACTIONS</SmallFieldLabel>
          <DotGrid className="flex-1 mt-0.5 min-h-0" />
        </div>
        <div className="flex flex-col min-h-0">
          <SmallFieldLabel slash={false}>BONUS ACTIONS</SmallFieldLabel>
          <DotGrid className="flex-1 mt-0.5 min-h-0" />
        </div>
        <div className="flex flex-col min-h-0">
          <SmallFieldLabel slash={false}>REACTIONS</SmallFieldLabel>
          <DotGrid className="flex-1 mt-0.5 min-h-0" />
        </div>
      </div>
    </Card>
  );
}

function ActionEconomyCardBack() {
  return (
    <Card width={5} height={3}>
      <div className="flex-1 grid grid-cols-2 gap-2">
        <div className="flex flex-col min-h-0">
          <SmallFieldLabel slash={false}>FREE ACTIONS</SmallFieldLabel>
          <DotGrid className="flex-1 mt-0.5 min-h-0" />
        </div>
        <div className="flex flex-col min-h-0">
          <SmallFieldLabel slash={false}>MOVEMENT RULES</SmallFieldLabel>
          <DotGrid className="flex-1 mt-0.5 min-h-0" />
        </div>
      </div>
    </Card>
  );
}

function SkillDCCardFront() {
  return (
    <Card width={5} height={3}>
      <div className="flex-1 grid grid-cols-2 gap-2">
        <div className="flex flex-col min-h-0">
          <SmallFieldLabel slash={false}>DC REFERENCE</SmallFieldLabel>
          <div className="flex-1 flex flex-col mt-0.5 min-h-0">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center border-b border-slate-200 flex-1 min-h-0">
                <div className="h-full w-[0.3in] border-r border-slate-200 flex-shrink-0" />
                <div className="flex-1 h-full" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col min-h-0">
          <SmallFieldLabel slash={false}>COMMON SKILL USES</SmallFieldLabel>
          <div className="flex-1 flex flex-col mt-0.5 min-h-0">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center border-b border-slate-200 flex-1 min-h-0">
                <div className="h-full w-[0.5in] border-r border-slate-200 flex-shrink-0" />
                <div className="flex-1 h-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function SkillDCCardBack() {
  return (
    <Card width={5} height={3}>
      <SmallFieldLabel slash={false}>PASSIVE CHECKS / NOTES</SmallFieldLabel>
      <DotGrid />
    </Card>
  );
}

function SpellSlotsCardFront() {
  return (
    <Card width={5} height={3}>
      <div className="flex-1 grid grid-cols-2 gap-2">
        <div className="flex flex-col min-h-0">
          <SmallFieldLabel slash={false}>SPELL SLOTS BY LEVEL</SmallFieldLabel>
          <div className="flex-1 flex flex-col mt-0.5 min-h-0">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="flex items-center border-b border-slate-200 flex-1 min-h-0">
                <span className="font-mono text-[7px] text-slate-400 flex-shrink-0 w-[0.22in] text-right pr-1.5">{i + 1}</span>
                <div className="h-full border-l border-slate-200 flex-1 pl-1 min-w-0" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col min-h-0">
          <SmallFieldLabel slash={false}>CLASS / LEVEL NOTES</SmallFieldLabel>
          <DotGrid className="flex-1 mt-0.5 min-h-0" />
        </div>
      </div>
    </Card>
  );
}

function SpellSlotsCardBack() {
  return (
    <Card width={5} height={3}>
      <SmallFieldLabel slash={false}>MULTICLASS NOTES</SmallFieldLabel>
      <DotGrid />
    </Card>
  );
}

function InitiativeCardFront() {
  return (
    <SidebarCard label="INITIATIVE">
      <div className="grid grid-cols-3 gap-1 mb-1">
        <SmallFieldLabel>NAME</SmallFieldLabel>
        <SmallFieldLabel>HP</SmallFieldLabel>
        <SmallFieldLabel>AC</SmallFieldLabel>
      </div>
      <div className="flex-1 flex flex-col">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex items-center border-b border-slate-200 flex-1 min-h-0">
            <span className="font-mono text-[7px] text-slate-400 flex-shrink-0 w-[0.22in] text-right pr-1.5">{i + 1}</span>
            <div className="h-full border-l border-slate-200 flex-1 min-w-0 grid grid-cols-3">
              <div className="border-r border-slate-200" />
              <div className="border-r border-slate-200" />
              <div />
            </div>
          </div>
        ))}
      </div>
    </SidebarCard>
  );
}

function InitiativeCardBack() {
  return (
    <Card>
      <SmallFieldLabel slash={false}>CONDITIONS / STATUS</SmallFieldLabel>
      <DotGrid />
      <SmallFieldLabel slash={false}>NOTES</SmallFieldLabel>
      <DotGrid />
    </Card>
  );
}

function LootCardFront() {
  return (
    <SidebarCard label="LOOT">
      <div className="grid grid-cols-3 gap-1 mb-1">
        <SmallFieldLabel>ITEM</SmallFieldLabel>
        <SmallFieldLabel>VALUE</SmallFieldLabel>
        <SmallFieldLabel>WHO</SmallFieldLabel>
      </div>
      <div className="flex-1 flex flex-col">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex border-b border-slate-200 flex-1 min-h-0">
            <div className="flex-[2] border-r border-slate-200" />
            <div className="flex-1 border-r border-slate-200" />
            <div className="flex-1" />
          </div>
        ))}
      </div>
    </SidebarCard>
  );
}

function LootCardBack() {
  return (
    <Card>
      <SmallFieldLabel slash={false}>MAGIC ITEMS</SmallFieldLabel>
      <DotGrid />
      <SmallFieldLabel slash={false}>NOTES</SmallFieldLabel>
      <DotGrid />
    </Card>
  );
}

function RumorCardFront() {
  return (
    <SidebarCard label="RUMOR">
      <SmallFieldLabel slash={false}>THE RUMOR</SmallFieldLabel>
      <DotGrid />
      <SmallFieldLabel>SOURCE</SmallFieldLabel>
      <div className="border-b border-slate-200 mb-1" style={{ minHeight: "0.28in" }} />
      <SmallFieldLabel>RELIABILITY</SmallFieldLabel>
      <div className="border-b border-slate-200" style={{ minHeight: "0.28in" }} />
    </SidebarCard>
  );
}

function RumorCardBack() {
  return (
    <Card>
      <SmallFieldLabel slash={false}>WHAT IT POINTS TO</SmallFieldLabel>
      <DotGrid />
      <SmallFieldLabel slash={false}>CONFIRMED?</SmallFieldLabel>
      <div className="border-b border-slate-200 mb-1" style={{ minHeight: "0.28in" }} />
      <SmallFieldLabel slash={false}>CONNECTED TO</SmallFieldLabel>
      <DotGrid />
    </Card>
  );
}

function SidebarCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Card>
      <div className="flex flex-1 min-h-0">
        <div className="relative flex-shrink-0 bg-slate-100" style={{ width: "0.22in" }}>
          <span
            className="absolute font-mono tracking-wider font-semibold text-[8px] text-slate-800"
            style={{
              right: "15%",
              bottom: "2%",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              whiteSpace: "nowrap",
            }}
          >
            <span>{label}</span>
            <span className="text-slate-400 text-[10px]"> /</span>
          </span>
        </div>
        <div className="flex-1 flex flex-col min-w-0 pl-2">
          {children}
        </div>
      </div>
    </Card>
  );
}

function CardPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div
        className="grid grid-cols-2 grid-rows-2"
        style={{ columnGap: "0.4in", rowGap: "0.25in" }}
      >
        {children}
      </div>
    </div>
  );
}

function Card({
  children,
  width = 3,
  height = 5,
}: {
  children: React.ReactNode;
  width?: number;
  height?: number;
}) {
  return (
    <div
      className="bg-white"
      style={{ width: `${width}in`, height: `${height}in` }}
    >
      <div className="h-full w-full flex flex-col" style={{ padding: "0.12in" }}>
        {children}
      </div>
    </div>
  );
}

function FieldLabel({ children, slash = true }: { children: React.ReactNode; slash?: boolean }) {
  return (
    <div className="flex items-center justify-start bg-slate-100 px-1.5 text-left" style={{ minHeight: "0.28in" }}>
      <span className="font-mono tracking-wider font-semibold text-[8px]">{children}</span>
      {slash && <span className="font-mono tracking-wider text-slate-400 px-0.5 text-sm">/</span>}
    </div>
  );
}

function DotGrid({ className = "flex-1 mt-0.5" }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        backgroundImage: "radial-gradient(circle, #cbd5e1 0.5px, transparent 0.5px)",
        backgroundSize: "0.15in 0.15in",
      }}
    />
  );
}

function SmallFieldLabel({ children, slash = true }: { children: React.ReactNode; slash?: boolean }) {
  return (
    <div className="flex items-center justify-start bg-slate-100 px-1.5 text-left" style={{ minHeight: "0.22in" }}>
      <span className="font-mono tracking-wider font-medium text-[7px]">{children}</span>
      {slash && <span className="font-mono tracking-wider text-slate-400 px-0.5 text-[9px]">/</span>}
    </div>
  );
}

function RollTableFront() {
  return (
    <Card>
      <div className="flex flex-1 min-h-0">
        <div
          className="relative flex-shrink-0 bg-slate-100"
          style={{ width: "0.22in" }}
        >
          <span
            className="absolute font-mono tracking-wider font-semibold text-[8px] text-slate-800"
            style={{
              right: "15%",
              bottom: "2%",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              whiteSpace: "nowrap",
            }}
          >
            <span>ROLL TABLE</span>
            <span className="text-slate-400 text-[10px]"> /</span>
          </span>
        </div>
        <div className="flex-1 flex flex-col min-w-0 pl-2">
          <div className="grid grid-cols-2 gap-1 mb-1.5">
            <SmallFieldLabel>DIE</SmallFieldLabel>
            <SmallFieldLabel>CATEGORY</SmallFieldLabel>
          </div>
          <div className="flex-1 flex flex-col min-h-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="flex items-center border-b border-slate-200 flex-1 min-h-0">
                <span
                  className="font-mono text-[7px] text-slate-400 flex-shrink-0 w-[0.28in] text-right pr-1.5"
                >
                  {i + 1}
                </span>
                <div className="h-full border-l border-slate-200 flex-1 pl-1 min-w-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function RollTableBack() {
  return (
    <Card>
      <FieldLabel slash={false}>NOTES</FieldLabel>
      <DotGrid className="flex-1 mt-1.5" />
      <div className="grid grid-cols-2 gap-1 mt-1.5">
        <SmallFieldLabel>SOURCE</SmallFieldLabel>
        <SmallFieldLabel>PAGE</SmallFieldLabel>
      </div>
    </Card>
  );
}

function ReferenceTableFront() {
  return (
    <Card width={5} height={3}>
      <div className="flex-1 grid grid-cols-2 gap-2">
        <ReferenceTableSection label="TABLE" />
        <ReferenceTableSection label="TABLE" />
      </div>
    </Card>
  );
}

function ReferenceTableSection({ label }: { label: string }) {
  return (
    <div className="flex flex-col min-h-0">
      <SmallFieldLabel>{label}</SmallFieldLabel>
      <div className="flex-1 flex flex-col mt-0.5 min-h-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex items-center border-b border-slate-200 flex-1 min-h-0">
            <div className="h-full w-[0.28in] border-r border-slate-200 flex-shrink-0" />
            <div className="flex-1 h-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ReferenceTableBack() {
  return (
    <Card width={5} height={3}>
      <FieldLabel slash={false}>NOTES</FieldLabel>
      <DotGrid className="flex-1 mt-1" />
    </Card>
  );
}

function CombatStatFront() {
  return (
    <Card width={5} height={3}>
      <div className="grid grid-cols-4 gap-1 mb-1">
        <SmallFieldLabel>NAME</SmallFieldLabel>
        <SmallFieldLabel>AC</SmallFieldLabel>
        <SmallFieldLabel>HP</SmallFieldLabel>
        <SmallFieldLabel>SPEED</SmallFieldLabel>
      </div>
      <FieldLabel slash={false}>ABILITIES / ATTACKS</FieldLabel>
      <DotGrid />
    </Card>
  );
}

function CombatStatBack() {
  return (
    <Card width={5} height={3}>
      <SmallFieldLabel>CONDITIONS / NOTES</SmallFieldLabel>
      <DotGrid />
    </Card>
  );
}

function NpcCardFront() {
  return (
    <Card>
      <FieldLabel>NPC</FieldLabel>
      <div className="grid grid-cols-2 gap-1 mt-1">
        <SmallFieldLabel>NAME</SmallFieldLabel>
        <SmallFieldLabel>RACE / CLASS</SmallFieldLabel>
      </div>
      <SmallFieldLabel slash={false}>APPEARANCE</SmallFieldLabel>
      <DotGrid />
      <SmallFieldLabel slash={false}>PERSONALITY</SmallFieldLabel>
      <DotGrid className="flex-1 min-h-[0.4in] mt-0.5" />
    </Card>
  );
}

function NpcCardBack() {
  return (
    <Card>
      <SmallFieldLabel>IDEAL / BOND / FLAW</SmallFieldLabel>
      <DotGrid />
      <FieldLabel slash={false}>VOICE</FieldLabel>
      <DotGrid className="flex-1 min-h-[0.35in] mt-0.5" />
      <SmallFieldLabel slash={false}>NOTES</SmallFieldLabel>
      <DotGrid className="flex-1 min-h-[0.3in] mt-0.5" />
    </Card>
  );
}

function LocationCardFront() {
  return (
    <Card width={5} height={3}>
      <FieldLabel>LOCATION</FieldLabel>
      <div className="grid grid-cols-3 gap-1 mt-1">
        <SmallFieldLabel>NAME</SmallFieldLabel>
        <SmallFieldLabel>TYPE</SmallFieldLabel>
        <SmallFieldLabel>REGION / BIOME</SmallFieldLabel>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-2 mt-1">
        <div className="flex flex-col min-h-0">
          <SmallFieldLabel slash={false}>SEE / HEAR / SMELL</SmallFieldLabel>
          <DotGrid className="flex-1 mt-0.5 min-h-0" />
        </div>
        <div className="flex flex-col min-h-0">
          <SmallFieldLabel slash={false}>FEATURES / DETAILS</SmallFieldLabel>
          <DotGrid className="flex-1 mt-0.5 min-h-0" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1 mt-1">
        <SmallFieldLabel>AGE / ERA</SmallFieldLabel>
        <SmallFieldLabel>CONDITION</SmallFieldLabel>
      </div>
    </Card>
  );
}

function LocationCardBack() {
  return (
    <Card width={5} height={3}>
      <div className="flex-1 grid grid-cols-2 gap-2">
        <div className="flex flex-col min-h-0">
          <SmallFieldLabel slash={false}>HISTORY / LORE</SmallFieldLabel>
          <DotGrid className="flex-1 mt-0.5 min-h-0" />
        </div>
        <div className="flex flex-col min-h-0 gap-1">
          <div className="flex-1 flex flex-col min-h-0">
            <SmallFieldLabel slash={false}>SECRETS / DISCOVERIES</SmallFieldLabel>
            <DotGrid className="flex-1 mt-0.5 min-h-0" />
          </div>
          <div className="flex-1 flex flex-col min-h-0">
            <SmallFieldLabel slash={false}>HOOKS / CONNECTIONS</SmallFieldLabel>
            <DotGrid className="flex-1 mt-0.5 min-h-0" />
          </div>
        </div>
      </div>
    </Card>
  );
}

function SessionTrackerFront() {
  return (
    <Card>
      <div className="grid grid-cols-2 gap-1">
        <FieldLabel>DATE</FieldLabel>
        <FieldLabel>QUEST</FieldLabel>
      </div>
      <FieldLabel slash={false}>KEY EVENTS</FieldLabel>
      <DotGrid />
    </Card>
  );
}

function SessionTrackerBack() {
  return (
    <Card>
      <FieldLabel slash={false}>DECISIONS</FieldLabel>
      <DotGrid />
      <FieldLabel slash={false}>LOOSE THREADS</FieldLabel>
      <DotGrid />
    </Card>
  );
}
