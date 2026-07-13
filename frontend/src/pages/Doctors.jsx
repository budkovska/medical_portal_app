import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import iconSearch from '../assets/icons/search.png';
function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSpecialization, setActiveSpecialization] = useState('Усі');
  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/users')
      .then(res => {
        const allUsers = Array.isArray(res.data) ? res.data : [];
        const docs = allUsers.filter(u => u.role?.toLowerCase() === 'doctor');
        setDoctors(docs);
        setLoading(false);
      })
      .catch(err => {
        console.error("Помилка завантаження лікарів:", err);
        setLoading(false);
      });
  }, []);
  const specializations = [
    'Усі', 
    ...new Set(doctors.map(d => d.specialization).filter(Boolean))
  ];
  const filteredDoctors = doctors.filter(doc => {
    const matchesCategory = activeSpecialization === 'Усі' || doc.specialization === activeSpecialization;
    const matchesSearch = doc.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (doc.specialization && doc.specialization.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });
  return (
    <div className="container mt-5 mb-5 animate__animated animate__fadeIn">
      <div className="row mb-5">
        <div className="col-md-8 mx-auto text-center">
          <h2 className="fw-bold display-6">Наші спеціалісти</h2>
          <p className="text-muted">Професійна медична допомога від найкращих фахівців</p>
          <div className="input-group input-group-lg shadow-sm mt-4 border rounded-3 overflow-hidden bg-white">
            <span className="input-group-text bg-white border-0 ps-4">
              <img src={iconSearch} alt="Search" style={{ width: '20px', height: '20px', opacity: 0.6 }} />
            </span>
            <input 
              type="text" 
              className="form-control border-0 shadow-none py-3" 
              placeholder="Пошук лікаря за прізвищем або фахом..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 mb-4">
          <div className="card border-0 shadow-sm p-3 sticky-top rounded-4" style={{ top: '90px', zIndex: 10 }}>
            <h5 className="fw-bold mb-3 px-2">Напрямки</h5>
            <div className="list-group list-group-flush">
              {specializations.map((spec, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSpecialization(spec)}
                  className={`list-group-item list-group-item-action border-0 rounded-3 mb-1 fw-medium ${
                    activeSpecialization === spec ? 'bg-primary text-white active' : ''
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="col-lg-9">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-2 text-muted">Завантаження спеціалістів...</p>
            </div>
          ) : filteredDoctors.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {filteredDoctors.map(doc => (
                <div className="col" key={doc.id}>
                  <div className="card h-100 border-0 shadow-sm rounded-4 transition-hover">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center mb-4">
                        <img 
                          src={doc.photo_url || 'https://placehold.co/100x100?text=Doctor'} 
                          alt={doc.full_name} 
                          className="rounded-3 me-3 shadow-sm"
                          style={{ width: '80px', height: '80px', objectFit: 'cover', border: '1px solid #eee' }} 
                        />
                        <div>
                          <h5 className="mb-1 fw-bold">{doc.full_name}</h5>
                          <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-3 px-3">
                            {doc.specialization || 'Терапевт'}
                          </span>
                        </div>
                      </div>
                      <div className="pt-3 border-top">
                        <p className="small mb-2">
                          <span className="text-muted">Стаж:</span> <strong>{doc.experience_years || '5+'} років</strong>
                        </p>
                        <p className="card-text text-muted small line-clamp-2">
                          {doc.bio || 'Надає професійні консультації та використовує доказові методи лікування.'}
                        </p>
                      </div>
                    </div>
                    <div className="card-footer bg-transparent border-0 p-4 pt-0">
                      <Link 
                        to={`/doctors/${doc.id}`} 
                        className="btn btn-primary w-100 rounded-3 py-2 fw-bold"
                      >
                        Переглянути профіль
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5 bg-light rounded-4 border border-dashed">
              <h4 className="text-muted fw-bold">Нікого не знайдено</h4>
              <p className="text-muted mb-4">Спробуйте змінити запит або категорію лікаря.</p>
              <button 
                className="btn btn-primary rounded-3 px-4 fw-bold" 
                onClick={() => {setActiveSpecialization('Усі'); setSearchTerm('');}}
              >
                Скинути пошук
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Doctors;