import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import mainLogo from '../assets/logo.png'; 
import iconProfile from '../assets/icons/profile_black.png';
import iconMarker from '../assets/icons/place_black.png';
function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [servicesOpen, setServicesOpen] = useState(false);
  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };
  const closeMenu = () => setServicesOpen(false);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <div className="d-flex align-items-center">
          <Link className="navbar-brand fw-bold text-primary d-flex align-items-center m-0" to="/" onClick={closeMenu}>
            <img src={mainLogo} alt="Logo" style={{ height: '35px', marginRight: '10px' }} />
            MedPortal
          </Link>
          <div className="ms-3 ps-3 border-start d-flex align-items-center text-muted small">
            <img src={iconMarker} alt="" style={{ width: '14px', marginRight: '5px', opacity: 0.75 }} />
            <span>Харків</span>
          </div>
        </div>
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto align-items-center ms-lg-3">
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/news" onClick={closeMenu}>Новини</Link>
            </li>
            <li 
              className="nav-item dropdown" 
              onMouseEnter={() => setServicesOpen(true)} 
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button 
                className={`nav-link dropdown-toggle border-0 bg-transparent fw-medium ${servicesOpen ? 'show' : ''}`}
                onClick={() => setServicesOpen(!servicesOpen)}
                style={{ cursor: 'pointer' }}
              >
                Послуги
              </button>
              <ul className={`dropdown-menu border-0 shadow-sm m-0 rounded-3 ${servicesOpen ? 'show' : ''}`}>
                <li>
                  <Link className="dropdown-item py-2" to="/doctors" onClick={closeMenu}>
                    Знайти лікаря
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item py-2" to="/clinics" onClick={closeMenu}>
                    Знайти заклад
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link className="dropdown-item py-2 fw-bold text-primary" to="/declaration-info" onClick={closeMenu}>
                    Декларації
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/about" onClick={closeMenu}>Про нас</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/faq" onClick={closeMenu}>FAQ</Link>
            </li>
          </ul>
          <div className="navbar-nav ms-auto align-items-center">
            {user ? (
              <div className="d-flex align-items-center">
                <Link className="nav-link fw-semibold me-3 text-dark d-flex align-items-center" to="/dashboard" onClick={closeMenu}>
                  <img src={iconProfile} alt="" style={{ width: '22px', height: '22px', marginRight: '8px' }} />
                  {user.full_name}
                </Link>
                <button className="btn btn-outline-danger btn-sm rounded-3 px-3 fw-medium" onClick={logout}>Вихід</button>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <Link className="nav-link me-3 fw-medium" to="/login" onClick={closeMenu}>Вхід</Link>
                <Link className="btn btn-primary btn-sm px-4 rounded-3 shadow-sm fw-medium" to="/register" onClick={closeMenu}>Реєстрація</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;