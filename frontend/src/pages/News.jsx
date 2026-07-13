import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import iconSearch from '../assets/icons/search.png';
import iconCalendar from '../assets/icons/calendar.png'
function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Усі');
  const [searchTerm, setSearchTerm] = useState('');
  const cardIconStyleSmall = {
    width: '25px',
    height: '25px',
    objectFit: 'contain'
  };
  useEffect(() => {
    axios.get('http://localhost:5000/api/news')
      .then(res => {
        setNews(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Помилка завантаження новин:", err);
        setLoading(false);
      });
  }, []);
  const categories = ['Усі', ...new Set(news.map(item => item.category).filter(Boolean))];
  const filteredNews = news.filter(item => {
    const matchesCategory = activeCategory === 'Усі' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  if (loading) {
    return (
      <div className="text-center mt-5 py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2 text-muted">Завантаження новин...</p>
      </div>
    );
  }
  return (
    <div className="container mt-5 mb-5 animate__animated animate__fadeIn">
      <div className="row align-items-end mb-5">
        <div className="col-lg-7">
          <h1 className="fw-bold border-start border-primary border-5 ps-3 display-5">Новини</h1>
          <p className="text-muted mb-lg-0">Актуальна інформація, поради лікарів та події громади</p>
        </div>
        <div className="col-lg-5">
          <div className="input-group shadow-sm border rounded-3 overflow-hidden bg-white">
            <span className="input-group-text bg-white border-0 ps-3">
              <img src={iconSearch} alt="Search" style={{ width: '18px', height: '18px', opacity: 0.5 }} />
            </span>
            <input 
              type="text" 
              className="form-control border-0 shadow-none py-2" 
              placeholder="Пошук новин за назвою..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 mb-4">
          <div className="card border-0 shadow-sm p-3 sticky-top rounded-4" style={{ top: '90px', zIndex: 10 }}>
            <h5 className="fw-bold mb-3 px-2">Категорії</h5>
            <div className="list-group list-group-flush">
              {categories.map((cat, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCategory(cat)}
                  className={`list-group-item list-group-item-action border-0 rounded-3 mb-1 fw-medium ${
                    activeCategory === cat ? 'bg-primary text-white active' : ''
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="col-lg-9">
          {filteredNews.length === 0 ? (
            <div className="text-center py-5 bg-light rounded-4 border border-dashed">
              <h4 className="text-muted fw-bold">Новин не знайдено</h4>
              <p className="text-muted">Спробуйте змінити запит або обрати іншу категорію.</p>
              <button 
                className="btn btn-outline-primary btn-sm rounded-3 mt-2" 
                onClick={() => {setActiveCategory('Усі'); setSearchTerm('');}}
              >
                Скинути всі фільтри
              </button>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {filteredNews.map((item) => (
                <div className="col" key={item.id}>
                  <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden transition-hover">
                    <div className="position-relative">
                      <img 
                        src={item.image_url || 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800'} 
                        className="card-img-top" 
                        alt={item.title}
                        style={{ height: '220px', objectFit: 'cover' }}
                      />
                      <span className="position-absolute top-0 end-0 m-3 badge bg-primary py-2 px-3 rounded-3 shadow-sm">
                        {item.category}
                      </span>
                    </div>
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center mb-2">
                        <small className="text-muted fw-medium">
                          <img src={iconCalendar} alt="Календар" style={cardIconStyleSmall} />
                          {new Date(item.published_at).toLocaleDateString('uk-UA')}
                        </small>
                      </div>
                      <h5 className="card-title fw-bold mb-3 text-dark">{item.title}</h5>
                      <p className="card-text text-muted small mb-0">
                        {item.content.length > 130 
                          ? item.content.substring(0, 130) + '...' 
                          : item.content}
                      </p>
                    </div>
                    <div className="card-footer bg-transparent border-0 p-4 pt-0">
                      <Link to={`/news/${item.id}`} className="btn btn-link text-primary p-0 fw-bold text-decoration-none transition-link">
                        Читати далі <span className="ms-1">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default News;