import { apiFetch } from './fetch.js';

function getChatIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('chat_id');
}

export async function getChatWithMessagesAndUsers(chatId) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Usuário não autenticado');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!user.id) throw new Error('Usuário não encontrado');
  const url = `/chat/user/${encodeURIComponent(user.id)}/full`;
  const chats = await apiFetch(url, { method: 'GET', token });
  return chats.find(chat => String(chat.id) === String(chatId));
}

function renderChat(chat, loggedUserId) {
  const chatArea = document.querySelector('.chat-area');
  chatArea.innerHTML = '';
  if (!chat) {
    chatArea.innerHTML = '<li class="collection-item">Chat não encontrado.</li>';
    return;
  }
  (chat.messages || []).forEach(msg => {
    const isMe = msg.sender_id === loggedUserId;
    const li = document.createElement('li');
    li.className = 'user-avatar ' + (isMe ? 'rightside' : 'leftside');
    li.innerHTML = `
      <div class="msg-area status available z-depth-1">
        <img src="assets/images/user-24.jpg" alt="${msg.sender_username}" title="${msg.sender_username}" class="circle userpic">
        <p class="msg"><b>${msg.sender_username}:</b> ${msg.content}</p>
      </div>
      <span class="time">${msg.sent_at ? new Date(msg.sent_at).toLocaleString() : ''}</span>
    `;
    chatArea.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const chatId = getChatIdFromUrl();
    if (!chatId) throw new Error('Chat não especificado na URL');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) throw new Error('Usuário não encontrado');
    const chat = await getChatWithMessagesAndUsers(chatId);
    renderChat(chat, user.id);
  } catch (err) {
    alert('Erro ao buscar mensagens do chat: ' + (err.data?.message || err.message));
  }
});
