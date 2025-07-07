import React from 'react';

/**
 * Componente para seleccionar la plantilla Markdown.
 * @param {Object[]} templates - Array de plantillas { id, name }.
 * @param {string} selectedTemplate - ID de la plantilla seleccionada.
 * @param {Function} onChange - Callback con el nuevo ID.
 */
export default function TemplateSelector({ templates, selectedTemplate, onChange }) {
  return (
    <div className="template-selector">
      <label htmlFor="template-select">Select template:</label>
      <select
        id="template-select"
        value={selectedTemplate}
        onChange={(e) => onChange(e.target.value)}
      >
        {templates.map((tpl) => (
          <option key={tpl.id} value={tpl.id}>
            {tpl.name}
          </option>
        ))}
      </select>
    </div>
  );
}
