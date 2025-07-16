const db = require('../database/connection');

const Message = {
  async getAll() {
    const [rows] = await db.execute('SELECT * FROM Messages');
    return rows;
  },
  async getById(id) {
    const [rows] = await db.execute('SELECT * FROM Messages WHERE id = ?', [id]);
    return rows[0] || null;
  },
  async create(data) {
    const { chat_id, sender_id, content } = data;
    const [result] = await db.execute('INSERT INTO Messages (chat_id, sender_id, content) VALUES (?, ?, ?)', [chat_id, sender_id, content]);
    return { id: result.insertId, chat_id, sender_id, content };
  },
  async update(id, data) {
    const { content } = data;
    await db.execute('UPDATE Messages SET content = ? WHERE id = ?', [content, id]);
    return this.getById(id);
  },
  async remove(id) {
    const [rows] = await db.execute('DELETE FROM Messages WHERE id = ?', [id]);
    return rows.affectedRows > 0;
  }
};

module.exports = Message;
