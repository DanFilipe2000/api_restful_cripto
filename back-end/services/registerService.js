const bcrypt = require('bcryptjs');
const User = require('../database/models/user');

async function registerUser({ username, email, password, public_key }) {
  const existingUser = await User.findByUsername(username);
  if (existingUser) {
    throw new Error('Nome de usuário já cadastrado');
  }
  const existingEmail = await User.findByEmail(email);
  if (existingEmail) {
    throw new Error('Email já cadastrado');
  }

  const password_hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password_hash,
    public_key
  });

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    public_key: user.public_key,
    created_at: user.created_at
  };
}

module.exports = { registerUser };
