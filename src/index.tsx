import ReactPDF from '@react-pdf/renderer';
import {MyDocument} from './documents/TestDocument';
import path from 'path';
import { Documents } from './documents/_documents';
import fs from 'fs';
import pdf from 'pdf-thumbnail';
import slugify from 'slugify';

const outdir = path.join(import.meta.dir, "pages", "printables");

if (!fs.existsSync(outdir)) {
  fs.mkdirSync(outdir, { recursive: true })
}

for (const document of Documents) {
  const docSlug = slugify(document.title, { lower: true });
  const outPath = path.join(outdir, `${docSlug}.pdf`)

  await ReactPDF.render(<MyDocument pageSize={"LETTER"} />, outPath);

  const pdfBuffer = fs.readFileSync(outPath);
  
  pdf(pdfBuffer, {
    compress: {
      type: 'JPEG',  //default
      quality: 70    //default
    }
  })
    .then((data: any) => {
      data.pipe(fs.createWriteStream(path.join(outdir, `${slugify(document.title + '-preview', { lower: true })}.jpg`)))
    })
    .catch((err: Error) => console.log(err))
}