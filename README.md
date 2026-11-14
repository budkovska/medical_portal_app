# MedPortal

Modern medical portal for patients and clinics built with React, Vite, Node.js, Express and MySQL.

MedPortal helps users quickly find doctors and clinics, book appointments, learn about declarations, read medical news, and contact the clinic support team.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=for-the-badge&logo=mysql)

## Main features

- User registration and login
- Doctor catalog with detailed profiles
- Clinics and medical institutions list
- Online appointment booking
- Declaration information and guidance
- Medical news and latest updates
- Contact form and support section
- Smooth animated UI with modern design

## Tech stack

### Frontend
- React 19
- Vite
- React Router DOM
- Framer Motion
- Bootstrap-based styling
- Axios for API requests

### Backend
- Node.js
- Express.js
- MySQL
- JWT authentication
- CORS and dotenv support

## Project structure

```text
medical_portal_app/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## Getting started

### Requirements

- Node.js 18+
- npm 9+
- MySQL database

### 1. Clone the repository

```bash
git clone https://github.com/your-username/medical_portal_app.git
cd medical_portal_app
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder with the following variables:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=medical_portal
JWT_SECRET=your_jwt_secret
```

Run the backend server:

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:5000
```

### 3. Frontend setup

Open a new terminal and run:

```bash
cd frontend
npm install
npm run dev
```

Open the application in your browser:

```text
http://localhost:5173
```

## 🔧 Available scripts

### Backend

```bash
npm run dev
npm run start
npm run build
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
npm run lint
```
