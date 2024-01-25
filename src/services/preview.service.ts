import { PDFImage } from "pdf-image";
import type { DocumentMeta } from "../types/documents.types";
import fs from 'fs/promises'
import path from 'path'
import slugify from "slugify";
import { usePageDimensions } from "../components/hooks/usePageDimensionsCSS";

export default class PreviewService {
  private static instance: PreviewService;

  private constructor() {}

  public async generatePreviews(meta: DocumentMeta, pdfPath: string, outputDir: string): Promise<string[]> {
    const pdfImage = new PDFImage(pdfPath, {
      convertOptions: {
        "-resize": `200%`,
      }
    })

    // Convert all pages
    const tempPages = await pdfImage.convertFile();
    
    // We don't need to include the page size in our previews because we only preview "Letter" sized docs.
    const sluggedTitle = slugify(`${meta.title}-preview`, { lower: true })
    
    const fileNames = [];
    for(let i = 0; i < tempPages.length; i++) {
      const fileName = `${sluggedTitle}-${i}.jpg`;
      await fs.rename(tempPages[i], path.join(outputDir, fileName))
      fileNames.push(fileName);
    }

    return fileNames;
  }

  public static getInstance(): PreviewService {
    if (!PreviewService.instance) {
      PreviewService.instance = new PreviewService();
    }

    return PreviewService.instance;
  }
}