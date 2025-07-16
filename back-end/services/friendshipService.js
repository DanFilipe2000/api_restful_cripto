const FriendshipModel = require('../database/models/friendship');

const FriendshipService = {
  async getAll() {
    return await FriendshipModel.getAll();
  },
  async getById(user_id, friend_id) {
    return await FriendshipModel.getById(user_id, friend_id);
  },
  async create(data) {
    return await FriendshipModel.create(data);
  },
  async update(user_id, friend_id, data) {
    return await FriendshipModel.update(user_id, friend_id, data);
  },
  async remove(user_id, friend_id) {
    return await FriendshipModel.remove(user_id, friend_id);
  }
};

module.exports = FriendshipService;
