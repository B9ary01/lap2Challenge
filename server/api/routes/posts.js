const express = require('express');
const router = express.Router();

const postsController = require('../controllers/posts');

router.get('/', postsController.index);
router.post('/', postsController.create);
router.delete('/:id', postsController.destroy);


module.exports = router;