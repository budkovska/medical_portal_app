import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import iconPlace from '../assets/icons/place_black.png';

function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    birth_date: ''
  });

  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const cardIconStyle = {
    width: '12px',
    height: '12px',
    objectFit: 'contain'
  };

  useEffect(() => {
    if (!user) { 
      navigate('/login'); 
      return; 
    }
    fetchUserData();
    fetchAppointments();
  }, []);

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/auth/users/${user.id}`);
      setUserData(res.data);
      setFormData({
        full_name: res.data.full_name,
        email: res.data.email,
        phone: res.data.phone || '',
        birth_date: res.data.birth_date ? res.data.birth_date.split('T')[0] : ''
      });
    } catch (err) { 
      console.error(err); 
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/auth/users/${user.id}`, formData);
      setIsEditing(false);
      fetchUserData();
      const updatedUser = { ...user, full_name: formData.full_name };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      alert("Дані успішно збережено!");
    } catch (err) {
      alert("Помилка при оновленні профілю");
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/appointments/my`, {
        headers: { 'user-id': user.id }
      });
      setAppointments(res.data);
      setLoading(false);
    } catch (err) { 
      setLoading(false); 
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm("Ви впевнені?")) {
      try {
        await axios.put(`http://localhost:5000/api/appointments/${id}/cancel`, {}, {
          headers: { 'user-id': user.id }
        });
        fetchAppointments();
      } catch (err) { 
        alert("Помилка при скасуванні запису"); 
      }
    }
  };

  if (loading || !userData) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  const isDoctor = user.role === 'doctor';
  const activeAppointments = appointments.filter(app => app.status === 'Pending');
  const historyAppointments = appointments.filter(app => app.status !== 'Pending');

  const AppointmentTable = ({ title, list, showCancel }) => (
    <div className="card border-0 shadow-sm p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold m-0 text-uppercase small ls-wide">{title}</h5>
        {list.length > 0 && (
          <Link to="/all-appointments" className="text-primary small text-decoration-none fw-bold">
            Переглянути всі
          </Link>
        )}
      </div>
      <div className="table-responsive">
        <table className="table align-middle m-0">
          <tbody>
            {list.length > 0 ? (
              list.slice(0, 3).map((app) => (
                <tr key={app.id}>
                  <td style={{ width: '120px' }}>
                    <div className="fw-bold text-primary">
                      {new Date(app.appointment_date).toLocaleDateString('uk-UA', { day: '2-digit', month: 'short' })}
                    </div>
                    <div className="small text-muted">
                      {new Date(app.appointment_date).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td>
                    <div className="fw-bold">{isDoctor ? app.patient_name : app.doctor_name}</div>
                    {!isDoctor && (
                      <>
                        <div className="small text-muted mb-1">{app.specialization}</div>
                        <div className="small text-muted" style={{ fontSize: '0.8rem' }}>
                          <img src={iconPlace} alt="Адреса" style={cardIconStyle} /> {app.clinic_name}, {app.clinic_address}
                        </div>
                      </>
                    )}
                  </td>
                  <td>
                    <span className={`badge border-0 ${
                      app.status === 'Pending' ? 'bg-warning-subtle text-warning-emphasis' : 
                      app.status === 'Completed' ? 'bg-success-subtle text-success-emphasis' : 
                      'bg-danger-subtle text-danger-emphasis'
                    }`}>
                      {app.status === 'Pending' && 'Очікується'}
                      {app.status === 'Completed' && 'Завершено'}
                      {app.status === 'Cancelled' && 'Скасовано'}
                    </span>
                  </td>
                  <td className="text-end">
                    {showCancel && app.status === 'Pending' && (
                      <button className="btn btn-sm text-danger fw-bold" onClick={() => handleCancel(app.id)}>
                        Скасувати
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  <p className="text-muted mb-0 small">Записи відсутні</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="container mt-5 mb-5 animate__animated animate__fadeIn">
      <div className="row">
        <div className="col-lg-4 mb-4">
          <div className="card border-0 shadow-sm p-4 sticky-top" style={{ top: '20px' }}>
            <h5 className="fw-bold mb-4 border-start border-primary border-4 ps-2">Особисті дані</h5>
            {!isEditing ? (
              <>
                <div className="mb-3">
                  <label className="text-muted small d-block mb-1">ПІБ</label>
                  <span className="fw-bold fs-5">{userData.full_name}</span>
                </div>
                <div className="mb-3">
                  <label className="text-muted small d-block mb-1">Електронна пошта</label>
                  <span className="fw-medium">{userData.email}</span>
                </div>
                <div className="mb-3">
                  <label className="text-muted small d-block mb-1">Номер телефону</label>
                  <span className="fw-medium">{userData.phone || 'Не вказано'}</span>
                </div>
                <div className="mb-4">
                  <label className="text-muted small d-block mb-1">Дата народження</label>
                  <span className="fw-medium">
                    {userData.birth_date ? new Date(userData.birth_date).toLocaleDateString('uk-UA') : '—'}
                  </span>
                </div>
                <button className="btn btn-primary btn-sm w-100 mb-2 py-2 fw-bold" onClick={() => setIsEditing(true)}>
                  Редагувати профіль
                </button>
              </>
            ) : (
              <form onSubmit={handleUpdateProfile}>
                <div className="mb-2">
                  <label className="small fw-bold text-muted">Повне ім'я</label>
                  <input type="text" className="form-control" value={formData.full_name} onChange={(e) => setFormData({...formData, full_name: e.target.value})} required />
                </div>
                <div className="mb-2">
                  <label className="small fw-bold text-muted">Email</label>
                  <input type="email" className="form-control" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                </div>
                <div className="mb-2">
                  <label className="small fw-bold text-muted">Телефон</label>
                  <input type="text" className="form-control" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+380..." />
                </div>
                <div className="mb-3">
                  <label className="small fw-bold text-muted">Дата народження</label>
                  <input type="date" className="form-control" value={formData.birth_date} onChange={(e) => setFormData({...formData, birth_date: e.target.value})} />
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-success btn-sm flex-grow-1 fw-bold">Зберегти</button>
                  <button type="button" className="btn btn-light btn-sm flex-grow-1" onClick={() => setIsEditing(false)}>Скасувати</button>
                </div>
              </form>
            )}
            <button className="btn btn-outline-danger btn-sm w-100 mt-4" onClick={() => { localStorage.removeItem('user'); navigate('/login'); }}>
              Вийти з аккаунту
            </button>
          </div>
        </div>
        <div className="col-lg-8">
          <AppointmentTable title={isDoctor ? "Мій розклад" : "Найближчі записи"} list={activeAppointments} showCancel={true} />
          <div className="mt-4">
            <AppointmentTable title="Історія візитів" list={historyAppointments} showCancel={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;