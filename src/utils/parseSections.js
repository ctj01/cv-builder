// src/utils/parseSections.js
/**
 * Divide el texto plano en secciones según encabezados comunes de CV,
 * extrae Contacto y Perfil Profesional de la parte inicial,
 * y devuelve un objeto ordenado con las secciones.
 */
export function parseSections(text) {
  // Encabezados de sección a reconocer
  const sectionPatterns = [
    'Experiencia Profesional', 'Experiencia', 'Experience',
    'Educación', 'Education',
    'Proyectos', 'Projects',
    'Habilidades', 'Skills',
    'Idiomas', 'Languages',
    'Certificaciones', 'Certifications',
    'Contacto', 'Contact',
    'Perfil Profesional', 'Professional Profile',
    'Resumen', 'Summary',
    'Otros', 'Other',
    'Formación académica', 'Formación Académica',
    'Experiencia de Asesoría',
    'Otros datos de interés',
    'Referencias',
    'Documentos Anexos',
  ];

  // Construye regex para split antes de cada encabezado
  const pattern = sectionPatterns
    .map(s => s.replace(/\s+/g, '\\s+'))
    .join('|');
  const splitRegex = new RegExp(`(?=\\b(?:${pattern})\\b)`, 'g');

  // Fragmenta el texto y limpia
  const parts = text
    .split(splitRegex)
    .map(p => p.trim())
    .filter(p => p);

  // Captura secciones crudas
  const rawSections = {};
  if (parts.length > 0 && !new RegExp(`^(${pattern})\\b`, 'i').test(parts[0])) {
    rawSections['Intro'] = parts[0];
    parts.shift();
  }
  parts.forEach(part => {
    const match = part.match(new RegExp(`^(${pattern})`, 'i'));
    const header = match ? match[1] : 'Other';
    const content = part.replace(new RegExp(`^${header}\\s*`, 'i'), '').trim();
    rawSections[header] = content;
  });

  // Procesar Intro en Contacto y Perfil Profesional
  let contact = '';
  let profile = '';
  if (rawSections['Intro']) {
    const introRaw = rawSections['Intro'];
    delete rawSections['Intro'];
    const introParts = introRaw
      .split(/\s{2,}/)
      .map(p => p.trim())
      .filter(p => p);
    // Primeros dos fragmentos: nombre y datos de contacto
    if (introParts.length >= 2) {
      contact = `${introParts[0]}  ${introParts[1]}`;
      profile = introParts.slice(2).join('  ');
    } else {
      profile = introRaw;
    }
  }

  // Construir objeto ordenado
  const ordered = {};
  if (contact) ordered['Contacto'] = contact;
  if (profile) ordered['Perfil Profesional'] = profile;
  // Luego, el resto de secciones en orden de aparición
  Object.keys(rawSections).forEach(key => {
    ordered[key] = rawSections[key];
  });

  return ordered;
}
