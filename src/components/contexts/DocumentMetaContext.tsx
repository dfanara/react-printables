import { createContext, useContext } from "react";
import type { DocumentMeta } from "../../types/documents.types";

const DocumentMetaContext = createContext<DocumentMeta>({} as DocumentMeta);

interface DocumentMetaProviderProps {
  meta: DocumentMeta
  children?: React.ReactNode
}

export function DocumentMetaProvider({ meta, children }: DocumentMetaProviderProps) {
  return (
    <DocumentMetaContext.Provider value={meta}>
      {children}
    </DocumentMetaContext.Provider>
  )
}

export function useDocumentMeta() {
  const context = useContext(DocumentMetaContext)

  return context;
}