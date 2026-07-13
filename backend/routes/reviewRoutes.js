const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
router.get('/doctor/:id', reviewController.getDoctorReviews);
router.post('/', reviewController.addReview);
module.exports = router;