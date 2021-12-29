const router = require('express').Router();
const controller = require('./tables.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router.route('/').get(controller.list).all(methodNotAllowed);

router.route('/new').post(controller.create).all(methodNotAllowed);

router
  .route('/:table_id/edit')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);

router
  .route('/:table_id/seat')
  .put(controller.assignReservation)
  .delete(controller.deleteReservationId)
  .all(methodNotAllowed);

module.exports = router;
