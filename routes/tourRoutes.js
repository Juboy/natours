const express = require('express');
const tourController = require('./../controllers/tourController.js');
//you can also use destructuring to get all the exprots form the
//const {getAllTours, createTour, getTour} =  require('./../controllers/tourController.js');

const { protect, restrictTo } = require('./../controllers/authController');

const router = express.Router();

router
  .route('/top-5-cheap')
  .get(protect, tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(protect, tourController.getTourStats);

router.route('/monthly-plan/:year').get(protect, tourController.getMonthlyPlan);
router
  .route('/')
  .get(protect, tourController.getAllTours)
  .post(protect, tourController.createTour);

router
  .route('/:id')
  .get(protect, tourController.getTour)
  .patch(protect, tourController.updateTour)
  .delete(
    protect,
    restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
