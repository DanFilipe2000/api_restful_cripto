const { loginUser } = require('../services/loginService');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'username e password são obrigatórios' });
    }
    const result = await loginUser({ username, password });
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { login };
