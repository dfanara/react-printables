import slugify from "slugify";
import type { DocumentMeta, PageSize } from "../types/documents.types";
import yaml from "yaml";
import fs from 'fs/promises';
import path from 'path';

const collectionOutdir = path.join(import.meta.dirname, 'pages', '_printables');

export interface BuildDocumentArgs {
  meta: DocumentMeta,
  previewImages: string[],
  previewImageLink: string | null,
  pdfsBySize: Map<PageSize, string>
}

/**
 * The Jekyll service is responsible for writing the required metadata to our Jekyll pages
 * so that the appropriate entries are show on our GitHub pages site.
 */
export default class JekyllService {
  private static instance: JekyllService

  private constructor() {}

  public async buildDocument({ meta, previewImages, previewImageLink, pdfsBySize}: BuildDocumentArgs) {
    const sizes = [];
    for (const [size, pdf] of pdfsBySize.entries()) {
      sizes.push({
        size,
        url: pdf
      })
    }

    const jekyllPageMeta = {
      title: meta.title,
      description: meta.description,
      overview: meta.overview,
      previewImages: previewImages.map(fileName => `/pdfs/${fileName}`),
      previewImageLink,
      sizes,
      
      // Required to render our document layout and presets
      layout: "document"
    }

    const titleSlug = slugify(meta.title, { lower: true });
    const jekyllPageContent = `---\n${yaml.stringify(jekyllPageMeta)}\n---\n`;

    if (!await fs.exists(collectionOutdir)) {
      await fs.mkdir(collectionOutdir, { recursive: true });
    }

    await fs.writeFile(path.join(import.meta.dirname, "..", "pages", "_printables", `${titleSlug}.md`), jekyllPageContent);
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new JekyllService();
    }

    return this.instance;
  }
}