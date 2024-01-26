import type { PDFMargin } from "puppeteer";

export default function useBaseMargin(baseMargin: string, overrides?: PDFMargin) {
  const margin = {
    top: baseMargin,
    bottom: baseMargin,
    left: baseMargin,
    right: baseMargin,
    ...overrides,
  }

  return margin;
}