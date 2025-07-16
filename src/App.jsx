// src/App.jsx
import React, { useState, useEffect } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import TemplateSelector from './components/TemplateSelector'
import PreviewPane from './components/PreviewPane'
import MarkdownEditor from './components/MarkdownEditor'
import PdfImporter from './components/PdfImporter'
import html2pdf from 'html2pdf.js'
import './App.css'
import { useContentReview } from './hooks/useContentReview'

const templates = [
  { id: 'classic-es', name: 'Classic (ES)',   path: '/templates/classic-es.md' },
  { id: 'classic-en', name: 'Classic (EN)',   path: '/templates/classic-en.md' },
  { id: 'minimal-es', name: 'Minimal (ES)',   path: '/templates/minimal-es.md' },
  { id: 'minimal-en', name: 'Minimal (EN)',   path: '/templates/minimal-en.md' },
  { id: 'creative-es',name: 'Creative (ES)',  path: '/templates/creative-es.md' },
  { id: 'creative-en',name: 'Creative (EN)',  path: '/templates/creative-en.md' },
]

export default function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id)
  const [templateRaw, setTemplateRaw]           = useState('')
  const [content, setContent]                   = useLocalStorage(
    `md-${selectedTemplate}`,
    ''
  )

  // 1) Handler para cuando importas un PDF:
  const handlePdfExtract = (importedMd) => {
    setContent(importedMd)
  }

  // 2) Carga siempre la plantilla al cambiar de selectedTemplate
  useEffect(() => {
    async function loadTpl() {
      const tpl = templates.find(t => t.id === selectedTemplate)
      try {
        const res = await fetch(tpl.path)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const md = await res.text()
        setTemplateRaw(md)
        // siempre inicializamos el editor con la plantilla
        setContent(md)
      } catch (err) {
        console.error('Error loading template:', err)
      }
    }
    loadTpl()
  }, [selectedTemplate, setContent])

  // 3) Función de descarga PDF
  const handleDownload = () => {
    const element = document.getElementById('preview-container')
    document.body.classList.add('no-borders')
    const opts = {
      margin:       [0.5, 0.5, 0.5, 0.5],
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
      filename:     `${selectedTemplate}-${Date.now()}.pdf`,
    }
    html2pdf().set(opts).from(element).save()
      .finally(() => document.body.classList.remove('no-borders'))
  }

  const lang   = selectedTemplate.endsWith('-es') ? 'es' : 'en'
  const review = useContentReview(content, lang)

  return (
    <div className="app-container">
      {/* Importar PDF */}
      <div className="import-panel">
        <PdfImporter onExtract={handlePdfExtract} />
      </div>

      {/* Selector de plantilla */}
      <TemplateSelector
        templates={templates}
        selectedTemplate={selectedTemplate}
        onChange={setSelectedTemplate}
      />

      {/* Editor / Preview */}
      <div className="editor-preview">
        <MarkdownEditor content={content} onChange={setContent} />
        <PreviewPane    content={content} />
      </div>

      {/* Botón Download */}
      <button onClick={handleDownload} className="download-button">
        Download PDF
      </button>

      {/* Panel de Revisión */}
      <div className="review-panel">
        {review.weakLines.length > 0 && (
          <div>
            <strong>Generic phrases detected:</strong>
            <ul>
              {review.weakLines.map(i => <li key={i}>{review.lines[i]}</li>)}
            </ul>
          </div>
        )}
        {review.missingMetrics.length > 0 && (
          <div>
            <strong>Lines without metrics:</strong>
            <ul>
              {review.missingMetrics.map(i => <li key={i}>{review.lines[i]}</li>)}
            </ul>
          </div>
        )}
        {review.suggestions.length > 0 && (
          <div>
            <strong>Action verb suggestions:</strong>
            <ul>
              {review.suggestions.map(s => (
                <li key={s.line}>
                  Line {s.line + 1}: Start with “{s.verb}”
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
