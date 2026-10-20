// Centralització de la URL base de l'API per a desenvolupament i producció unificada
export const API_BASE = (typeof window !== 'undefined' && window.location.hostname === 'localhost' && window.location.port === '5173')
  ? 'http://localhost:4000/api'
  : (import.meta.env.VITE_API_BASE || '/api');

export const BACKEND_URL = (typeof window !== 'undefined' && window.location.hostname === 'localhost' && window.location.port === '5173')
  ? 'http://localhost:4000'
  : (import.meta.env.VITE_BACKEND_URL || window.location.origin);
