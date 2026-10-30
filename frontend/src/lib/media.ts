const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

export const getStorageUrl = (path?: string | null) => {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  const apiBase = API_URL.replace(/\/api(\/v\d+)?\/?$/, '').replace(/\/$/, '');
  const cleanPath = path.replace(/^\/+/, '').replace(/^public\//, '').replace(/^storage\//, '');
  return `${apiBase}/storage/${cleanPath}`;
};
