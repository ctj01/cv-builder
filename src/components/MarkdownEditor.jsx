import React from 'react';
import MDEditor from '@uiw/react-md-editor';

/**
 * Editor Markdown interactivo.
 */
export default function MarkdownEditor({ content, onChange }) {
  return (
    <div className="markdown-editor">
      <MDEditor
       value={content}
       onChange={onChange}
       preview="edit"
       height="100%"
     />
    </div>
  );
}