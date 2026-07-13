const db = require('../config/db');
exports.getAllNews = async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM news ORDER BY published_at DESC'
        );
        res.json(rows);
    } catch (error) {
        console.error("Помилка при отриманні новин:", error);
        res.status(500).json({ message: "Помилка сервера при завантаженні новин" });
    }
};
exports.getNewsById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM news WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Новину не знайдено" });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Помилка сервера" });
    }
};
exports.createNews = async (req, res) => {
    const { title, content, category, image_url } = req.body;
    try {
        await db.query(
            'INSERT INTO news (title, content, category, image_url) VALUES (?, ?, ?, ?)',
            [title, content, category, image_url]
        );
        res.status(201).json({ message: "Новину успішно додано" });
    } catch (error) {
        res.status(500).json({ message: "Не вдалося додати новину" });
    }
};