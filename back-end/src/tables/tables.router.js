const router = require('express').Router();
const controller = require('./tables.controller');

router.route('/:table_id/seat');

router
  .route('/:table_id')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete);

router.route('/').get(controller.list);

module.exports = router;
