import { apiFetch } from './fetch.js';

// Envia { user_id, payload } no body e x-signature no header
export async function sendMessage({ user_id, payload, signature }) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Usuário não autenticado');
  return await apiFetch('/message', {
    method: 'POST',
    token,
    headers: { 'x-signature': signature },
    body: { user_id, payload }
  });
}
