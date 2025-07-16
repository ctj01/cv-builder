// src/utils/pdfExtract.js
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf'; 
// (usa la versión “legacy” para garantizar compatibilidad con bundlers)
import workerUrl from 'pdfjs-dist/legacy/build/pdf.worker.min.js?url'; 
// el '?url' le dice a Vite “trátalo como un asset y dame su URL final”

// Apunta al worker empaquetado por Vite
GlobalWorkerOptions.workerSrc = workerUrl;

/**
 * Extrae todo el texto de un archivo PDF.
 * @param {File} file — El objeto File obtenido de un <input type="file">
 * @returns {Promise<string>} — El texto completo del PDF
 */
export async function extractTextFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  let fullText = '';

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    const strings = content.items.map(item => item.str);
    fullText += strings.join(' ') + '\n\n';
  }

  return fullText;
}
