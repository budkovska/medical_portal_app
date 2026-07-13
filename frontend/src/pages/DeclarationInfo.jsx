import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function DeclarationInfo() {
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/users') 
      .then(res => {
        const docs = res.data.filter(u => u.role === 'Doctor' || u.role === 'doctor');
        setDoctors(docs);
      })
      .catch(err => {
        console.error("Помилка завантаження лікарів:", err);
      });
  }, []);
  const handleDownload = async () => {
    if (!user) {
      alert("Будь ласка, увійдіть у систему");
      navigate('/login');
      return;
    }
    if (!selectedDoctorId) {
      alert("Будь ласка, спочатку оберіть лікаря зі списку.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/declarations/generate', 
        { 
          patientId: user.id, 
          doctorId: selectedDoctorId 
        },
        { responseType: 'blob' }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `декларація_${user.full_name}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
      alert("Помилка при генерації. Переконайтеся, що ваші дані (паспорт, адреса) заповнені у профілі.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mt-5 mb-5 animate__animated animate__fadeIn">
      <div className="row">
        <div className="col-lg-5 mb-4">
          <h2 className="fw-bold mb-4">Декларація з лікарем</h2>
          <p className="text-muted mb-4" style={{ textAlign: 'justify' }}>
            Декларація про вибір лікаря – це документ, який офіційно реєструє вас у системі охорони здоров’я та закріплює за вами терапевта, педіатра чи сімейного лікаря. Без підписаної декларації ви не зможете скористатися перевагами програми «Доступні ліки» та отримати більшість безкоштовних медичних послуг.
          </p>
          <div className="mt-4">
            <h5 className="fw-bold mb-3">Чому це необхідно?</h5>
            <ul className="list-unstyled ms-2">
              <li className="mb-3 d-flex align-items-start">
                <span className="badge bg-primary me-2 rounded-3 mt-1">1</span>
                <span><strong>Безоплатний пакет послуг:</strong> Гарантує безкоштовні аналізи, ЕКГ, швидкі тести та базові консультації.</span>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <span className="badge bg-primary me-2 rounded-3 mt-1">2</span>
                <span><strong>Електронні направлення:</strong> Тільки ваш лікар може створити направлення до вузькопрофільних спеціалістів (ЛОР, кардіолог тощо).</span>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <span className="badge bg-primary me-2 rounded-3 mt-1">3</span>
                <span><strong>Лікарняні та довідки:</strong> Оформлення лікарняних листів та рецептів на ліки відбувається виключно через систему eHealth вашим лікарем.</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 p-4 bg-white border rounded-4 shadow-sm">
            <h6 className="fw-bold mb-3">Юридична основа:</h6>
            <p className="small text-muted mb-2">
              Процес оформлення регулюється <strong>Законом України "Про державні фінансові гарантії медичного обслуговування населення"</strong>.
            </p>
            <p className="small text-muted mb-0">
              Згідно з Порядком, затвердженим наказом <strong>МОЗ України №503</strong>, пацієнт має право самостійно обирати лікаря незалежно від місця реєстрації. Принцип «гроші ходять за пацієнтом» забезпечує фінансування саме того закладу, де ви отримуєте допомогу.
            </p>
          </div>
          <div className="card border-0 bg-primary-subtle p-4 mt-4 rounded-4 border-start border-primary border-4">
            <h6 className="fw-bold text-primary mb-2">Примітка щодо персональних даних:</h6>
            <p className="small mb-0 text-primary-emphasis">
              MedPortal обробляє дані згідно із <strong>Законом України "Про захист персональних даних"</strong>. Ваша інформація використовується виключно для формування офіційної заяви-декларації.
            </p>
          </div>
        </div>
        <div className="col-lg-7">
          <div className="card border-0 shadow-lg p-4 p-md-5 rounded-4">
            <div className="d-flex align-items-center mb-4">
              <div className="bg-primary text-white rounded-3 d-flex align-items-center justify-content-center me-3 fw-bold shadow-sm" style={{ width: '40px', height: '40px' }}>1</div>
              <h4 className="fw-bold m-0">Оберіть свого лікаря</h4>
            </div>
            <div className="mb-5">
              <label className="form-label small fw-bold text-uppercase text-muted ms-1">Список доступних спеціалістів громади:</label>
              <select 
                className="form-select form-select-lg border-2" 
                value={selectedDoctorId} 
                onChange={(e) => setSelectedDoctorId(e.target.value)}
                style={{ borderRadius: '12px', fontSize: '1rem' }}
              >
                <option value="">-- Натисніть для вибору --</option>
                {doctors.map(doc => (
                  <option key={doc.id} value={doc.id}>
                    {doc.full_name} ({doc.specialization})
                  </option>
                ))}
              </select>
            </div>
            <div className="d-flex align-items-center mb-4">
              <div className="bg-primary text-white rounded-3 d-flex align-items-center justify-content-center me-3 fw-bold shadow-sm" style={{ width: '40px', height: '40px' }}>2</div>
              <h4 className="fw-bold m-0">Підтвердження даних</h4>
            </div>
            <div className="bg-light p-4 rounded-4 mb-5 border">
              <p className="small text-muted mb-3">
                Перед генерацією переконайтеся, що у вашому профілі вказані актуальні:
              </p>
              <div className="d-flex flex-wrap gap-2">
                <span className="badge bg-white text-dark border rounded-pill px-3 py-2 fw-normal">Паспортні дані</span>
                <span className="badge bg-white text-dark border rounded-pill px-3 py-2 fw-normal">ІПН</span>
                <span className="badge bg-white text-dark border rounded-pill px-3 py-2 fw-normal">Адреса проживання</span>
              </div>
            </div>
            <button 
              className="btn btn-primary btn-lg w-100 py-3 fw-bold shadow rounded-3 transition-all" 
              onClick={handleDownload}
              disabled={loading || !selectedDoctorId}
            >
              {loading ? (
                <><span className="spinner-border spinner-border-sm me-2"></span> Формування PDF...</>
              ) : (
                "Згенерувати офіційну декларацію"
              )}
            </button>
            <div className="alert alert-warning mt-4 rounded-4 border-0 small">
              <i className="fas fa-info-circle me-2"></i>
              Після завантаження PDF-файлу, роздрукуйте його у <strong>двох примірниках</strong> та візьміть із собою на перший прийом для остаточного підтвердження в системі.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DeclarationInfo;