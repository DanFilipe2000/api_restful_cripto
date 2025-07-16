const db = require('../connection');

const UserChat = {
  async getChatsByUserId(userId) {
    // Retorna todos os chats de um usuário
    const [rows] = await db.execute(
      `SELECT c.* FROM rel_user_chat uc
       JOIN Chat c ON uc.chat_id = c.id
       WHERE uc.user_id = ?`,
      [userId]
    );
    return rows;
  },
  async getUsersByChatId(chatId) {
    // Retorna todos os usuários de um chat
    const [rows] = await db.execute(
      `SELECT u.id, u.username, u.email, u.public_key FROM rel_user_chat uc
       JOIN User u ON uc.user_id = u.id
       WHERE uc.chat_id = ?`,
      [chatId]
    );
    return rows;
  }
};

module.exports = UserChat;
