const db = require('../connection');

const Message = {
  async getAll() {
    const [rows] = await db.execute('SELECT * FROM Messages');
    return rows;
  },
  async getById(id) {
    const [rows] = await db.execute('SELECT * FROM Messages WHERE id = ?', [id]);
    return rows[0] || null;
  },
  async create({ chat_id, sender_id, content }) {
    const [result] = await db.execute('INSERT INTO Messages (chat_id, sender_id, content) VALUES (?, ?, ?)', [chat_id, sender_id, content]);
    return this.getById(result.insertId);
  },
  async update(id, data) {
    const { content } = data;
    await db.execute('UPDATE Messages SET content = ? WHERE id = ?', [content, id]);
    return this.getById(id);
  },
  async remove(id) {
    const [result] = await db.execute('DELETE FROM Messages WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Message;
