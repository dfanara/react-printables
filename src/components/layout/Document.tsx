import type { DocumentMeta } from "../../types/documents.types"
import { DocumentMetaProvider } from "../contexts/DocumentMetaContext"

interface DocumentProps {
  children?: React.ReactNode
  meta: DocumentMeta
}

export default function Document({ children, meta }: DocumentProps) {
  return (
    <html>
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
        <script>
          {`
            tailwind.config = {
              theme: {
                extend: {
                  fontFamily: {
                    sans: ["Roboto"],
                    mono: ["Roboto Mono"],
                  }
                }
              }
            }
          `}
        </script>
      </head>
      <body>
        <DocumentMetaProvider meta={meta}>
          {children}
        </DocumentMetaProvider>
      </body>
    </html>
  )
}