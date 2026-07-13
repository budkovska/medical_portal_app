import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AllAppointments() {
  const [appointments, setAppointments] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchAll = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/appointments/my`, {
          headers: { 'user-id': user.id },
          params: { role: user.role }
        });
        setAppointments(res.data);
      } catch (err) {
        console.error("Помилка при завантаженні всіх записів:", err);
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="container mt-5">
      <button className="btn btn-link text-decoration-none p-0 mb-4" onClick={() => navigate(-1)}>
        ← Назад до кабінету
      </button>
      <h2 className="fw-bold mb-4">Усі ваші записи</h2>
      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover m-0">
            <thead className="table-light">
              <tr>
                <th>Дата</th>
                <th>{user?.role === 'doctor' ? 'Пацієнт' : 'Лікар'}</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map(app => (
                  <tr key={app.id}>
                    <td>{new Date(app.appointment_date).toLocaleString('uk-UA')}</td>
                    <td>{user?.role === 'doctor' ? app.patient_name : app.doctor_name}</td>
                    <td>
                      <span className={`badge border-0 ${
                        app.status === 'Pending' ? 'bg-warning-subtle text-warning-emphasis' : 
                        app.status === 'Completed' ? 'bg-success-subtle text-success-emphasis' : 
                        'bg-danger-subtle text-danger-emphasis'
                      }`}>
                        {app.status === 'Pending' && 'Очікується'}
                        {app.status === 'Completed' && 'Завершено'}
                        {app.status === 'Cancelled' && 'Скасовано'}
                        {!['Pending', 'Completed', 'Cancelled'].includes(app.status) && app.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-muted small">
                    Записів не знайдено
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllAppointments;