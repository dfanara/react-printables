import puppeteer from "puppeteer";
import React from "react";
import ReactDOMServer from "react-dom/server";
import fs from "fs";
import path from "path";
import type { CardDefinition } from "../types/documents.types";

const DPI = 300;
const CSS_DPI = 96;
const DEVICE_SCALE_FACTOR = DPI / CSS_DPI;

function CardDocumentWrapper({
  children,
  rotateForPortrait,
  contentWidthInches,
  contentHeightInches,
}: {
  children: React.ReactNode;
  rotateForPortrait?: boolean;
  contentWidthInches?: number;
  contentHeightInches?: number;
}) {
  const contentW = contentWidthInches ?? 0;
  const contentH = contentHeightInches ?? 0;
  const useRotation = rotateForPortrait && contentW > contentH;

  const inner = useRotation ? (
    <div
      style={{
        width: `${contentW}in`,
        height: `${contentH}in`,
        transform: "rotate(-90deg)",
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  ) : (
    children
  );

  return (
    <html className="h-full">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  fontFamily: {
                    sans: ["Roboto"],
                    mono: ["Roboto Mono"],
                  },
                  colors: {
                    gray: {
                      50: '#f7f7f7',
                      100: '#efefef',
                      200: '#e0e0e0',
                      300: '#c6c6c6',
                      400: '#a8a8a8',
                      500: '#8d8d8d',
                      600: '#6f6f6f',
                      700: '#525252',
                      800: '#393939',
                      900: '#262626',
                    },
                  },
                }
              }
            }
          ` }} />
        <style dangerouslySetInnerHTML={{ __html: `
          html, body { margin: 0; padding: 0; width: 100%; height: 100%; }
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: geometricPrecision;
          }
        ` }} />
      </head>
      <body className="m-0 p-0 w-full h-full flex items-center justify-center bg-white overflow-hidden">
        {inner}
      </body>
    </html>
  );
}

export class CardService {
  private static instance: CardService;

  private constructor() { }

  public async renderCardPdf(
    component: React.ComponentType,
    widthInches: number,
    heightInches: number,
    outputPath: string,
    options?: {
      bleedInches?: number;
    }
  ): Promise<void> {
    const bleedInches = options?.bleedInches ?? 0;
    const isLandscape = widthInches > heightInches;
    const viewportWidthInches = isLandscape ? heightInches : widthInches;
    const viewportHeightInches = isLandscape ? widthInches : heightInches;
    const totalW = viewportWidthInches + bleedInches * 2;
    const totalH = viewportHeightInches + bleedInches * 2;

    const html = ReactDOMServer.renderToString(
      React.createElement(
        CardDocumentWrapper,
        {
          rotateForPortrait: isLandscape,
          contentWidthInches: widthInches,
          contentHeightInches: heightInches,
        },
        React.createElement(component)
      )
    );

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "networkidle0" });

    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    await page.pdf({
      path: outputPath,
      width: `${totalW}in`,
      height: `${totalH}in`,
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    await browser.close();
  }

  public async renderCard(
    component: React.ComponentType,
    widthInches: number,
    heightInches: number,
    outputPath: string,
    options?: {
      bleedInches?: number;
    }
  ): Promise<void> {
    const bleedInches = options?.bleedInches ?? 0;
    const isLandscape = widthInches > heightInches;
    const viewportWidthInches = isLandscape ? heightInches : widthInches;
    const viewportHeightInches = isLandscape ? widthInches : heightInches;
    const widthPx = Math.round((viewportWidthInches + bleedInches * 2) * CSS_DPI);
    const heightPx = Math.round((viewportHeightInches + bleedInches * 2) * CSS_DPI);

    const html = ReactDOMServer.renderToString(
      React.createElement(
        CardDocumentWrapper,
        {
          rotateForPortrait: isLandscape,
          contentWidthInches: widthInches,
          contentHeightInches: heightInches,
        },
        React.createElement(component)
      )
    );

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "networkidle0" });
    await page.setViewport({
      width: widthPx,
      height: heightPx,
      deviceScaleFactor: DEVICE_SCALE_FACTOR,
    });

    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    await page.screenshot({
      path: outputPath,
      type: "png",
      omitBackground: false,
    });

    await browser.close();
  }

  public static getInstance(): CardService {
    if (!this.instance) {
      this.instance = new CardService();
    }
    return this.instance;
  }
}
