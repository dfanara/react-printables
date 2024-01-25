import path from 'path';
import { Documents } from './documents/_documents';
import fs from 'fs';
import slugify from 'slugify';
import { PDFService } from './services/pdf.service';
import PreviewService from './services/preview.service';
import type { PageSize } from './types/documents.types';
import JekyllService from './services/jekyll.service';

const outdir = path.join(import.meta.dir, "pages", "pdfs");

if (!fs.existsSync(outdir)) {
  fs.mkdirSync(outdir, { recursive: true })
}

for (const document of Documents) {
  let previewImages: string[] = [];
  let previewImageLink: string | null = null;
  let pdfsBySize: Map<PageSize, string> = new Map();

  for (const size of document.meta.sizes) {
    const docSlug = slugify(`${document.meta.title}-${size}`, { lower: true });
    const outPath = path.join(outdir, `${docSlug}.pdf`)
    const docUrl = `/pdfs/${docSlug}.pdf`;

    await PDFService.getInstance().renderDocument(document.meta, size, document.component, outPath);
    pdfsBySize.set(size, docUrl);

    if (size === "Letter") {
      previewImages = await PreviewService.getInstance().generatePreviews(document.meta, outPath, outdir);
      previewImageLink = docUrl;
    }
  }

  await JekyllService.getInstance().buildDocument({
    meta: document.meta,
    previewImages,
    previewImageLink,
    pdfsBySize
  })
}
