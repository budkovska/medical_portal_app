import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import iconSearch from '../assets/icons/search.png';
import iconHospital from '../assets/icons/hospital_white.png';
function Clinics() {
  const [clinics, setClinics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get('http://localhost:5000/api/clinics')
      .then(res => {
        setClinics(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  const filteredClinics = clinics.filter(clinic =>
    clinic.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (loading) {
    return (
      <div className="text-center mt-5 py-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }
  return (
    <div className="container mt-4 mb-5">
      <div className="row align-items-center mb-5">
        <div className="col-lg-7">
          <h2 className="fw-bold border-start border-primary border-5 ps-3 display-6">Медичні заклади Харкова</h2>
          <p className="text-muted mb-lg-0">Знайдіть найближчу клініку або спеціалізований медичний центр</p>
        </div>
        <div className="col-lg-5">
          <div className="input-group shadow-sm border rounded-3 overflow-hidden bg-white">
            <span className="input-group-text bg-white border-0 ps-3">
              <img src={iconSearch} alt="Search" style={{ width: '18px', height: '18px', opacity: 0.5 }} />
            </span>
            <input 
              type="text" 
              className="form-control border-0 shadow-none py-2" 
              placeholder="Пошук за назвою закладу..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      {filteredClinics.length === 0 ? (
        <div className="text-center py-5 bg-light rounded-4 border border-dashed">
          <p className="text-muted mb-0">За вашим запитом жодного закладу не знайдено.</p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredClinics.map(clinic => (
            <div className="col-md-6 col-lg-4" key={clinic.id}>
              <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden transition-hover">
                <div className="position-relative" style={{ height: '220px', backgroundColor: '#f8f9fa' }}>
                  <img 
                    src={clinic.image_url}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = iconHospital;
                      e.target.style.width = '80px';
                      e.target.style.height = '80px';
                      e.target.style.objectFit = 'contain';
                      e.target.parentElement.classList.add('d-flex', 'align-items-center', 'justify-content-center');
                    }}
                    className="card-img-top w-100 h-100" 
                    alt={clinic.name} 
                    style={{ objectFit: 'cover' }} 
                  />
                </div>
                <div className="card-body p-4">
                  <h5 className="card-title fw-bold mb-2">{clinic.name}</h5>
                  <p className="text-primary small mb-3 fw-medium">
                    <img src="../assets/icons/place_black.png" alt="" style={{ width: '14px', marginRight: '5px', opacity: 0.6 }} />
                    {clinic.address}
                  </p>
                  <p className="card-text text-muted small mb-4" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {clinic.description}
                  </p>
                  <div className="mb-4">
                    <div className="d-flex flex-wrap gap-1">
                      <span className="badge bg-light text-primary border rounded-3 px-2 py-1">
                        {clinic.directions || 'Загальна медицина'}
                      </span>
                    </div>
                  </div>
                  <Link to={`/clinics/${clinic.id}`} className="btn btn-outline-primary w-100 rounded-3 fw-bold py-2">
                    Детальніше
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Clinics;