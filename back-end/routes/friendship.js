const express = require('express');
const router = express.Router();
const friendshipController = require('../controllers/friendshipController');

router.get('/', friendshipController.getAll);
router.get('/:id', friendshipController.getById);
router.post('/', friendshipController.create);
router.put('/:id', friendshipController.update);
router.delete('/:id', friendshipController.remove);

module.exports = router;
