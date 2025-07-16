const bcrypt = require('bcryptjs');
const User = require('../database/models/user');
const jwt = require('../utils/jwt');

async function loginUser({ username, password }) {
  // Busca usuário por username
  const user = await User.findByUsername(username);
  if (!user) {
    throw new Error('Usuário ou senha inválidos');
  }

  // Verifica senha
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    throw new Error('Usuário ou senha inválidos');
  }

  // Gera token JWT
  const token = jwt.generateToken({ id: user.id, username: user.username });

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      public_key: user.public_key,
      created_at: user.created_at
    }
  };
}

module.exports = { loginUser };
