const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const { protect } = require('../middleware/middleware');
router.get('/news', serviceController.getNews);
router.post('/appointments', serviceController.createAppointment);
exports.searchDoctors = async (req, res) => {
    const { query } = req.query;
    const [rows] = await db.query(
        "SELECT id, full_name, specialization FROM users WHERE role='doctor' AND (full_name LIKE ? OR specialization LIKE ?)",
        [`%${query}%`, `%${query}%`]
    );
    res.json(rows);
};
router.post('/appointments', protect, serviceController.createAppointment);
module.exports = router;