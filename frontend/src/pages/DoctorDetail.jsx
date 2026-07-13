import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import iconProfile from '../assets/icons/profile_black.png';
import iconPlace from '../assets/icons/place_black.png';

function DoctorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  const cardIconStyle = {
    width: '20px',
    height: '20px',
    objectFit: 'contain'
  };

  useEffect(() => {
    // Відновлено запит даних лікаря
    axios.get(`http://localhost:5000/api/doctors/${id}`)
      .then(res => {
        setDoctor(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Помилка:", err);
        setLoading(false);
      });

    // Відновлено запит відгуків
    axios.get(`http://localhost:5000/api/reviews/${id}`)
      .then(res => setReviews(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.error("Відгуки не знайдено"));
  }, [id]);

  useEffect(() => {
    if (selectedDate) {
      // Відновлено запит вільних слотів часу
      axios.get(`http://localhost:5000/api/appointments/slots?doctor_id=${id}&date=${selectedDate}`)
        .then(res => {
          setAvailableSlots(res.data);
          setSelectedSlot(null);
        })
        .catch(err => console.error("Помилка завантаження слотів:", err));
    }
  }, [selectedDate, id]);

  const handleBooking = async () => {
    if (!user) { alert("Будь ласка, увійдіть у систему."); return; }
    if (!selectedSlot) { alert("Оберіть час."); return; }
    try {
      const appointmentDateTime = `${selectedDate} ${selectedSlot}:00`;
      const response = await axios.post('http://localhost:5000/api/appointments', {
        doctor_id: id,
        appointment_date: appointmentDateTime
      }, { headers: { 'user-id': user.id } });
      alert(response.data.message);
      setAvailableSlots(prev => prev.filter(slot => slot !== selectedSlot));
      setSelectedSlot(null);
    } catch (err) {
      alert(err.response?.data?.message || "Помилка при записі.");
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) { alert("Увійдіть, щоб залишити відгук"); return; }
    try {
      const res = await axios.post('http://localhost:5000/api/reviews', {
        doctor_id: parseInt(id),
        rating: newRating,
        comment: newComment 
      }, { 
        headers: { 'user-id': user.id } 
      });
      setReviews([res.data, ...reviews]);
      setNewComment('');
      setNewRating(5);
      alert("Дякуємо за ваш відгук!");
    } catch (err) {
      console.error(err);
      alert("Помилка при додаванні відгуку.");
    }
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : "0";

  if (loading) return <div className="text-center mt-5 py-5"><div className="spinner-border text-primary"></div></div>;
  if (!doctor) return <div className="container mt-5 text-center"><h3>Лікаря не знайдено</h3></div>;

  return (
    <div className="container mt-5 mb-5 animate__animated animate__fadeIn">
      <button className="btn btn-link text-decoration-none mb-4 p-0 fw-bold" onClick={() => navigate(-1)}>
        ← Назад
      </button>
      <div className="row g-5">
        <div className="col-md-4 text-center">
          <img 
            src={doctor.photo_url || iconProfile} 
            className="img-fluid rounded-4 shadow-sm mb-4" 
            alt={doctor.full_name}
            style={{ width: '100%', maxWidth: '300px', height: '400px', objectFit: 'cover', border: '1px solid #eee' }}
            onError={(e) => { e.target.src = iconProfile; e.target.style.opacity = '0.3'; }}
          />
        </div>
        <div className="col-md-8">
          <h1 className="fw-bold display-5">{doctor.full_name}</h1>
          <h4 className="text-primary mb-2 fw-medium">{doctor.specialization}</h4>
          {doctor.clinic_name && (
            <div className="mb-4 d-flex align-items-center text-muted">
              <img src={iconPlace} alt="Адреса" style={cardIconStyle} />
              <span>
                <span className="fw-bold">{doctor.clinic_name}</span>, {doctor.clinic_address}
              </span>
            </div>
          )}
          <div className="d-flex mb-5">
            <div className="me-5">
              <span className="text-muted d-block small text-uppercase fw-bold">Досвід роботи</span>
              <strong className="fs-4">{doctor.experience_years} років</strong>
            </div>
            <div>
              <span className="text-muted d-block small text-uppercase fw-bold">Рейтинг</span>
              <strong className="fs-4 text-warning">
                ⭐ {averageRating} <span className="text-muted fs-6 fw-normal">({reviews.length} відгуків)</span>
              </strong>
            </div>
          </div>
          <h5 className="fw-bold mb-3 border-start border-primary border-4 ps-2">Про лікаря</h5>
          <p className="text-muted mb-5" style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
            {doctor.bio || "Спеціаліст вищої категорії, прихильник доказової медицини."}
          </p>
          <div className="card border-0 bg-white shadow-sm p-4 rounded-4 mb-5 border-top border-primary border-4">
            <h5 className="fw-bold mb-4 text-center">Записатися на зручний час</h5>
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="mb-4">
                  <label className="form-label small fw-bold text-muted">1. ОБЕРІТЬ ДАТУ ПРИЙОМУ</label>
                  <input 
                    type="date" 
                    className="form-control form-control-lg rounded-3 border-light shadow-sm bg-light" 
                    min={new Date().toISOString().split('T')[0]} 
                    value={selectedDate} 
                    onChange={(e) => setSelectedDate(e.target.value)} 
                  />
                </div>
                {selectedDate && (
                  <div className="mb-4 text-center">
                    <label className="form-label small fw-bold text-muted d-block mb-3">2. ОБЕРІТЬ ДОСТУПНИЙ СЛОТ</label>
                    <div className="d-flex flex-wrap justify-content-center gap-2 mt-1">
                      {availableSlots.length > 0 ? (
                        availableSlots.map(slot => (
                          <button key={slot} type="button" className={`btn rounded-3 px-3 py-2 fw-bold transition-all ${selectedSlot === slot ? 'btn-primary shadow' : 'btn-outline-primary'}`} onClick={() => setSelectedSlot(slot)}>
                            {slot}
                          </button>
                        ))
                      ) : (
                        <div className="alert alert-warning py-2 w-100 rounded-3 small">На жаль, на цю дату вільних місць немає.</div>
                      )}
                    </div>
                  </div>
                )}
                <button className="btn btn-primary btn-lg w-100 py-3 rounded-3 fw-bold shadow mt-2" onClick={handleBooking} disabled={!selectedSlot}>
                  Підтвердити запис на {selectedSlot || '...'}
                </button>
              </div>
            </div>
          </div>
          <div className="mt-5 pt-4">
            <h4 className="fw-bold mb-4">Відгуки пацієнтів</h4>
            {user && (
              <div className="card border-0 shadow-sm p-4 rounded-4 bg-light mb-5">
                <h6 className="fw-bold mb-3">Залишити свій відгук</h6>
                <form onSubmit={handleSubmitReview}>
                  <div className="mb-3">
                    <label className="small fw-bold text-muted d-block mb-2">ВАША ОЦІНКА:</label>
                    <div className="d-flex gap-2">
                      {[1, 2, 3, 4, 5].map(num => (
                        <button key={num} type="button" className={`btn btn-sm rounded-3 ${newRating >= num ? 'btn-warning text-white' : 'btn-outline-secondary opacity-50'}`} onClick={() => setNewRating(num)}>
                          ⭐
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-3">
                    <textarea 
                      className="form-control border-0 rounded-3 shadow-sm p-3" 
                      rows="3" 
                      placeholder="Напишіть коментар (необов'язково)..." 
                      value={newComment} 
                      onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary rounded-3 px-4 fw-bold">Надіслати відгук</button>
                </form>
              </div>
            )}
            <div className="reviews-list">
              {reviews.length > 0 ? (
                reviews.map((rev, index) => (
                  <div key={rev.id || index} className="card border-0 shadow-sm rounded-4 p-4 mb-3 bg-white">
                    <div className="d-flex align-items-center mb-3">
                      <img src={iconProfile} alt="User" className="me-3 opacity-50" style={{ width: '40px' }} />
                      <div>
                        <h6 className="mb-0 fw-bold">{rev.user_name || "Пацієнт"}</h6>
                        <small className="text-muted">{new Date(rev.created_at || Date.now()).toLocaleDateString('uk-UA')}</small>
                      </div>
                      <div className="ms-auto">
                        {"⭐".repeat(rev.rating)}
                      </div>
                    </div>
                    {rev.comment && <p className="text-muted mb-0 fst-italic">"{rev.comment}"</p>}
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted border rounded-4 border-dashed">
                  Бутьте першим, хто залишить відгук!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDetail;