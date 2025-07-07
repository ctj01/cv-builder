// src/hooks/useContentReview.js
import { useMemo } from 'react';

// Patrones de frases genéricas en inglés
const enPatterns = [
  /responsible for/i,
  /in charg[eé] of/i,
  /participat(ed|e)/i,
  /collaborat(ed|e)/i,
  /assisted/i,
  /worked on/i,
  /helped/i
];

// Patrones de frases genéricas en español
const esPatterns = [
  /responsable de/i,
  /encargado de/i,
  /particip[ée]?/i,
  /colabor[ae]?/i,
  /asist[ií] en/i,
  /trabaj[óa]? en/i,
  /ayud[óa]? en/i
];

// Verbos de acción recomendados en inglés
const actionVerbsEn = [
  'Led', 'Implemented', 'Optimized', 'Designed', 'Managed',
  'Developed', 'Created', 'Improved', 'Reduced', 'Architected',
  'Facilitated', 'Spearheaded', 'Streamlined', 'Coordinated',
  'Executed', 'Initiated', 'Directed', 'Enhanced', 'Automated'
];

// Verbos de acción recomendados en español
const actionVerbsEs = [
  'Lideró', 'Implementó', 'Optimizó', 'Diseñó', 'Dirigió',
  'Desarrolló', 'Creó', 'Mejoró', 'Redució', 'Arquitectó',
  'Facilitó', 'Encabezó', 'Racionalizó', 'Coordinó',
  'Ejecutó', 'Inició', 'Dirigió', 'Potenció', 'Automatizó'
];

/**
 * Hook para revisar contenido de CV y detectar líneas débiles o sin métricas.
 * Funciona tanto para inglés ("en") como español ("es").
 */
export function useContentReview(content, lang = 'en') {
  const weakPatterns = lang === 'es' ? esPatterns : enPatterns;
  const actionVerbs = lang === 'es' ? actionVerbsEs : actionVerbsEn;

  const lines = useMemo(() => content.split('\n'), [content]);

  return useMemo(() => {
    const weakLines = [];
    const missingMetrics = [];
    const suggestions = [];

    lines.forEach((rawLine, idx) => {
      const line = rawLine.trim();
      if (!line.startsWith('-') && !line.startsWith('*') && !line.endsWith(':')) return;

      const text = line.replace(/^[-*]\s*/, '');

      if (weakPatterns.some(rx => rx.test(text))) {
        weakLines.push(idx);
      }
      if (!/\d/.test(text)) {
        missingMetrics.push(idx);
      }
      const startsWithVerb = actionVerbs.some(v => new RegExp(`^${v}`, 'i').test(text));
      if (!startsWithVerb) {
        const verb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
        suggestions.push({ line: idx, verb });
      }
    });

    return { weakLines, missingMetrics, suggestions, lines };
  }, [lines, weakPatterns, actionVerbs]);
}
