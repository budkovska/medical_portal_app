require('dotenv').config();
const express = require('express');
const cors = require('cors');
const serviceRoutes = require('./routes/serviceRoutes');
const clinicRoutes = require('./routes/clinicRoutes');
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const declarationRoutes = require('./routes/declarationRoutes');
const newsRoutes = require('./routes/newsRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const path = require('path');
const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'user-id']
}));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/clinics', clinicRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/declarations', declarationRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/images', express.static(path.join(__dirname, 'assets/images')));
console.log("Static path:", path.join(__dirname, 'assets', 'images'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущено на порту ${PORT}`);
});
