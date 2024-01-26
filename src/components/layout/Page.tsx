import type { PDFMargin } from "puppeteer"

interface PageProps {
  children?: React.ReactNode
  margin?: Required<PDFMargin>
}

/**
 * The page helps us layout our content and break it up across pages, however it can be a bit tricky.
 * 
 * There is some nuance and some planning is required to make sure pages line up. If you prefer,
 * you can omit the page component and allow the browser to break the content across pages for you.
 * 
 * You can further control the page breaks using the CSS `page-break-after` and `page-break-inside`.
 */
export default function Page({ children, margin }: PageProps) {
  const marginStyles: React.CSSProperties = {
    paddingTop: margin?.top,
    paddingBottom: margin?.bottom,
    paddingLeft: margin?.left,
    paddingRight: margin?.right,
  }

  return (
    <div className="h-screen w-screen overflow-hidden relative" style={{ pageBreakAfter: "always", pageBreakInside: "avoid", ...marginStyles }}>
      {children}
    </div>
  )
}