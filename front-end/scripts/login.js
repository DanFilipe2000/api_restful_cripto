import { apiFetch } from './fetch.js';

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('login-btn');
  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email311').value;
    const password = document.getElementById('pass311').value;
    if (!email || !password) {
      alert('Preencha todos os campos!');
      return;
    }
    try {
      const result = await apiFetch('/login', {
        method: 'POST',
        body: { username: email, password }
      });
      // Salvar token e chave privada se vierem na resposta
      if (result.token) localStorage.setItem('token', result.token);
      if (result.private_key) localStorage.setItem('private_key', result.private_key);
      if (result.user) localStorage.setItem('user', JSON.stringify(result.user));
      alert('Login realizado com sucesso!');
      // Redirecionar para a home ou dashboard
      window.location.href = 'messages';
    } catch (err) {
      alert('Erro ao fazer login: ' + (err.data?.message || err.message));
    }
  });
});
