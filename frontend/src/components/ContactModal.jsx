import React, { useState } from 'react';
function ContactModal({ show, onClose }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  if (!show) return null;
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Відправлено дані:", formData);
    setStatus('success');
    setTimeout(() => {
      onClose();
      setStatus(null);
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };
  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4">
          <div className="modal-header border-0 pb-0">
            <h5 className="fw-bold px-2 mt-2">Зворотній зв'язок</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body p-4">
            {status === 'success' ? (
              <div className="alert alert-success border-0 rounded-3 text-center py-4">
                <div className="fs-1 mb-2">✅</div>
                <h6 className="fw-bold">Повідомлення надіслано!</h6>
                <p className="small mb-0">Ми зв'яжемося з вами найближчим часом.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted">Ваше ім'я</label>
                  <input 
                    type="text" 
                    className="form-control rounded-3" 
                    placeholder="Іван Іванов"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted">Email для зв'язку</label>
                  <input 
                    type="email" 
                    className="form-control rounded-3" 
                    placeholder="example@mail.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted">Повідомлення</label>
                  <textarea 
                    className="form-control rounded-3" 
                    rows="4" 
                    placeholder="Опишіть ваше питання..."
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100 rounded-pill py-2 fw-bold">
                  Надіслати повідомлення
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ContactModal;