
const ChatModel = require('../database/models/chat');
const ChatFullModel = require('../database/models/chat_full');


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
  },
  async getChatsWithMessagesAndUsersByUserId(userId) {
    return await ChatFullModel.getChatsWithMessagesAndUsersByUserId(userId);
  }
};

module.exports = ChatService;
