const jwt = require('jsonwebtoken');
require('dotenv').config();

const gerarAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const gerarRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
  });
};

const verificarAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const verificarRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};

module.exports = {
  gerarAccessToken,
  gerarRefreshToken,
  verificarAccessToken,
  verificarRefreshToken
};
