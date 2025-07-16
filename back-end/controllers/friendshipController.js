const friendshipService = require('../services/friendshipService');

module.exports = {
  async getAll(req, res) {
    try {
      const friendships = await friendshipService.getAll();
      res.json(friendships);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  async getById(req, res) {
    try {
      const friendship = await friendshipService.getById(req.params.id);
      if (!friendship) return res.status(404).json({ message: 'Amizade não encontrada' });
      res.json(friendship);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  async create(req, res) {
    try {
      const friendship = await friendshipService.create(req.body);
      res.status(201).json(friendship);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  async update(req, res) {
    try {
      const friendship = await friendshipService.update(req.params.id, req.body);
      if (!friendship) return res.status(404).json({ message: 'Amizade não encontrada' });
      res.json(friendship);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  async remove(req, res) {
    try {
      const ok = await friendshipService.remove(req.params.id);
      if (!ok) return res.status(404).json({ message: 'Amizade não encontrada' });
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
