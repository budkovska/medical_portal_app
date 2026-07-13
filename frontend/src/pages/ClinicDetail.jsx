import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import iconHospital from '../assets/icons/hospital_white.png';
import iconProfile from '../assets/icons/profile_white.png';
import iconPlace from '../assets/icons/place_black.png';
import iconHospitalBlack from '../assets/icons/hospital_black.png';
import iconPhone from '../assets/icons/phone_black.png';

function ClinicDetail() {
  const { id } = useParams();
  const [clinic, setClinic] = useState(null);
  const [loading, setLoading] = useState(true);

  const cardIconStyle = {
    width: '16px',
    height: '16px',
    objectFit: 'contain'
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/api/clinics/${id}`)
      .then(res => {
        setClinic(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="text-center mt-5 py-5">
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  );

  if (!clinic) return (
    <div className="container mt-5 text-center">
      <h3 className="fw-bold">Заклад не знайдено</h3>
      <Link to="/clinics" className="btn btn-primary mt-3 rounded-3">Повернутися до списку</Link>
    </div>
  );

  return (
    <div className="container mt-4 mb-5 animate__animated animate__fadeIn">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/clinics" className="text-decoration-none">Усі заклади</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{clinic.name}</li>
        </ol>
      </nav>
      
      <div className="row mt-4">
        <div className="col-lg-8">
          <div className="position-relative rounded-4 overflow-hidden shadow-sm mb-4" style={{ backgroundColor: '#f8f9fa', height: '450px' }}>
            <img 
              src={clinic.image_url} 
              className="w-100 h-100" 
              alt={clinic.name} 
              style={{ objectFit: 'cover' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = iconHospital;
                e.target.style.width = '120px';
                e.target.style.height = '120px';
                e.target.style.objectFit = 'contain';
                e.target.parentElement.classList.add('d-flex', 'align-items-center', 'justify-content-center');
              }}
            />
          </div>
          <h1 className="fw-bold mb-3 display-5">{clinic.name}</h1>
          <p className="lead text-muted" style={{ lineHeight: '1.7' }}>{clinic.description}</p>
          <hr className="my-5" />
          
          <h4 className="fw-bold mb-4 text-primary border-start border-primary border-4 ps-3">Наші спеціалісти</h4>
          <div className="row g-3">
            {clinic.doctors && clinic.doctors.length > 0 ? (
              clinic.doctors.map(doctor => (
                <div className="col-md-6" key={doctor.id}>
                  <div className="card h-100 border-0 shadow-sm p-3 rounded-4 transition-hover">
                    <div className="d-flex align-items-center">
                      <div className="me-3 rounded-3 overflow-hidden d-flex align-items-center justify-content-center bg-light" style={{ width: '85px', height: '85px', flexShrink: 0 }}>
                        <img 
                          src={doctor.photo_url} 
                          alt={doctor.full_name} 
                          className="w-100 h-100"
                          style={{ objectFit: 'cover' }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = iconProfile;
                            e.target.style.width = '40px';
                            e.target.style.height = '40px';
                            e.target.style.opacity = '0.3';
                            e.target.style.objectFit = 'contain';
                          }}
                        />
                      </div>
                      <div>
                        <h6 className="mb-1 fw-bold">{doctor.full_name}</h6>
                        <p className="text-primary small mb-2 fw-medium">{doctor.specialization}</p>
                        <Link to={`/doctors/${doctor.id}`} className="btn btn-sm btn-outline-primary rounded-3 px-3">
                          Про лікаря
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-4 bg-light rounded-4 border border-dashed">
                <p className="text-muted mb-0">Наразі список лікарів для цього закладу оновлюється.</p>
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4 sticky-top rounded-4" style={{ top: '90px', zIndex: 10 }}>
            <h5 className="fw-bold mb-4">Контактна інформація</h5>
            <div className="mb-3">
              <img src={iconPlace} alt="Адреса" style={cardIconStyle} />
              <label className="text-muted small fw-bold text-uppercase">&nbsp;&nbsp;Адреса</label>
              <p className="mb-0 fw-medium">{clinic.address}</p>
            </div>
            <div className="mb-3">
              <img src={iconPhone} alt="Контакти" style={cardIconStyle} />
              <label className="text-muted small fw-bold text-uppercase">&nbsp;&nbsp;Контакти</label>
              <p className="mb-0 fw-medium">{clinic.contacts}</p>
            </div>
            <div className="mb-4">
              <img src={iconHospitalBlack} alt="Напрямки" style={cardIconStyle} />
              <label className="text-muted small fw-bold text-uppercase">&nbsp;&nbsp;Напрямки</label>
              <p className="mb-0 fw-medium text-primary">{clinic.directions}</p>
            </div>
            <hr />
            <button className="btn btn-primary w-100 py-2 rounded-3 fw-bold shadow-sm">
              Зворотній зв'язок
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClinicDetail;