const express = require('express');
const router = express.Router();

const entryController = require('../../controllers/entry.controller');

router.get('/test', entryController.test);
router.get('/', entryController.index);
router.post('/', entryController.store);
router.get('/:id', entryController.single);
router.put('/:id', entryController.update);
router.delete('/:id', entryController.delete);

module.exports = router;