import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('user', JSON.stringify(res.data.user));
      alert('Вхід успішний!');
      window.location.href = "/"; 
    } catch (err) {
      alert('Помилка входу. Перевірте пошту та пароль.');
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '400px', borderRadius: '15px', border: 'none' }}>
        <div className="text-center mb-4">
          <div className="d-flex justify-content-center gap-2 mb-3">
            <div className="bg-black text-white px-3 py-1 rounded-3 d-flex align-items-center" 
                 style={{ fontWeight: 'bold', letterSpacing: '1px', fontSize: '14px', cursor: 'default' }}>
              Дія
            </div>
            <div className="border border-primary text-primary px-3 py-1 rounded-3 d-flex align-items-center" 
                 style={{ fontWeight: 'bold', fontSize: '14px', backgroundColor: '#f0f7ff', cursor: 'default' }}>
              <span style={{ color: '#102116' }}>bank</span>
              <span style={{ color: '#1a9a049d', marginLeft: '2px' }}>ID</span>
            </div>
          </div>
          <h4 className="fw-bold">Вхід до порталу</h4>
          <p className="text-muted small">Використовуйте ваші облікові дані</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label small fw-semibold">Електронна пошта</label>
            <input 
              type="email" 
              className="form-control form-control-lg" 
              placeholder="email@example.com"
              style={{ fontSize: '16px', borderRadius: '10px' }}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="mb-4">
            <label className="form-label small fw-semibold">Пароль</label>
            <input 
              type="password" 
              className="form-control form-control-lg" 
              placeholder="••••••••"
              style={{ fontSize: '16px', borderRadius: '10px' }}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-dark w-100 py-2 fw-bold" 
            style={{ borderRadius: '10px', backgroundColor: '#000' }}
          >
            Увійти
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="small text-muted">
            Немає акаунту? <a href="/register" className="text-decoration-none fw-bold text-dark">Зареєструватися</a>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Login;