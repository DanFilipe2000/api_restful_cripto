import { apiFetch } from './fetch.js';

// Busca todos os chats do usuário autenticado

export async function getChatsByUserFull(userId) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Usuário não autenticado');
  const url = `/chat/user/${encodeURIComponent(userId)}/full`;
  return await apiFetch(url, {
    method: 'GET',
    token
  });
}

// Renderiza os chats na lista do HTML

function renderChats(chats, loggedUserId) {
  const chatList = document.getElementById('chat-list');
  chatList.innerHTML = '';
  if (!chats || chats.length === 0) {
    chatList.innerHTML = '<li class="collection-item">Nenhum chat encontrado.</li>';
    return;
  }
  chats.forEach(chat => {
    // Participantes (exceto o usuário logado)
    const otherUsers = (chat.users || []).filter(u => u.id !== loggedUserId);
    const userNames = otherUsers.map(u => u.username).join(', ') || 'Você';
    // Última mensagem
    let lastMsg = '';
    if (chat.messages && chat.messages.length > 0) {
      const last = chat.messages[chat.messages.length - 1];
      lastMsg = `<b>${last.sender_username}:</b> ${last.content}`;
    }
    const li = document.createElement('li');
    li.className = 'collection-item avatar';
    li.innerHTML = `
      <a href="chat?chat_id=${encodeURIComponent(chat.id)}" class="maillink waves-effect status available">
        <img src="assets/images/user-24.jpg" alt="Chat" class="circle">
        <span class="title">${userNames}</span>
        <p>${lastMsg}</p>
        <span class="time">${chat.created_at ? new Date(chat.created_at).toLocaleString() : ''}</span>
      </a>
      <div class="chat-users" style="margin-left: 10px;">
        <small>Participantes: ${(chat.users || []).map(u => u.username).join(', ')}</small>
      </div>
    `;
    chatList.appendChild(li);
  });
}

// Ao carregar a página, busca e exibe os chats do usuário

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) throw new Error('Usuário não encontrado');
    const chats = await getChatsByUserFull(user.id);
    renderChats(chats, user.id);
  } catch (err) {
    alert('Erro ao buscar chats: ' + (err.data?.message || err.message));
  }
});
