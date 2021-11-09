const router = require('express').Router();
const controller = require('./tables.controller');

router.route('/').get(controller.list);

router
  .route('/:table_id/edit')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete);

router.route('/:table_id/seat');

module.exports = router;
