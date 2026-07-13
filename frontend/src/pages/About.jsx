import React from 'react';
import { Link } from 'react-router-dom';
import iconMission from '../assets/logo.png';
function About() {
  const stats = [
    { label: 'Активних лікарів', value: '150+' },
    { label: 'Медичних закладів', value: '45' },
    { label: 'Задоволених пацієнтів', value: '10,000+' },
    { label: 'Онлайн записів щодня', value: '500+' },
  ];
  return (
    <div className="container mt-5 mb-5 animate__animated animate__fadeIn">
      <div className="row align-items-center mb-5 py-4">
        <div className="col-lg-6">
          <h1 className="display-4 fw-bold text-primary mb-4">Ми робимо медицину доступною</h1>
          <p className="lead text-muted mb-4">
            <strong>MedPortal</strong> – це не просто сайт для запису, а масштабна цифрова екосистема, 
            створена для того, щоб кожен українець міг отримати якісну медичну допомогу без черг та паперової тяганини.
          </p>
          <p className="text-muted mb-4">
            Ми розуміємо, наскільки важливо знайти "свого" лікаря. Саме тому ми об'єднали кращі 
            приватні центри та державні амбулаторії в єдину мережу. Наша платформа дозволяє 
            порівнювати досвід фахівців, читати реальні відгуки та керувати своїм здоров'ям прямо зі смартфону.
          </p>
          <div className="d-flex gap-3">
            <Link to="/doctors" className="btn btn-primary btn-lg px-4 rounded-3 fw-bold shadow-sm">Знайти лікаря</Link>
            <Link to="/register" className="btn btn-outline-primary btn-lg px-4 rounded-3 fw-bold">Приєднатися</Link>
          </div>
        </div>
        <div className="col-lg-6 d-none d-lg-block">
          <div className="position-relative">
            <img 
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800" 
              alt="Medical team" 
              className="img-fluid rounded-4 shadow-lg"
            />
            <div className="position-absolute bottom-0 start-0 bg-white p-3 m-4 rounded-3 shadow-sm border-start border-primary border-4 d-none d-xl-block">
              <p className="small fw-bold mb-0">Працюємо з 2024 року</p>
              <p className="small text-muted mb-0">Трансформуємо медицину разом</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-4 mb-5">
        {stats.map((stat, index) => (
          <div className="col-md-3 col-6" key={index}>
            <div className="card border-0 bg-light p-4 text-center h-100 shadow-sm rounded-4 transition-hover">
              <h2 className="fw-bold text-primary mb-1">{stat.value}</h2>
              <p className="text-muted small mb-0">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="row my-5 py-5 bg-light rounded-4 px-4 align-items-center">
        <div className="col-md-5">
        </div>
        <div className="row my-5 py-5 bg-light rounded-4 px-4 align-items-center">
  <div className="col-md-5 text-center">
      <div className="bg-white p-5 rounded-4 shadow-sm d-inline-block">
          <img 
            src={iconMission} 
            className="img-fluid" 
            alt="MedPortal Mission" 
            style={{ maxWidth: '200px', height: 'auto' }}
          />
      </div>
  </div>
              <div className="col-md-7 ps-md-5">
                  <h2 className="fw-bold mb-4 text-dark">Наша місія та бачення</h2>
                  <p className="text-muted">
                      Ми віримо, що медицина має бути прозорою. Наша мета – подолати бюрократію в закладах охорони здоров'я. 
                      Завдяки MedPortal пацієнти отримують доступ до своєї медичної історії, можуть швидко 
                      підписати декларацію та отримувати направлення онлайн.
                  </p>
                  <div className="row mt-4">
                      <div className="col-sm-6 mb-3">
                          <h6 className="fw-bold text-primary">Для пацієнтів</h6>
                          <p className="small text-muted">Максимальна зручність запису, нагадування про візити та онлайн-консультації.</p>
                      </div>
                      <div className="col-sm-6 mb-3">
                          <h6 className="fw-bold text-primary">Для лікарів</h6>
                          <p className="small text-muted">Зручний графік роботи, автоматизація звітів та прямий зв'язок із пацієнтом.</p>
                      </div>
                  </div>
              </div>
            </div>
      </div>
      <div className="row mt-5">
        <div className="col-12 text-center mb-5">
          <h2 className="fw-bold">Наші ключові цінності</h2>
          <p className="text-muted">Те, на чому тримається наш сервіс та довіра користувачів</p>
          <div className="bg-primary mx-auto mt-2" style={{ width: '60px', height: '4px', borderRadius: '2px' }}></div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="p-4 h-100 bg-white shadow-sm rounded-4 border-top border-primary border-4 transition-hover">
            <div className="mb-3 fs-1 text-primary">🛡️</div>
            <h4 className="fw-bold">Безпека даних</h4>
            <p className="text-muted">
              Ми використовуємо сучасні банківські протоколи шифрування (SSL). Ваша 
              медична таємниця під надійним захистом згідно з міжнародними стандартами.
            </p>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="p-4 h-100 bg-white shadow-sm rounded-4 border-top border-primary border-4 transition-hover">
            <div className="mb-3 fs-1 text-primary">⚡</div>
            <h4 className="fw-bold">Швидкість</h4>
            <p className="text-muted">
              Час – це найцінніший ресурс. Запис до вузького спеціаліста займає лише 30 секунд. 
              Жодних очікувань на лінії реєстратури.
            </p>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="p-4 h-100 bg-white shadow-sm rounded-4 border-top border-primary border-4 transition-hover">
            <div className="mb-3 fs-1 text-primary">🤝</div>
            <h4 className="fw-bold">Прозорість</h4>
            <p className="text-muted">
              Система рейтингів базується виключно на підтверджених візитах пацієнтів. 
              Ви бачите реальну картину кваліфікації лікаря.
            </p>
          </div>
        </div>
      </div>
      <div className="card border-0 bg-primary text-white p-5 rounded-4 shadow-lg text-center mt-5 mb-4 overflow-hidden position-relative">
        <div style={{ position: 'relative', zIndex: 2 }}>
            <h2 className="fw-bold mb-3 h1">Готові подбати про своє здоров'я?</h2>
            <p className="mb-4 opacity-75 fs-5 mx-auto" style={{ maxWidth: '700px' }}>
                Приєднуйтесь до тисяч задоволених користувачів, які вже обрали MedPortal 
                для контролю за своїм медичним обслуговуванням.
            </p>
            <div className="d-flex justify-content-center">
              <Link to="/register" className="btn btn-light btn-lg px-5 rounded-3 fw-bold text-primary shadow">
                Зареєструватися безкоштовно
              </Link>
            </div>
        </div>
        <div style={{ 
            position: 'absolute', 
            top: '-50px', 
            right: '-50px', 
            width: '200px', 
            height: '200px', 
            background: 'rgba(255,255,255,0.1)', 
            borderRadius: '50%' 
        }}></div>
      </div>
    </div>
  );
}
export default About;