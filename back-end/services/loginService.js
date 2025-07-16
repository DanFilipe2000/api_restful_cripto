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

  // Gera par de chaves RSA
  const { publicKey, privateKey } = require('crypto').generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
  });

  // Atualiza a chave pública do usuário no banco
  await User.update(user.id, { public_key: publicKey });

  // Gera token JWT
  const token = jwt.generateToken({ id: user.id, username: user.username });

  return {
    token,
    private_key: privateKey,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      public_key: publicKey,
      created_at: user.created_at
    }
  };
}

module.exports = { loginUser };
