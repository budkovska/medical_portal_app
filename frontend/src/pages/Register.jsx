import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Register() {
  const [formData, setFormData] = useState({
    full_name: '', email: '', phone: '', tax_id: '', password: ''
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      alert('Успішно! Тепер увійдіть.');
      navigate('/login');
    } catch (err) {
      alert('Помилка реєстрації. Перевірте дані.');
    }
  };
  return (
    <div className="card mx-auto shadow" style={{ maxWidth: '500px' }}>
      <div className="card-body">
        <h3 className="card-title text-center">Реєстрація</h3>
        <form onSubmit={handleSubmit}>
          <input className="form-control mb-2" placeholder="ПІБ" onChange={e => setFormData({...formData, full_name: e.target.value})} required />
          <input className="form-control mb-2" type="email" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} required />
          <input className="form-control mb-2" placeholder="Телефон" onChange={e => setFormData({...formData, phone: e.target.value})} required />
          <input className="form-control mb-2" placeholder="ІПН (10 цифр)" maxLength="10" onChange={e => setFormData({...formData, tax_id: e.target.value})} required />
          <input className="form-control mb-3" type="password" placeholder="Пароль" onChange={e => setFormData({...formData, password: e.target.value})} required />
          <button className="btn btn-primary w-100" type="submit">Створити акаунт</button>
        </form>
      </div>
    </div>
  );
}
export default Register;