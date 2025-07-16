const ChatModel = require('../database/models/chat');

const ChatService = {
  async getAll() {
    return await ChatModel.getAll();
  },
  async getById(id) {
    return await ChatModel.getById(id);
  },
  async create(data) {
    return await ChatModel.create(data);
  },
  async update(id, data) {
    return await ChatModel.update(id, data);
  },
  async remove(id) {
    return await ChatModel.remove(id);
  }
};

module.exports = ChatService;
