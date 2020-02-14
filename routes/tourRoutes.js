const express = require('express');
const tourController = require('./../controllers/tourController.js');
//you can also use destructuring to get all the exprots form the
//const {getAllTours, createTour, getTour} =  require('./../controllers/tourController.js');
const router = express.Router();

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
