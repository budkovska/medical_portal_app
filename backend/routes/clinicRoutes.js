const express = require('express');
const router = express.Router();
const clinicController = require('../controllers/clinicController');
router.get('/', clinicController.getAllClinics);
router.get('/:id', clinicController.getClinicById);
module.exports = router;