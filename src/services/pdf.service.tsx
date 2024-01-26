import puppeteer from "puppeteer";
import type { DocumentMeta, DocumentProps, PageSize } from "../types/documents.types";
import ReactDOMServer from "react-dom/server";
import React from "react";
import fs from "fs";

export class PDFService {
  private static instance: PDFService;

  private constructor() {}

  public async renderDocument(meta: DocumentMeta, pageSize: PageSize, document: React.ComponentType<DocumentProps>, outputFile: string) {
    try {
      const browser = await puppeteer.launch({ headless: 'new' });
      const page = await browser.newPage();

      const html = ReactDOMServer.renderToString(React.createElement(document, { pageSize, meta }));
      await page.setContent(html);
      await page.waitForNetworkIdle();

      const pdf = await page.pdf({
        format: pageSize,
        landscape: meta.oritentation === "landscape",
        printBackground: true,
        omitBackground: false,
        margin: meta.margin
      })
      fs.writeFileSync(outputFile, pdf);

      await browser.close();
    }catch(e) {
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