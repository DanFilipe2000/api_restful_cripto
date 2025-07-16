const db = require('../connection.js');

const User = {
  async create({ username, email, password_hash, public_key }) {
    const [result] = await db.execute(
      'INSERT INTO User (username, email, password_hash, public_key) VALUES (?, ?, ?, ?)',
      [username, email, password_hash, public_key]
    );
    return { id: result.insertId, username, email, public_key };
  },

  async findById(id) {
    const [rows] = await db.execute('SELECT * FROM User WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async findByUsername(username) {
    const [rows] = await db.execute('SELECT * FROM User WHERE username = ?', [username]);
    return rows[0] || null;
  },

  async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM User WHERE email = ?', [email]);
    return rows[0] || null;
  },

  async findAll() {
    const [rows] = await db.execute('SELECT * FROM User');
    return rows;
  },

  async update(id, data) {
    const fields = [];
    const values = [];
    for (const key in data) {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    }
    if (!fields.length) return null;
    values.push(id);
    await db.execute(`UPDATE User SET ${fields.join(', ')} WHERE id = ?`, values);
    return this.findById(id);
  },

  async delete(id) {
    await db.execute('DELETE FROM User WHERE id = ?', [id]);
    return true;
  }
};

module.exports = User;
