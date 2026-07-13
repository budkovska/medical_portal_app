const db = require('../config/db');
exports.getDoctorReviews = async (req, res) => {
    const doctorId = parseInt(req.params.id);;
    const query = `
        SELECT r.*, u.full_name as user_name 
        FROM reviews r 
        LEFT JOIN users u ON r.patient_id = u.id 
        WHERE r.doctor_id = ?
        ORDER BY r.created_at DESC
    `;
    try {
        const [results] = await db.query(query, [doctorId]);
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.addReview = async (req, res) => {
    const { doctor_id, rating, comment } = req.body;
    const patient_id = req.headers['user-id'];
    if (!patient_id) {
        return res.status(401).json({ message: "Неавторизовано" });
    }
    const query = 'INSERT INTO reviews (doctor_id, patient_id, rating, comment) VALUES (?, ?, ?, ?)';
    try {
        const [result] = await db.query(query, [doctor_id, patient_id, rating, comment || ""]);
        const [userRes] = await db.query('SELECT full_name FROM users WHERE id = ?', [patient_id]);
        res.status(201).json({
            id: result.insertId,
            doctor_id,
            rating,
            comment: comment || "",
            created_at: new Date(),
            user_name: userRes[0]?.full_name || "Пацієнт"
        });
    } catch (err) {
        console.error("Помилка при додаванні відгуку:", err);
        res.status(500).json({ error: err.message });
    }
};