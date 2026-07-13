import React from 'react';
import { Link } from 'react-router-dom';
import iconPhone from '../assets/icons/phone_white.png';
import iconMarkerWhite from '../assets/icons/place_white.png';
import iconChatWhite from '../assets/icons/email.webp';
function Footer() {
  const currentYear = new Date().getFullYear();
  const contactIconStyle = {
    width: '20px',
    height: '20px',
    objectFit: 'contain',
    marginRight: '10px'
  };
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-auto">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold mb-4 text-primary">MedPortal</h5>
            <p className="text-white-50 small">
              Цифрова платформа для медичних послуг громади. 
              Ми робимо медицину доступною, прозорою та сучасною.
            </p>
          </div>
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold mb-4 text-white">Навігація</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/" className="text-white-50 text-decoration-none hover-white">Головна</Link></li>
              <li className="mb-2"><Link to="/doctors" className="text-white-50 text-decoration-none hover-white">Лікарі</Link></li>
              <li className="mb-2"><Link to="/news" className="text-white-50 text-decoration-none hover-white">Новини</Link></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-4 text-white">Допомога</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <Link to="/faq" className="text-white-50 text-decoration-none hover-white">
                  Часті запитання (FAQ)
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-4 text-white">Контакти</h6>
            <ul className="list-unstyled small text-white-50">
              <li className="mb-3 d-flex align-items-start">
                <img src={iconPhone} alt="Телефон" style={contactIconStyle} className="mt-1" />
                <div>
                    <span className="d-block text-white fw-bold">Гаряча лінія:</span>
                    <a href="tel:0800123456" className="text-white-50 text-decoration-none">0 800 123 456</a>
                </div>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <img src={iconChatWhite} alt="Email" style={contactIconStyle} className="mt-1" />
                <div>
                    <span className="d-block text-white fw-bold">E-mail:</span>
                    <a href="mailto:support@medportal.ua" className="text-white-50 text-decoration-none hover-white">
                      support@medportal.ua
                    </a>
                </div>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <img src={iconMarkerWhite} alt="Адреса" style={contactIconStyle} className="mt-1" />
                <div>
                    <span className="d-block text-white fw-bold">Адреса:</span>
                    вул. Сумська, 25, Харків
                </div>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-4 border-secondary" />
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <span className="small text-white-50">
              © {currentYear} MedPortal. Всі права захищені.
            </span>
          </div>
          <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <span className="badge border border-light text-white fw-normal opacity-75">v1.0.0-dev</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;