import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import iconCalendar from '../assets/icons/calendar.png';
import telegram from '../assets/icons/telegram.png';
import viber from '../assets/icons/viber.png';
import facebook from '../assets/icons/facebppk.png';

function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/news/${id}`)
      .then(res => {
        setArticle(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Помилка завантаження новини:", err);
        setLoading(false);
      });
  }, [id]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="text-center mt-5 py-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mt-5 text-center">
        <h3>Новину не знайдено</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/news')}>Назад</button>
      </div>
    );
  }

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(article.title);

  const squareIconBtn = {
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
    transition: 'transform 0.2s, opacity 0.2s',
    border: 'none'
  };

  const iconImgStyle = {
    width: '22px',
    height: '22px',
    borderRadius: '4px',
    objectFit: 'contain'
  };

  const cardIconStyleSmall = {
    width: '25px',
    height: '25px',
    objectFit: 'contain'
  };

  return (
    <div className="container mt-5 mb-5 animate__animated animate__fadeIn">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <button className="btn btn-link text-decoration-none p-0 mb-4 fw-bold" onClick={() => navigate('/news')}>
            ← Всі новини
          </button>
          
          <img 
            src={article.image_url || 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1200'} 
            className="img-fluid rounded-4 shadow-sm mb-4 w-100" 
            alt={article.title}
            style={{ maxHeight: '450px', objectFit: 'cover' }}
          />
          
          <div className="d-flex align-items-center mb-3">
            <span className="badge bg-primary px-3 py-2 rounded-3 me-3">{article.category}</span>
            <small className="text-muted fw-medium">
              <img src={iconCalendar} alt="Календар" style={cardIconStyleSmall} /> {new Date(article.published_at).toLocaleDateString('uk-UA')}
            </small>
          </div>
          
          <h1 className="fw-bold mb-4 display-5">{article.title}</h1>
          
          <div className="news-content text-muted lead mb-5" style={{ whiteSpace: 'pre-line', lineHeight: '1.8' }}>
            {article.content}
          </div>
          
          <hr className="my-5" />
          
          <div className="bg-light p-4 rounded-4 border-start border-primary border-4 shadow-sm">
            <div className="row align-items-center">
              <div className="col-md-6 mb-3 mb-md-0">
                <h5 className="fw-bold mb-1">Поділитися новиною</h5>
                <p className="small text-muted mb-0">Оберіть месенджер для надсилання:</p>
              </div>
              <div className="col-md-6 d-flex gap-2 justify-content-md-end align-items-center">
                <a 
                  href={`https://t.me/share/url?url=${shareUrl}&text=${shareTitle}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={squareIconBtn}
                  className="hover-shrink"
                >
                  <img src={telegram} alt="Telegram" style={iconImgStyle} />
                </a>
                
                <a 
                  href={`viber://forward?text=${shareTitle}%20${shareUrl}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={squareIconBtn}
                  className="hover-shrink"
                >
                  <img src={viber} alt="Viber" style={iconImgStyle} />
                </a>
                
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={squareIconBtn}
                  className="hover-shrink"
                >
                  <img src={facebook} alt="FB" style={iconImgStyle} />
                </a>
                
                <button 
                  onClick={copyToClipboard}
                  className={`btn ${copied ? 'btn-success' : 'btn-dark'} rounded-3 ms-2 fw-bold`}
                  style={{ height: '44px', fontSize: '0.85rem' }}
                >
                  {copied ? '✓' : 'Копіювати'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsDetail;