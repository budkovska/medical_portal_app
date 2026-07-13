const db = require('../config/db');
const bcrypt = require('bcryptjs');
exports.register = async (req, res) => {
    const { full_name, email, phone, tax_id, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await db.query(
            'INSERT INTO users (full_name, email, phone, tax_id, password) VALUES (?, ?, ?, ?, ?)',
            [full_name, email, phone, tax_id, hashedPassword]
        );
        res.status(201).json({ message: "Користувача зареєстровано!" });
    } catch (error) {
        res.status(500).json({ message: "Помилка при реєстрації", error });
    }
};
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) return res.status(404).json({ message: "Користувача не знайдено" });
        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Невірний пароль" });
        res.json({
            message: "Вхід успішний",
            user: { id: user.id, full_name: user.full_name, role: user.role, tax_id: user.tax_id }
        });
    } catch (error) {
        res.status(500).json({ message: "Помилка сервера", error });
    }
};
exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query(`
            SELECT 
                u.id, u.full_name, u.email, u.phone, u.role, u.birth_date, 
                u.specialization, u.experience_years, u.bio, u.photo_url,
                c.name as clinic_name, 
                c.address as clinic_address
            FROM users u
            LEFT JOIN clinics c ON u.clinic_id = c.id
            WHERE u.id = ?
        `, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Користувача не знайдено" });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error("Помилка в getUserById:", error);
        res.status(500).json({ message: "Помилка сервера", error });
    }
};
exports.getAllUsers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, full_name, role, specialization, photo_url, bio, experience_years FROM users');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Помилка сервера" });
    }
};
exports.updateUserProfile = async (req, res) => {
    const { id } = req.params;
    const { full_name, email, phone, birth_date } = req.body;
    try {
        await db.query(
            'UPDATE users SET full_name = ?, email = ?, phone = ?, birth_date = ? WHERE id = ?',
            [full_name, email, phone, birth_date, id]
        );
        res.json({ message: "Профіль успішно оновлено" });
    } catch (error) {
        res.status(500).json({ message: "Помилка при оновленні" });
    }
};