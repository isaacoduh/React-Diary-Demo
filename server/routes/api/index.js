const router = require('express').Router();

// router.use('/entries', require('./entries'));
router.use('/entries', require('./entry.route'));
router.use('/articles', require('./article.route'));

module.exports =router;