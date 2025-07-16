const db = require('../connection');

const Friendship = {
  async getAll() {
    const [rows] = await db.execute('SELECT * FROM Friendships');
    return rows;
  },
  async getById(user_id, friend_id) {
    const [rows] = await db.execute('SELECT * FROM Friendships WHERE user_id = ? AND friend_id = ?', [user_id, friend_id]);
    return rows[0] || null;
  },
  async create({ user_id, friend_id, status = 'pending' }) {
    await db.execute('INSERT INTO Friendships (user_id, friend_id, status) VALUES (?, ?, ?)', [user_id, friend_id, status]);
    return this.getById(user_id, friend_id);
  },
  async update(user_id, friend_id, data) {
    const { status } = data;
    await db.execute('UPDATE Friendships SET status = ? WHERE user_id = ? AND friend_id = ?', [status, user_id, friend_id]);
    return this.getById(user_id, friend_id);
  },
  async remove(user_id, friend_id) {
    const [result] = await db.execute('DELETE FROM Friendships WHERE user_id = ? AND friend_id = ?', [user_id, friend_id]);
    return result.affectedRows > 0;
  }
};

module.exports = Friendship;
