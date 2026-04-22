const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/', cartController.getAll);
router.get('/:id', cartController.getOne);
router.post('/', cartController.create);
router.put('/:id', cartController.update);
router.delete('/:id', cartController.remove);

module.exports = router;