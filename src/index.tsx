import ReactPDF from '@react-pdf/renderer';
import {MyDocument} from './documents/TestDocument';
import path from 'path';
import { Documents } from './documents/_documents';
import fs from 'fs';
import pdf from 'pdf-thumbnail';
import slugify from 'slugify';
import yaml from 'yaml';
import type { DocumentRegistration } from './types/documents.types';
import {PDFImage} from "pdf-image"

async function generatePdfPreview(outPath: string, document: DocumentRegistration) {
  const pdfBuffer = fs.readFileSync(outPath);

  return new Promise<void>((resolve, reject) => {
    pdf(pdfBuffer, {
      compress: {
        type: 'JPEG',  //default
        quality: 70    //default
      }
    })
      .then((data: any) => {
        data.on('close', () => { setTimeout(() => {resolve()}, 10000) })

        data.pipe(fs.createWriteStream(path.join(outdir, `${slugify(document.meta.title + '-preview', { lower: true })}.jpg`)))
      })
      .catch((err: Error) => reject(err))
  })
}

async function otherPdfPreview(outPath: string, document: DocumentRegistration) {
  return new Promise<void>((resolve) => {
    var pdfImage = new PDFImage(outPath);

    pdfImage.convertPage(0).then(function (imagePath) {
      console.log(`Got image`, imagePath)
      fs.renameSync(imagePath, path.join(outdir, `${slugify(document.meta.title + '-preview', { lower: true })}.jpg`))

      resolve()
    }).catch(e => {
      console.error("Caught error while generating preview", e);

      resolve();
    });
  })
}

const outdir = path.join(import.meta.dir, "pages", "pdfs");

if (!fs.existsSync(outdir)) {
  fs.mkdirSync(outdir, { recursive: true })
}

for (const document of Documents) {
  const docSlug = slugify(document.meta.title, { lower: true });
  const outPath = path.join(outdir, `${docSlug}-letter.pdf`)

  await ReactPDF.render(<MyDocument meta={document.meta} pageSize={"Letter"} />, outPath);

  await otherPdfPreview(outPath, document)
}

const meta = Documents.map(doc => {
  const sizes = doc.meta.sizes.map(size => {
    return {
      size,
      url: `/pdfs/my-test-document-${size}.pdf`
    }
  })

  return {
    title: doc.meta.title,
    description: doc.meta.description,
    previewImage: `/pdfs/my-document-preview.jpg`,
    previewPDF: `/pdfs/my-document-letter.pdf`,
    longContent: doc.meta.content,
    sizes
  }
})

const collectionOutdir = path.join(import.meta.dirname, 'pages', '_printables');

meta.forEach(doc => {
  const yamlText = yaml.stringify({
    ...doc,
    layout: "document"
  })
  const docSlug = slugify(doc.title, { lower: true });

  if (!fs.existsSync(collectionOutdir)) {
    fs.mkdirSync(collectionOutdir, { recursive: true })
  }

  fs.writeFileSync(path.join(collectionOutdir, `${docSlug}.md`), `---\n${yamlText}\n---\n`)
})



