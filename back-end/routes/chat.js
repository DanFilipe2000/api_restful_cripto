const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');


// Endpoint para buscar todos os chats de um usuário, incluindo mensagens e usuários
router.get('/user/:userId/full', chatController.getChatsWithMessagesAndUsersByUserId);

router.get('/', chatController.getAll);
router.get('/:id', chatController.getById);
router.post('/', chatController.create);
router.put('/:id', chatController.update);
router.delete('/:id', chatController.remove);

module.exports = router;
