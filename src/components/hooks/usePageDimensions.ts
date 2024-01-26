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
  let size: Dimensions;

  if (pageSize === "Letter") {
    size = { width: 8.5, height: 11 };
  }else {
    // Some default value I spose
    size = { width: 595, height: 842 };
  }

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