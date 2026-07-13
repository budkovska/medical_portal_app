const db = require('../config/db');
exports.getNews = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM news ORDER BY published_at DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Помилка сервера", error });
    }
};
exports.createAppointment = async (req, res) => {
    const { doctor_id, service_name, appointment_date } = req.body;
    const patient_id = req.authenticatedUserId;
    try {
        await db.query(
            'INSERT INTO appointments (patient_id, doctor_id, service_name, appointment_date) VALUES (?, ?, ?, ?)',
            [patient_id, doctor_id, service_name, appointment_date]
        );
        res.status(201).json({ message: "Запис створено успішно!" });
    } catch (error) {
        res.status(500).json({ message: "Помилка при записі", error });
    }
};
