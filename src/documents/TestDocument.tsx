import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import type { DocumentMeta, DocumentProps, ReactPDFPageSize } from '../types/documents.types';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

export const MyDocumentMeta: DocumentMeta = {
  title: "My Document",
  description: "This is my document. It has two columns!",
  content: `
Here's a long form description. I wrote this one because it's epic, yknow.
  `,
  sizes: ["Letter"]
}

export const MyDocument = ({ pageSize }: DocumentProps) => (
  <Document>
    <Page size={pageSize as ReactPDFPageSize} style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);