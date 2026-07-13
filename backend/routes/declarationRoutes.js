const express = require('express');
const router = express.Router();
const declarationController = require('../controllers/declarationController');
router.post('/generate', declarationController.generateDeclaration);
module.exports = router;