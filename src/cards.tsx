import path from "path";
import fs from "fs";
import yaml from "yaml";
import { CardService } from "./services/card.service";
import { DndCardDefinitions } from "./documents/DndCards";
import { CalendarCardDefinitions } from "./documents/CalendarCards";

const outDir = path.join(import.meta.dir, "..", "dist", "cards", "dnd");
const BLEED_INCHES = 0.06;
const TRIM_WIDTH_INCHES = 3;
const TRIM_HEIGHT_INCHES = 5;
const CARD_COPIES_PER_SHEET = 4;

const LAYOUT_3X5 = {
  type: "grid",
  output: "output.pdf",
  options: {
    card: {
      // This layout tool expects `size` to include bleed when bleedIncludedInImage is true.
      size: {
        width: TRIM_WIDTH_INCHES + BLEED_INCHES * 2,
        height: TRIM_HEIGHT_INCHES + BLEED_INCHES * 2,
      },
      bleed: { top: BLEED_INCHES, bottom: BLEED_INCHES, left: BLEED_INCHES, right: BLEED_INCHES },
      bleedIncludedInImage: true,
    },
    page: {
      size: { width: 8.5, height: 11 },
      margin: { top: 0.25, bottom: 0.25, left: 0.25, right: 0.25 },
    },
  },
};

async function runLayout(outputDir: string) {
  console.log(`Running: layout render ./layout.yml`);
  const proc = Bun.spawn(["layout", "render", "./layout.yml"], {
    cwd: outputDir,
    stdout: "inherit",
    stderr: "inherit",
  });
  const exit = await proc.exited;
  if (exit !== 0) {
    throw new Error(`layout render exited with ${exit}`);
  }
}

// One sheet per unique card — 4 copies of the same front per sheet.
async function renderCardSetUnique(
  cardService: ReturnType<typeof CardService.getInstance>,
  definitions: typeof DndCardDefinitions,
  outputDir: string
) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const cardSets: { name: string; back: string; fronts: { image: string }[] }[] = [];

  for (const def of definitions) {
    const frontPath = path.join(outputDir, `${def.name}-front.pdf`);
    const backPath = path.join(outputDir, `${def.name}-back.pdf`);

    console.log(`Rendering ${def.name} front...`);
    await cardService.renderCardPdf(def.front, def.width, def.height, frontPath, { bleedInches: BLEED_INCHES });
    console.log(`Rendering ${def.name} back...`);
    await cardService.renderCardPdf(def.back, def.width, def.height, backPath, { bleedInches: BLEED_INCHES });

    cardSets.push({
      name: def.name,
      back: `./${def.name}-back.pdf`,
      fronts: Array.from({ length: CARD_COPIES_PER_SHEET }, () => ({ image: `./${def.name}-front.pdf` })),
    });
  }

  const layoutPath = path.join(outputDir, "layout.yml");
  fs.writeFileSync(layoutPath, yaml.stringify({ layouts: [LAYOUT_3X5], cardSets }));
  console.log(`Wrote ${layoutPath}`);
  await runLayout(outputDir);
}

// 4 different cards per sheet — one sheet per group of CARD_COPIES_PER_SHEET cards.
// All cards in a group share the same back (the back of the first card in each group).
async function renderCardSetGrouped(
  cardService: ReturnType<typeof CardService.getInstance>,
  definitions: typeof DndCardDefinitions,
  outputDir: string
) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Render all fronts.
  for (const def of definitions) {
    const frontPath = path.join(outputDir, `${def.name}-front.pdf`);
    console.log(`Rendering ${def.name} front...`);
    await cardService.renderCardPdf(def.front, def.width, def.height, frontPath, { bleedInches: BLEED_INCHES });
  }

  // Render one shared back using the first definition's back component.
  const sharedBackPath = path.join(outputDir, "shared-back.pdf");
  console.log(`Rendering shared back...`);
  await cardService.renderCardPdf(definitions[0].back, definitions[0].width, definitions[0].height, sharedBackPath, { bleedInches: BLEED_INCHES });

  const cardSets = [
    {
      name: "calendar",
      back: "./shared-back.pdf",
      fronts: definitions.map((def) => ({ image: `./${def.name}-front.pdf` })),
    },
  ];

  const layoutPath = path.join(outputDir, "layout.yml");
  fs.writeFileSync(layoutPath, yaml.stringify({ layouts: [LAYOUT_3X5], cardSets }));
  console.log(`Wrote ${layoutPath}`);
  await runLayout(outputDir);
}

async function main() {
  const cardService = CardService.getInstance();

  console.log("=== DnD Cards ===");
  await renderCardSetUnique(cardService, DndCardDefinitions, outDir);

  const calendarOutDir = path.join(import.meta.dir, "..", "dist", "cards", "calendar");
  console.log("\n=== Calendar Pack ===");
  await renderCardSetGrouped(cardService, CalendarCardDefinitions, calendarOutDir);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
