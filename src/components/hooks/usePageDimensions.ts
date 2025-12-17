import type { PageSize } from "../../types/documents.types";

interface Dimensions {
  height: number;
  width: number;
}

interface CSSDimensions {
  height: string;
  width: string;
}

export function usePageDimensions(pageSize: PageSize, orientation: "portrait" | "landscape") {
  const defaultSize: Dimensions = { width: 8.5, height: 11 };

  const sizeMap: Record<PageSize, Dimensions> = {
    Letter: defaultSize,
    Legal: { width: 8.5, height: 14 },
    "5x7": { width: 5, height: 7 },
    "3x5": { width: 3, height: 5 },
  };

  let size = sizeMap[pageSize] ?? defaultSize;

  if (orientation === "landscape") {
    size = { height: size.width, width: size.height };
  }

  return size;
}

export function usePageDimensionsCSS(pageSize: PageSize, orientation: "portrait" | "landscape"): CSSDimensions {
  const inches = usePageDimensions(pageSize, orientation);

  return {
    height: `${inches.height}in`,
    width: `${inches.width}in`,
  }
}