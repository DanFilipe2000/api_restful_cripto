const db = require('../connection');
const UserChat = require('./user_chat');
const Message = require('./message');

const ChatFull = {
  async getChatsWithMessagesAndUsersByUserId(userId) {
    // Busca todos os chats do usuário
    const chats = await UserChat.getChatsByUserId(userId);
    // Para cada chat, busca mensagens e usuários
    for (const chat of chats) {
      // Mensagens do chat
      const [messages] = await db.execute(
        'SELECT m.*, u.username as sender_username FROM Messages m JOIN User u ON m.sender_id = u.id WHERE m.chat_id = ? ORDER BY m.id ASC',
        [chat.id]
      );
      chat.messages = messages;
      // Usuários do chat
      chat.users = await UserChat.getUsersByChatId(chat.id);
    }
    return chats;
  }
};

module.exports = ChatFull;
