const MessageModel = require('../database/models/message');

const MessageService = {
  async getAll() {
    return await MessageModel.getAll();
  },
  async getById(id) {
    return await MessageModel.getById(id);
  },
  async create(data) {
    return await MessageModel.create(data);
  },
  async update(id, data) {
    return await MessageModel.update(id, data);
  },
  async remove(id) {
    return await MessageModel.remove(id);
  }
};

module.exports = MessageService;
