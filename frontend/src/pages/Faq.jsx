import React from 'react';
function Faq() {
  const faqData = [
    {
      id: "collapseOne",
      question: "Як записатися на прийом до лікаря?",
      answer: "Для запису на прийом необхідно перейти в розділ 'Послуги' -> 'Знайти лікаря', обрати потрібного спеціаліста, на сторінці його профілю обрати зручну дату та час і натиснути кнопку 'Підтвердити запис'. Ви повинні бути авторизовані в системі."
    },
    {
      id: "collapseTwo",
      question: "Що таке електронна декларація і як її укласти?",
      answer: "Електронна декларація — це документ, який підтверджує ваш вибір лікаря первинної ланки (терапевта або сімейного лікаря). Ви можете дізнатися більше в розділі 'Декларації', де описано кроки для її оформлення через наш портал або безпосередньо в закладі."
    },
    {
      id: "collapseThree",
      question: "Чи можу я скасувати свій запис на прийом?",
      answer: "Так, ви можете скасувати запис у вашому Особистому кабінеті. Ми просимо робити це не пізніше, ніж за 2 години до призначеного часу, щоб на цей слот міг записатися інший пацієнт."
    },
    {
      id: "collapseFour",
      question: "Як я можу переглянути історію своїх візитів?",
      answer: "Вся історія ваших записів та статус майбутніх візитів доступні в розділі 'Профіль' після входу в систему."
    },
    {
      id: "collapseFive",
      question: "Що робити, якщо я забув пароль від свого кабінету?",
      answer: "На сторінці входу скористайтеся функцією 'Забули пароль?'. Система надішле інструкції з відновлення на вашу електронну пошту, вказану при реєстрації."
    },
    {
      id: "collapseSix",
      question: "Як знайти конкретну лікарню чи амбулаторію?",
      answer: "Скористайтеся розділом 'Послуги' -> 'Знайти заклад'. Ви можете відфільтрувати заклади за адресою або напрямком медичної допомоги."
    }
  ];
  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="text-center mb-5">
            <h1 className="fw-bold display-5">Потрібна допомога?</h1>
            <p className="lead text-muted">
              Ми зібрали відповіді на найпопулярніші запитання користувачів нашого порталу.
            </p>
          </div>
          <div className="accordion accordion-flush shadow-sm rounded-4 overflow-hidden border" id="faqAccordion">
            {faqData.map((item, index) => (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header">
                  <button 
                    className={`accordion-button ${index !== 0 ? 'collapsed' : ''} fw-bold py-3`} 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target={`#${item.id}`} 
                    aria-expanded={index === 0 ? "true" : "false"}
                    aria-controls={item.id}
                  >
                    {item.question}
                  </button>
                </h2>
                <div 
                  id={item.id} 
                  className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} 
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body text-muted" style={{ lineHeight: '1.7' }}>
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="card border-0 bg-light rounded-4 p-4 mt-5 text-center">
            <h5 className="fw-bold mb-2">Не знайшли відповіді на своє питання?</h5>
            <p className="text-muted mb-3">Зв'яжіться з нашою службою підтримки, і ми допоможемо вам.</p>
            <div>
              <a href="mailto:support@medportal.ua" className="btn btn-primary px-4 rounded-pill me-2">
                Написати нам
              </a>
              <button className="btn btn-outline-primary px-4 rounded-pill">
                Зателефонувати
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Faq;