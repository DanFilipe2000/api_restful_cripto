// fetch.js - módulo para requisições ao backend

const API_URL = 'http://localhost:54321'; // ajuste conforme necessário

export async function apiFetch(endpoint, { method = 'GET', headers = {}, body, token, signature } = {}) {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  };
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  if (signature) config.headers['x-signature'] = signature;
  if (body) config.body = JSON.stringify(body);

  const response = await fetch(`${API_URL}${endpoint}`, config);
  const contentType = response.headers.get('content-type');
  let data;
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }
  if (!response.ok) {
    throw { status: response.status, data };
  }
  return data;
}
