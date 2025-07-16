const { registerUser } = require('../services/registerService');

const register = async (req, res) => {
  try {
    const { username, email, password, public_key } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'username, email e password são obrigatórios' });
    }
    const user = await registerUser({ username, email, password, public_key });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { register };
