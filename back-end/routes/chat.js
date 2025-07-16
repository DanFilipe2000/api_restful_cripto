const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/', chatController.getAll);
router.get('/:id', chatController.getById);
router.post('/', chatController.create);
router.put('/:id', chatController.update);
router.delete('/:id', chatController.remove);

module.exports = router;
