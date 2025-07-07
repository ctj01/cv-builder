import React, { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import TemplateSelector from './components/TemplateSelector';
import PreviewPane from './components/PreviewPane';
import MarkdownEditor from './components/MarkdownEditor';
import html2pdf from 'html2pdf.js';
import './App.css';
import { useContentReview } from './hooks/useContentReview';
const templates = [
  { id: 'classic-es', name: 'Classic (ES)', path: '/templates/classic-es.md' },
  { id: 'classic-en', name: 'Classic (EN)', path: '/templates/classic-en.md' },
  { id: 'minimal-es', name: 'Minimal (ES)', path: '/templates/minimal-es.md' },
  { id: 'minimal-en', name: 'Minimal (EN)', path: '/templates/minimal-en.md' },
  { id: 'creative-es', name: 'Creative (ES)', path: '/templates/creative-es.md' },
  { id: 'creative-en', name: 'Creative (EN)', path: '/templates/creative-en.md' },
];

export default function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id);
  const [templateRaw, setTemplateRaw] = useState('');
  const [content, setContent] = useLocalStorage(
    `md-${selectedTemplate}`,
    ''
  );
const handleDownload = () => {
  const element = document.getElementById('preview-container');
  document.body.classList.add('no-borders');
  const opt = {
    margin:       [0.5, 0.5, 0.5, 0.5], 
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
    filename:     `${selectedTemplate}-${Date.now()}.pdf`
  };

  html2pdf().set(opt).from(element).save()
    .then(() => {
      document.body.classList.remove('no-borders');
    });
};
  useEffect(() => {
    // Cargar plantilla raw
    fetch(`/templates/${selectedTemplate}.md`)
      .then((res) => res.text())
      .then((text) => {
        setTemplateRaw(text);
        const stored = localStorage.getItem(`md-${selectedTemplate}`);
        setContent(text);
      });
  }, [selectedTemplate]);
  const lang=selectedTemplate.endsWith('-es')?'es':'en';
  const review=useContentReview(content,lang);
  return (
    <div className="app-container">
      <TemplateSelector
        templates={templates}
        selectedTemplate={selectedTemplate}
        onChange={setSelectedTemplate}
      />

      <div className="editor-preview">
        <MarkdownEditor content={content} onChange={setContent} />
        <PreviewPane content={content} />
      </div>

      <button
        onClick={handleDownload}
        className="download-button"
      >
        Download PDF
      </button>

      <div className="review-panel">
        {review.weakLines.length>0 && <div>
          <strong>Generic phrases detected in lines:</strong>
          <ul>{review.weakLines.map(i=><li key={i}>{review.lines[i]}</li>)}</ul>
        </div>}
        {review.missingMetrics.length>0 && <div>
          <strong>Lines without metrics:</strong>
          <ul>{review.missingMetrics.map(i=><li key={i}>{review.lines[i]}</li>)}</ul>
        </div>}
        {review.suggestions.length>0 && <div>
          <strong>Action verb suggestions:</strong>
          <ul>{review.suggestions.map(s=><li key={s.line}>Line {s.line+1}: Start with "{s.verb}"</li>)}</ul>
        </div>}
      </div>
    </div>
  );
}