"use client";

import { useState, useEffect } from 'react';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import {
    FiPhone,
    FiMail,
    FiMapPin,
    FiClock,
    FiArrowDown
} from 'react-icons/fi';
import { FaTelegram, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import './contacts.css';

const ContactsPage = () => {
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scrollToContent = () => {
        document.getElementById('contacts-content').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <Navbar />

            <main className="contacts-page">
                {/* Hero секция */}
                <section className="page-hero">
                    <div className="hero-background">
                        <div className="hero-overlay"></div>
                        <div className="hero-pattern"></div>
                    </div>

                    <div className="hero-content">
                        <div className="breadcrumbs">
                            <a href="/">Главная</a>
                            <span className="separator">/</span>
                            <span className="current">Контакты</span>
                        </div>

                        <h1 className="hero-title">
                            Контакты
                        </h1>
                        <p className="hero-subtitle">
                            Свяжитесь с нами любым удобным способом
                        </p>
                    </div>

                    <button className="hero-scroll" onClick={scrollToContent}>
                        <span className="scroll-text">Листайте вниз</span>
                        <FiArrowDown className="scroll-icon" />
                    </button>
                </section>

                {/* Основной контент */}
                <div id="contacts-content" className="contacts-container">
                    <div className="contacts-grid">
                        {/* Левая колонка - контактная информация */}
                        <div className="contacts-info">
                            <div className="info-header">
                                <span className="section-tag">Свяжитесь с нами</span>
                                <h2 className="info-title">Наши контакты</h2>
                                <p className="info-description">
                                    Мы всегда на связи и готовы ответить на все ваши вопросы о кондиционерах Gree
                                </p>
                            </div>

                            <div className="info-cards">
                                <div className="info-card">
                                    <div className="card-icon-wrapper">
                                        <FiPhone className="card-icon" />
                                    </div>
                                    <div className="card-content">
                                        <h3 className="card-title">Телефон</h3>
                                        <a href="tel:+998938456000" className="card-link">+998 (93) 845-60-00</a>
                                        <p className="card-note">Ежедневно с 9:00 до 19:00</p>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <div className="card-icon-wrapper">
                                        <FiMail className="card-icon" />
                                    </div>
                                    <div className="card-content">
                                        <h3 className="card-title">Email</h3>
                                        <a href="mailto:greeelektroniks@gmail.com" className="card-link">greeelektroniks@gmail.com</a>
                                        <p className="card-note">Ответим в течение 24 часов</p>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <div className="card-icon-wrapper">
                                        <FiMapPin className="card-icon" />
                                    </div>
                                    <div className="card-content">
                                        <h3 className="card-title">Адрес</h3>
                                        <p className="card-text">г. Бухара, ул. М. Каримова 225</p>
                                        <p className="card-text">Калхоз бозор</p>
                                        <a
                                            href="https://maps.app.goo.gl/edXS2q6AmksHKHTa6"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="card-link map-link"
                                        >
                                            Открыть в картах →
                                        </a>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <div className="card-icon-wrapper">
                                        <FiClock className="card-icon" />
                                    </div>
                                    <div className="card-content">
                                        <h3 className="card-title">Режим работы</h3>
                                        <div className="schedule-item">
                                            <span>Понедельник - Воскресенье:</span>
                                            <span className="schedule-time">9:00 - 19:00</span>
                                        </div>
                                        <div className="schedule-note">Без выходных</div>
                                    </div>
                                </div>
                            </div>

                            {/* Социальные сети */}
                            <div className="social-section">
                                <h3 className="social-title">Мы в соцсетях</h3>
                                <div className="social-grid">
                                    <a
                                        href="https://t.me/gree_6000"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-card telegram"
                                    >
                                        <FaTelegram className="social-icon" />
                                        <span className="social-name">Telegram</span>
                                        <span className="social-handle">@gree_6000</span>
                                    </a>

                                    <a
                                        href="https://wa.me/998938456000"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-card whatsapp"
                                    >
                                        <FaWhatsapp className="social-icon" />
                                        <span className="social-name">WhatsApp</span>
                                        <span className="social-handle">+998 93 845 60 00</span>
                                    </a>

                                    <a
                                        href="https://instagram.com/gree_6000"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-card instagram"
                                    >
                                        <FaInstagram className="social-icon" />
                                        <span className="social-name">Instagram</span>
                                        <span className="social-handle">@gree_6000</span>
                                    </a>
                                </div>
                            </div>

                            {/* Дополнительная информация */}
                            <div className="additional-info">
                                <div className="info-badge">
                                    <span className="badge-icon">📞</span>
                                    <div className="badge-text">
                                        <strong>Есть вопросы?</strong>
                                        <p>Позвоните нам, мы поможем с выбором</p>
                                    </div>
                                </div>

                                <div className="info-badge">
                                    <span className="badge-icon">🚚</span>
                                    <div className="badge-text">
                                        <strong>Доставка по Бухаре</strong>
                                        <p>Бесплатно при покупке от 10 млн сум</p>
                                    </div>
                                </div>

                                <div className="info-badge">
                                    <span className="badge-icon">⚡</span>
                                    <div className="badge-text">
                                        <strong>Бесплатный выезд</strong>
                                        <p>Мастера на диагностику при заказе монтажа</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Правая колонка - изображение или дополнительная информация */}
                        <div className="contacts-image-wrapper">
                            <div className="image-card">
                                <div className="image-content">
                                    <span className="image-badge">GREE BUKHARA</span>
                                    <h3 className="image-title">Официальный дилер</h3>
                                    <p className="image-text">
                                        Только оригинальная продукция Gree с официальной гарантией
                                    </p>
                                    <div className="image-features">
                                        <div className="image-feature">
                                            <span className="feature-dot"></span>
                                            <span>10+ лет на рынке</span>
                                        </div>
                                        <div className="image-feature">
                                            <span className="feature-dot"></span>
                                            <span>500+ довольных клиентов</span>
                                        </div>
                                        <div className="image-feature">
                                            <span className="feature-dot"></span>
                                            <span>Профессиональный монтаж</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Карта */}
                    <section className="map-section">
                        <div className="map-header">
                            <span className="section-tag">Как добраться</span>
                            <h2 className="map-title">Мы на карте</h2>
                            <p className="map-description">
                                Приезжайте к нам в шоурум, чтобы увидеть кондиционеры вживую
                            </p>
                        </div>

                        <div className="map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d29169.61717019117!2d64.392895724795!3d39.78279784620226!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMznCsDQ2JzUxLjIiTiA2NMKwMjQnMTUuNSJF!5e0!3m2!1sru!2s!4v1772525499524!5m2!1sru!2s"
                                width="100%"
                                height={windowWidth <= 768 ? 300 : 500}
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="GREE BUKHARA на карте"
                                className="map-iframe"
                            />

                            <div className="map-overlay">
                                <div className="map-address-card">
                                    <FiMapPin className="address-icon" />
                                    <div className="address-text">
                                        <strong>Наш адрес:</strong>
                                        <p>г. Бухара, ул. М. Каримова 225, Калхоз бозор</p>
                                        <a href="https://maps.app.goo.gl/rZ6PZtsBEPVxDwfb8" target="_blank" rel="noopener noreferrer">
                                            Построить маршрут →
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* FAQ секция */}
                    <section className="faq-section">
                        <div className="faq-header">
                            <span className="section-tag">Часто задаваемые вопросы</span>
                            <h2 className="faq-title">Что важно знать</h2>
                        </div>

                        <div className="faq-grid">
                            <div className="faq-item">
                                <h3>Как быстро вы отвечаете?</h3>
                                <p>Мы стараемся отвечать на все звонки и сообщения в течение 15-30 минут в рабочее время.</p>
                            </div>

                            <div className="faq-item">
                                <h3>Есть ли у вас шоурум?</h3>
                                <p>Да, у нас есть выставочный зал, где можно посмотреть кондиционеры вживую и получить консультацию.</p>
                            </div>

                            <div className="faq-item">
                                <h3>Работаете ли вы в выходные?</h3>
                                <p>Да, мы работаем ежедневно с 9:00 до 19:00 без выходных и перерывов.</p>
                            </div>

                            <div className="faq-item">
                                <h3>Нужна ли предварительная запись?</h3>
                                <p>Нет, можете приезжать в любое рабочее время. Но для гарантии лучше позвонить заранее.</p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default ContactsPage;