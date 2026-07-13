import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import doctorImg from '../assets/images/happy-doctor.jpg';
import iconDoctor from '../assets/icons/doctor.png';
import iconDocs from '../assets/icons/documents.png';
import iconHospital from '../assets/icons/hospital_black.png';
import iconCalendar from '../assets/icons/calendar.png';
function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get('http://localhost:5000/api/news')
      .then(res => {
        const latestNews = Array.isArray(res.data) ? res.data.slice(0, 3) : [];
        setNews(latestNews);
        setLoading(false);
      })
      .catch(err => {
        console.error("Помилка завантаження новин:", err);
        setLoading(false);
      });
  }, []);
  const cardIconStyle = {
    width: '60px',
    height: '60px',
    objectFit: 'contain'
  };
  const cardIconStyleSmall = {
    width: '20px',
    height: '20px',
    objectFit: 'contain'
  };
  if (loading) {
    return (
      <div className="text-center mt-5 py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Завантаження...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="animate__animated animate__fadeIn pb-5">
      <div className="p-5 mb-5 rounded-4 shadow-sm position-relative overflow-hidden" 
           style={{ 
             background: 'linear-gradient(rgba(0, 40, 120, 0.75), rgba(0, 123, 255, 0.45)), url("https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200")',
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             color: 'white',
             minHeight: '480px',
             display: 'flex',
             alignItems: 'center'
           }}>
        <div className="container py-5">
          <h1 className="display-4 fw-bold mb-3">Ваше здоров'я – <br />наш пріоритет</h1>
          <p className="col-md-7 fs-5 mb-4 opacity-90">
            Сучасна платформа для запису до лікарів та управління медичними послугами. 
            Ми об'єднуємо технології та турботу, щоб зробити медицину доступною для кожного.
          </p>
          <div className="d-flex gap-3">
            <Link to="/register" className="btn btn-light btn-lg px-4 rounded-3 fw-bold text-primary shadow">Почати роботу</Link>
            <Link to="/about" className="btn btn-outline-light btn-lg px-4 rounded-3 fw-bold">Про нас</Link>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row g-4 mb-5" style={{ marginTop: '-100px', position: 'relative', zIndex: 10 }}>
          <div className="col-md-4">
            <div className="card border-0 shadow-lg h-100 p-4 text-center rounded-4 border-bottom border-primary border-5 transition-hover">
              <div className="mb-3 d-flex justify-content-center">
                <img src={iconDoctor} alt="Лікарі" style={cardIconStyle} />
              </div>
              <h5 className="fw-bold">Лікарі</h5>
              <p className="text-muted small flex-grow-1">Швидкий пошук спеціалістів за фахом та відгуками пацієнтів.</p>
              <Link to="/doctors" className="btn btn-link text-decoration-none fw-bold mt-2">Знайти лікаря →</Link>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-lg h-100 p-4 text-center rounded-4 border-bottom border-info border-5 transition-hover">
              <div className="mb-3 d-flex justify-content-center">
                <img src={iconHospital} alt="Заклади" style={cardIconStyle} />
              </div>
              <h5 className="fw-bold">Заклади</h5>
              <p className="text-muted small flex-grow-1">Інтерактивна карта медичних установ та амбулаторій вашого міста.</p>
              <Link to="/clinics" className="btn btn-link text-decoration-none fw-bold text-info mt-2">Дивитись заклади →</Link>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-lg h-100 p-4 text-center rounded-4 border-bottom border-success border-5 transition-hover">
              <div className="mb-3 d-flex justify-content-center">
                <img src={iconDocs} alt="Декларації" style={cardIconStyle} />
              </div>
              <h5 className="fw-bold">Декларації</h5>
              <p className="text-muted small flex-grow-1">Покрокова інструкція та онлайн-підтримка для підписання декларацій.</p>
              <Link to="/declaration-info" className="btn btn-link text-decoration-none fw-bold text-success mt-2">Детальніше →</Link>
            </div>
          </div>
        </div>
        <div className="row align-items-center mb-5 py-5">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h2 className="fw-bold mb-4">Цифровізація медицини для кожного громадянина</h2>
            <p className="text-muted mb-3">
              Наша місія – трансформувати складні бюрократичні процеси у зручний цифровий формат. 
              Завдяки MedPortal, кожна громада отримує сучасний інструмент для взаємодії з медичною системою, 
              що дозволяє економити час та отримувати допомогу вчасно.
            </p>
            <p className="text-muted mb-4">
              Ми постійно вдосконалюємо функціонал, впроваджуючи передові стандарти захисту даних.
            </p>
            <div className="d-flex align-items-start mb-3">
              <div className="bg-primary-subtle text-primary p-2 rounded-3 me-3">✔️</div>
              <p className="mb-0"><strong>Безкоштовний онлайн-запис</strong> у будь-який час доби без дзвінків до реєстратури.</p>
            </div>
            <div className="d-flex align-items-start mb-3">
              <div className="bg-primary-subtle text-primary p-2 rounded-3 me-3">✔️</div>
              <p className="mb-0"><strong>Тільки перевірені заклади</strong> та актуальна інформація про графіки лікарів.</p>
            </div>
            <div className="d-flex align-items-start">
              <div className="bg-primary-subtle text-primary p-2 rounded-3 me-3">✔️</div>
              <p className="mb-0"><strong>Прозора система відгуків</strong>, що допомагає обрати найкращого спеціаліста.</p>
            </div>
          </div>
          <div className="col-lg-6 text-center">
            <img 
              src={doctorImg} 
              alt="Щасливий лікар" 
              className="img-fluid rounded-4 shadow-lg"
              style={{ 
                maxHeight: '480px', 
                width: '100%', 
                objectFit: 'cover' 
              }}
            />
          </div>
        </div>
        <div className="row g-4 mb-5 text-center bg-light py-5 rounded-4 shadow-sm">
          <div className="col-md-3">
            <h3 className="fw-bold text-primary mb-1">150+</h3>
            <p className="text-muted small mb-0">Кваліфікованих лікарів</p>
          </div>
          <div className="col-md-3">
            <h3 className="fw-bold text-primary mb-1">45</h3>
            <p className="text-muted small mb-0">Медичних закладів</p>
          </div>
          <div className="col-md-3">
            <h3 className="fw-bold text-primary mb-1">10,000+</h3>
            <p className="text-muted small mb-0">Задоволених пацієнтів</p>
          </div>
          <div className="col-md-3">
            <h3 className="fw-bold text-primary mb-1">24/7</h3>
            <p className="text-muted small mb-0">Доступ до сервісу</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end mb-4 pt-4">
          <div>
            <h2 className="fw-bold mb-1">Останні новини</h2>
            <p className="text-muted small mb-0">Стежте за актуальними оновленнями та корисними порадами</p>
          </div>
          <Link to="/news" className="btn btn-outline-primary btn-sm rounded-3 px-3 fw-bold">Всі новини</Link>
        </div>
        {news.length === 0 ? (
          <div className="alert alert-light border text-center py-5 rounded-4 shadow-sm">
            <p className="mb-0 text-muted">Новин поки що немає. Завітайте пізніше!</p>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
            {news.map((item) => (
              <div className="col" key={item.id}>
                <div className="card h-100 shadow-sm border-0 overflow-hidden rounded-4 transition-hover">
                  <div className="position-relative">
                    <img 
                      src={item.image_url || 'https://via.placeholder.com/400x200?text=Medical+News'} 
                      className="card-img-top" 
                      alt={item.title}
                      style={{ height: '220px', objectFit: 'cover' }}
                    />
                    <span className="position-absolute bottom-0 start-0 m-3 badge bg-primary rounded-3">
                      {item.category}
                    </span>
                  </div>
                  <div className="card-body p-4">
                    <h5 className="card-title fw-bold" style={{ fontSize: '1.1rem' }}>{item.title}</h5>
                    <p className="card-text text-muted small">
                      {item.content.length > 110 
                        ? item.content.substring(0, 110) + '...' 
                        : item.content}
                    </p>
                  </div>
                  <div className="card-footer bg-white border-0 px-4 pb-4 pt-0">
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted"> <img src={iconCalendar} alt="Календар" style={cardIconStyleSmall} /> {new Date(item.published_at).toLocaleDateString('uk-UA')}</small>
                      <Link to={`/news/${item.id}`} className="btn btn-sm btn-link p-0 text-decoration-none fw-bold">Читати далі →</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="card border-0 bg-primary text-white p-5 rounded-4 shadow-lg text-center mt-5 mb-4">
          <div className="py-3">
            <h2 className="fw-bold mb-3 h1">Бажаєте приєднатися?</h2>
            <p className="mb-4 opacity-75 fs-5">Створіть особистий кабінет для керування вашими записами</p>
            <div className="d-flex justify-content-center gap-3">
              <Link to="/register" className="btn btn-light btn-lg px-5 rounded-3 fw-bold text-primary">Реєстрація</Link>
              <Link to="/faq" className="btn btn-outline-light btn-lg px-4 rounded-3">Допомога</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;