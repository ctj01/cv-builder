// src/components/PdfImporter.js
import React from 'react';
import { extractTextFromPDF } from '../utils/pdfExtract';
import { parseSections } from '../utils/parseSections';
import { sectionsToMarkdown } from '../utils/toMarkdown';

export default function PdfImporter({ onExtract }) {
  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      // 1) Extrae texto plano
      const text = await extractTextFromPDF(file);
      // 2) Divide en secciones (Experiencia, Educación...)
      const sections = parseSections(text);
      // 3) Genera bloques MD con encabezados y saltos de línea
      const md = sectionsToMarkdown(sections);
      // 4) Pasa ese MD al App.jsx
      onExtract(md);
    } catch (err) {
      console.error('Error procesando PDF:', err);
    }
  };

  return (
    <label className="pdf-importer">
      Importar desde PDF:
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFile}
        style={{ marginLeft: '0.5rem' }}
      />
    </label>
  );
}
