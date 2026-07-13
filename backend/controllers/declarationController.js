const { PDFDocument, rgb } = require('pdf-lib');
const fontkit = require('@pdf-lib/fontkit');
const fs = require('fs');
const path = require('path');
const db = require('../config/db');
exports.generateDeclaration = async (req, res) => {
    const { patientId, doctorId } = req.body;
    try {
        const [pRows] = await db.query('SELECT * FROM users WHERE id = ?', [patientId]);
        const patient = pRows[0];
        const [dRows] = await db.query('SELECT * FROM users WHERE id = ?', [doctorId]);
        const doctor = dRows[0];
        if (!patient || !doctor) {
            return res.status(404).json({ message: "Користувачів не знайдено" });
        }
        let clinicAddress = "Адреса не вказана";
        if (doctor.clinic_id) {
            const [cRows] = await db.query('SELECT address FROM clinics WHERE id = ?', [doctor.clinic_id]);
            if (cRows.length > 0) {
                clinicAddress = cRows[0].address;
            }
        }
        const decNumber = `D-${Date.now().toString().slice(-6)}`;
        const templatePath = path.join(__dirname, '../assets/deklaratsiya.pdf');
        const fontPath = path.join(__dirname, '../assets/Arial.ttf');
        if (!fs.existsSync(templatePath) || !fs.existsSync(fontPath)) {
            return res.status(500).json({ message: "Файли шаблону або шрифту не знайдено" });
        }
        const existingPdfBytes = fs.readFileSync(templatePath);
        const fontBytes = fs.readFileSync(fontPath);
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        pdfDoc.registerFontkit(fontkit);
        const customFont = await pdfDoc.embedFont(fontBytes);
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const secondPage = pages[1];
        const drawText = (page, text, x, y, size = 11) => {
            if (!text) return;
            page.drawText(text.toString(), { x, y, size, font: customFont, color: rgb(0, 0, 0) });
        };
        drawText(firstPage, decNumber, 395, 756);
        drawText(firstPage, patient.last_name, 44, 625);
        drawText(firstPage, patient.first_name, 44, 581);
        drawText(firstPage, patient.middle_name, 44, 539);
        drawText(firstPage, patient.gender, 255, 625);
        drawText(firstPage, patient.city, 305, 625); 
        drawText(firstPage, patient.birth_date ? new Date(patient.birth_date).toLocaleDateString('uk-UA') : '', 470, 625);
        drawText(firstPage, patient.passport_number, 255, 581);
        drawText(firstPage, patient.tax_id, 325, 539);
        drawText(firstPage, patient.phone, 58, 455);
        drawText(firstPage, patient.email, 255, 455);
        drawText(firstPage, patient.zip_code, 44, 280);
        drawText(firstPage, patient.street, 120, 280);
        drawText(firstPage, patient.building_flat, 249, 280);
        drawText(firstPage, patient.city, 326, 280);
        drawText(firstPage, patient.region, 467, 280);
        drawText(secondPage, doctor.full_name, 95, 705);; 
        drawText(secondPage, doctor.phone, 91, 682);
        drawText(secondPage, doctor.email, 344, 682);
        drawText(secondPage, new Date().toLocaleDateString('uk-UA'), 95, 582);
        drawText(secondPage, patient.full_name, 344, 582);
        drawText(secondPage, doctor.full_name, 344, 513);
        drawText(secondPage, 'Оксана Божик', 344, 453);
        await db.query('INSERT INTO declarations (patient_id, doctor_id, declaration_number) VALUES (?, ?, ?)', 
            [patientId, doctorId, decNumber]);
        const pdfBytes = await pdfDoc.save();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=declaration.pdf');
        res.send(Buffer.from(pdfBytes));
    } catch (error) {
        console.error("Помилка генерації:", error);
        res.status(500).json({ message: "Помилка сервера" });
    }
};