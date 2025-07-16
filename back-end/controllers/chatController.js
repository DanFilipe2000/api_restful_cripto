const chatService = require('../services/chatService');

module.exports = {
  async getAll(req, res) {
    try {
      const chats = await chatService.getAll();
      res.json(chats);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  async getById(req, res) {
    try {
      const chat = await chatService.getById(req.params.id);
      if (!chat) return res.status(404).json({ message: 'Chat não encontrado' });
      res.json(chat);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  async create(req, res) {
    try {
      const chat = await chatService.create(req.body);
      res.status(201).json(chat);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  async update(req, res) {
    try {
      const chat = await chatService.update(req.params.id, req.body);
      if (!chat) return res.status(404).json({ message: 'Chat não encontrado' });
      res.json(chat);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  async remove(req, res) {
    try {
      const ok = await chatService.remove(req.params.id);
      if (!ok) return res.status(404).json({ message: 'Chat não encontrado' });
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  async getChatsWithMessagesAndUsersByUserId(req, res) {
    try {
      const userId = req.params.userId;
      const chats = await chatService.getChatsWithMessagesAndUsersByUserId(userId);
      res.json(chats);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
