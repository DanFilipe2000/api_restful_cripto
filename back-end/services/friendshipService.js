const db = require('../database/connection');

const Friendship = {
  async getAll() {
    const [rows] = await db.execute('SELECT * FROM Friendships');
    return rows;
  },
  async getById(id) {
    const [rows] = await db.execute('SELECT * FROM Friendships WHERE id = ?', [id]);
    return rows[0] || null;
  },
  async create(data) {
    const { user_id_1, user_id_2 } = data;
    const [result] = await db.execute('INSERT INTO Friendships (user_id_1, user_id_2) VALUES (?, ?)', [user_id_1, user_id_2]);
    return { id: result.insertId, user_id_1, user_id_2 };
  },
  async update(id, data) {
    const { user_id_1, user_id_2 } = data;
    await db.execute('UPDATE Friendships SET user_id_1 = ?, user_id_2 = ? WHERE id = ?', [user_id_1, user_id_2, id]);
    return this.getById(id);
  },
  async remove(id) {
    const [rows] = await db.execute('DELETE FROM Friendships WHERE id = ?', [id]);
    return rows.affectedRows > 0;
  }
};

module.exports = Friendship;
