const db = require('../config/db');
exports.getAllClinics = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM clinics');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Помилка завантаження лікарень", error });
    }
};
exports.getClinicById = async (req, res) => {
    const { id } = req.params;
    try {
        const [clinic] = await db.query('SELECT * FROM clinics WHERE id = ?', [id]);
        const [doctors] = await db.query('SELECT id, full_name, specialization, photo_url FROM users WHERE clinic_id = ? AND role = "doctor"', [id]);
        if (clinic.length === 0) return res.status(404).json({ message: "Заклад не знайдено" });
        res.json({ ...clinic[0], doctors });
    } catch (error) {
        res.status(500).json({ message: "Помилка сервера", error });
    }
};