
export function sectionsToMarkdown(sections) {
  return Object.entries(sections)
    .map(([title, content]) => {
      let block = content.trim();

      block = block.replace(/([.?!])\s{2,}(?=[A-Z0-9])/g, '$1\n\n');
      block = block.replace(/ {2,}-\s*/g, '\n- ');
      block = block.replace(/\n{3,}/g, '\n\n');
      if (/Experiencia/i.test(title)) {
        block = block
          .split('\n')
          .map(line => {
            if (/^\s*[^-].*\|.*$/.test(line)) {
              return `**${line.trim()}**`;
            }
            return line;
          })
          .join('\n');
      }

      return `## ${title}\n\n${block}`;
    })
    .join('\n\n');
}
