const db = require('../config/db');

exports.createAppointment = async (req, res) => {
    const { doctor_id, appointment_date } = req.body;
    const patient_id = req.headers['user-id'];
    if (!patient_id) {
        return res.status(401).json({ message: "Користувач не авторизований" });
    }
    try {
        const [existing] = await db.query(
            'SELECT id FROM appointments WHERE doctor_id = ? AND appointment_date = ? AND status != "Cancelled"',
            [doctor_id, appointment_date]
        );
        if (existing.length > 0) {
            return res.status(400).json({ message: "Вибачте, цей час щойно забронювали" });
        }
        await db.query(
            'INSERT INTO appointments (patient_id, doctor_id, appointment_date, status) VALUES (?, ?, ?, "Pending")',
            [patient_id, doctor_id, appointment_date]
        );
        res.status(201).json({ 
            message: "Запис успішно створено!",
            details: {
                date: appointment_date,
                status: "Підтверджено"
            }
        });
    } catch (error) {
        console.error("Помилка при створенні запису:", error);
        res.status(500).json({ message: "Помилка сервера при бронюванні", error });
    }
};

exports.getAvailableSlots = async (req, res) => {
    const { doctor_id, date } = req.query;
    try {
        const [appointments] = await db.query(
            `SELECT appointment_date FROM appointments 
             WHERE doctor_id = ? AND DATE(appointment_date) = ? AND status != 'Cancelled'`,
            [doctor_id, date]
        );
        const bookedSlots = appointments.map(app => {
            const d = new Date(app.appointment_date);
            return d.getHours().toString().padStart(2, '0') + ':00';
        });
        const allSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];
        const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));
        res.json(availableSlots);
    } catch (error) {
        res.status(500).json({ message: "Помилка отримання слотів", error });
    }
};

exports.getUserAppointments = async (req, res) => {
    const userId = req.headers['user-id'];
    const { role } = req.query;
    
    try {
        await db.query(
            `UPDATE appointments 
             SET status = 'Completed' 
             WHERE status = 'Pending' AND appointment_date < NOW()`
        );

        let query = '';
        if (role === 'doctor') {
            query = `
                SELECT a.*, u.full_name as patient_name, u.phone as patient_phone 
                FROM appointments a
                JOIN users u ON a.patient_id = u.id
                WHERE a.doctor_id = ?
                ORDER BY a.appointment_date DESC`;
        } else {
            query = `
                SELECT 
                    a.*, 
                    u.full_name as doctor_name, 
                    u.specialization,
                    c.name as clinic_name,
                    c.address as clinic_address
                FROM appointments a
                JOIN users u ON a.doctor_id = u.id
                LEFT JOIN clinics c ON u.clinic_id = c.id
                WHERE a.patient_id = ?
                ORDER BY a.appointment_date DESC`;
        }
        
        const [rows] = await db.query(query, [userId]);
        res.json(rows);
    } catch (error) {
        console.error("Помилка завантаження записів:", error);
        res.status(500).json({ message: "Помилка завантаження записів", error });
    }
};

exports.cancelAppointment = async (req, res) => {
    const { id } = req.params;
    const userId = req.headers['user-id'];
    try {
        await db.query(
            "UPDATE appointments SET status = 'Cancelled' WHERE id = ? AND (patient_id = ? OR doctor_id = ?)",
            [id, userId, userId]
        );
        res.json({ message: "Запис скасовано" });
    } catch (error) {
        res.status(500).json({ message: "Не вдалося скасувати запис" });
    }
};