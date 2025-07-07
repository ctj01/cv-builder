
import { useState, useEffect } from 'react';
/**
 * Hook para almacenar y recuperar datos de localStorage.
 * @param {string} key - Clave en localStorage.
 * @param {*} defaultValue - Valor inicial si no hay dato guardado.
 * @returns {[any, Function]} - Estado y función para actualizar.
 */
export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
