const db = require('../database/connection');

const Chat = {
  async getAll() {
    const [rows] = await db.execute('SELECT * FROM Chat');
    return rows;
  },
  async getById(id) {
    const [rows] = await db.execute('SELECT * FROM Chat WHERE id = ?', [id]);
    return rows[0] || null;
  },
  async create(data) {
    const { name } = data;
    const [result] = await db.execute('INSERT INTO Chat (name) VALUES (?)', [name]);
    return { id: result.insertId, name };
  },
  async update(id, data) {
    const { name } = data;
    await db.execute('UPDATE Chat SET name = ? WHERE id = ?', [name, id]);
    return this.getById(id);
  },
  async remove(id) {
    const [rows] = await db.execute('DELETE FROM Chat WHERE id = ?', [id]);
    return rows.affectedRows > 0;
  }
};

module.exports = Chat;
