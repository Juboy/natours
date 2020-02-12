const express = require('express');
const tourController = require('./../controllers/tourController.js');
//you can also use destructuring to get all the exprots form the
//const {getAllTours, createTour, getTour} =  require('./../controllers/tourController.js');
const router = express.Router();

//param middleware
router.param('id', (req, res, next, val) => {
  console.log('Tour id is ' + val);
  next();
});

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router.route('/:id').get(tourController.getTour);

module.exports = router;
