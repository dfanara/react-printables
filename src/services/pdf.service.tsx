import puppeteer from "puppeteer";
import type { DocumentMeta, DocumentProps, PageSize } from "../types/documents.types";
import ReactDOMServer from "react-dom/server";
import React from "react";
import fs from "fs";
import path from "path";

const PAGE_DIMENSIONS: Record<PageSize, { width: number; height: number }> = {
  Letter: { width: 8.5, height: 11 },
  Legal: { width: 8.5, height: 14 },
  "5x7": { width: 5, height: 7 },
  "3x5": { width: 3, height: 5 },
};

export class PDFService {
  private static instance: PDFService;

  private constructor() { }

  public async renderDocument(meta: DocumentMeta, pageSize: PageSize, document: React.ComponentType<DocumentProps>, outputFile: string) {
    try {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();

      const html = ReactDOMServer.renderToString(React.createElement(document, { pageSize, meta }));
      await page.setContent(html);
      await page.waitForNetworkIdle();

      const baseSize = PAGE_DIMENSIONS[pageSize] ?? PAGE_DIMENSIONS["Letter"];
      const width = meta.orientation === "landscape" ? baseSize.height : baseSize.width;
      const height = meta.orientation === "landscape" ? baseSize.width : baseSize.height;

      const pdf = await page.pdf({
        width: `${width}in`,
        height: `${height}in`,
        printBackground: true,
        omitBackground: false,
        margin: meta.margin
      })
      fs.writeFileSync(outputFile, pdf);
      fs.writeFileSync(outputFile.replace(".pdf", ".html"), html);

      await browser.close();
    } catch (e) {
      console.error("Error rendering the page to a PDF", e)
    }
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new PDFService();
    }

    return this.instance;
  }
}