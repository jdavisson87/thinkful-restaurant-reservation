const router = require('express').Router();
const controller = require('./tables.controller');

router.route('/:table_id/seat');

router.route('/').get(controller.list);

module.exports = router;
