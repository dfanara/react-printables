import dedent from "dedent";
import type { DocumentMeta, DocumentProps } from "../types/documents.types";
import Document from "../components/layout/Document";
import Page from "../components/layout/Page";
import TextArea from "../components/TextArea";
import Ledger from "../components/Ledger";
import useBaseMargin from "../components/hooks/useBaseMargin";

export const SevenColumnLedgerMeta: DocumentMeta = {
  title: "Seven Column Ledger",
  description: "Accounting ledger with 7 columns for recording shared transactions.",
  overview: dedent`
    This ledger is designed to be used for recording the balance of a joint account,
    where money into and out of the account is shared between multiple people.
    
    Accounting for transactions this way allows you to see the overall balance of the account,
    while still being able to see who has what share of the balance.

    The columns I use are:
    - Person 1 Ingoing
    - Person 1 Outgoing
    - Person 1 Balance
    - Person 2 Ingoing
    - Person 2 Outgoing
    - Person 2 Balance
    - Account Balance

    The margins on this document are setup in a way that allows you to print it double sided, and keep it in a binder. I prefer to bundle things together in a plastic report cover, but admittedly it can be hard to write on the back of the page when doing this.
  `,
  sizes: ["Legal", "Letter"],
  oritentation: "landscape"
}

export const SevenColumnLedgerDocument = ({ meta }: DocumentProps) => {
  return (
    <Document meta={meta}>
      <Page margin={useBaseMargin("0.25in", { top: "0.375in" })}>
        <div className="flex gap-4 mb-4">
          <TextArea label="Account" />
          <TextArea label="Page No." style={{ width: "2in" }}/>
        </div>
        
        <Ledger columns={7} rows={29} digits={4} finalColumnDigits={5} />
      </Page>
      <Page margin={useBaseMargin("0.25in", { bottom: "0.375in" })}>
        <Ledger columns={7} rows={31} digits={4} finalColumnDigits={5} />
      </Page>
    </Document>
  )
}