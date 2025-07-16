const db = require('../connection');

const Chat = {
  async getAll() {
    const [rows] = await db.execute('SELECT * FROM Chat');
    return rows;
  },
  async getById(id) {
    const [rows] = await db.execute('SELECT * FROM Chat WHERE id = ?', [id]);
    return rows[0] || null;
  },
  async create({ id }) {
    await db.execute('INSERT INTO Chat (id) VALUES (?)', [id]);
    return this.getById(id);
  },
  async remove(id) {
    const [result] = await db.execute('DELETE FROM Chat WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Chat;
