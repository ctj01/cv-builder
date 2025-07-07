import React from 'react';
import ReactMarkdown from 'react-markdown';

/**
 * Vista de previsualización del Markdown.
 */
export default function PreviewPane({ content }) {
  return (
    <div id="preview-container" className="preview-pane">
      <ReactMarkdown>
        {content}
      </ReactMarkdown>
    </div>
  );
}