import { apiFetch } from './fetch.js';

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('register-btn');
  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    const username = document.getElementById('name3').value;
    const email = document.getElementById('email3').value;
    const password = document.getElementById('pass3').value;
    if (!username || !email || !password) {
      alert('Preencha todos os campos!');
      return;
    }
    try {
      await apiFetch('/register', {
        method: 'POST',
        body: { username, email, password, public_key: '' }
      });
      alert('Usuário registrado com sucesso!');
      window.location.href = 'login';
    } catch (err) {
      alert('Erro ao registrar: ' + (err.data?.message || err.message));
    }
  });
});
