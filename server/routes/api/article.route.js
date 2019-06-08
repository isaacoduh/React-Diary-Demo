const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
// const product_controller = require('../controllers/product.controller');
const articleController =require('../../controllers/article.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', articleController.test);
router.get('/', articleController.index);
router.post('/', articleController.store);
router.get('/:id', articleController.single);
router.put('/:id', articleController.update);
router.delete('/:id', articleController.delete);
module.exports = router;