const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
router.get('/slots', appointmentController.getAvailableSlots);
router.post('/', appointmentController.createAppointment);
router.get('/my', appointmentController.getUserAppointments);
router.put('/:id/cancel', appointmentController.cancelAppointment);
module.exports = router;