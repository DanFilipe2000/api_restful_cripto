const messageService = require('../services/messageService');

module.exports = {
  async getAll(_req, res) {
    try {
      const messages = await messageService.getAll();
      res.json(messages);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getById(req, res) {
    try {
      const message = await messageService.getById(req.params.id);
      if (!message) return res.status(404).json({ message: 'Mensagem não encontrada' });
      res.json(message);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async create(req, res) {
    try {
      // Extrai os campos corretos do payload
      const { payload } = req.body;
      if (!payload || !payload.chat_id || !payload.sender_id || !payload.content) {
        return res.status(400).json({ message: 'Dados da mensagem incompletos' });
      }
      const message = await messageService.create(payload);
      res.status(201).json(message);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async update(req, res) {
    try {
      const message = await messageService.update(req.params.id, req.body);
      if (!message) return res.status(404).json({ message: 'Mensagem não encontrada' });
      res.json(message);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async remove(req, res) {
    try {
      const ok = await messageService.remove(req.params.id);
      if (!ok) return res.status(404).json({ message: 'Mensagem não encontrada' });
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
