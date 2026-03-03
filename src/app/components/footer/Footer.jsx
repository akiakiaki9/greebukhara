"use client";

import { useState, useEffect } from 'react';
import {
    FiPhone,
    FiMail,
    FiMapPin,
    FiClock,
    FiInstagram,
    FiChevronRight,
    FiArrowUp
} from 'react-icons/fi';
import { FaTelegram } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const currentYear = new Date().getFullYear();

    // Отслеживание прокрутки для кнопки "Наверх"
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="footer">
            {/* Декоративная волна */}
            <div className="footer-wave">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path
                        fill="var(--bg-secondary)"
                        fillOpacity="1"
                        d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                    />
                </svg>
            </div>

            <div className="footer-container">
                {/* Основной контент футера */}
                <div className="footer-main">
                    {/* Колонка 1: О компании */}
                    <div className="footer-col">
                        <div className="footer-logo">
                            <span className="logo-text">GREE</span>
                            <span className="logo-text-accent">BUKHARA</span>
                        </div>
                        <p className="footer-description">
                            Официальный дилер Gree в Бухаре. Предлагаем премиальные кондиционеры,
                            профессиональный монтаж и сервисное обслуживание.
                        </p>

                        {/* Социальные сети */}
                        <div className="social-links">
                            <a
                                href="https://www.instagram.com/gree_6000/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                                aria-label="Instagram"
                            >
                                <FiInstagram />
                                <span className="social-glow"></span>
                            </a>
                            <a
                                href="https://t.me/gree_6000"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                                aria-label="Telegram"
                            >
                                <FaTelegram />
                                <span className="social-glow"></span>
                            </a>
                        </div>
                    </div>

                    {/* Колонка 2: Быстрые ссылки */}
                    <div className="footer-col">
                        <h3 className="footer-title">Быстрые ссылки</h3>
                        <ul className="footer-links">
                            <li>
                                <a href="/" className="footer-link">
                                    <FiChevronRight className="link-icon" />
                                    Главная
                                </a>
                            </li>
                            <li>
                                <a href="/conditioners" className="footer-link">
                                    <FiChevronRight className="link-icon" />
                                    Кондиционеры
                                </a>
                            </li>
                            <li>
                                <a href="/conditioners#service" className="footer-link">
                                    <FiChevronRight className="link-icon" />
                                    Сервис
                                </a>
                            </li>
                            <li>
                                <a href="/contacts" className="footer-link">
                                    <FiChevronRight className="link-icon" />
                                    Контакты
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Колонка 3: Контакты */}
                    <div className="footer-col">
                        <h3 className="footer-title">Контакты</h3>
                        <ul className="contact-list">
                            <li className="contact-item">
                                <div className="contact-icon-wrapper">
                                    <FiPhone className="contact-icon" />
                                </div>
                                <div className="contact-info">
                                    <span className="contact-label">Телефон:</span>
                                    <a href="tel:+998938456000" className="contact-value">+998 (93) 845-60-00</a>
                                </div>
                            </li>
                            <li className="contact-item">
                                <div className="contact-icon-wrapper">
                                    <FiMail className="contact-icon" />
                                </div>
                                <div className="contact-info">
                                    <span className="contact-label">Email:</span>
                                    <a href="mailto:greeelektroniks@gmail.com" className="contact-value">greeelektroniks@gmail.com</a>
                                </div>
                            </li>
                            <li className="contact-item">
                                <div className="contact-icon-wrapper">
                                    <FiMapPin className="contact-icon" />
                                </div>
                                <div className="contact-info">
                                    <span className="contact-label">Адрес:</span>
                                    <span className="contact-value">г. Бухара, ул. М. Каримова 225</span>
                                </div>
                            </li>
                            <li className="contact-item">
                                <div className="contact-icon-wrapper">
                                    <FiClock className="contact-icon" />
                                </div>
                                <div className="contact-info">
                                    <span className="contact-label">Режим работы:</span>
                                    <span className="contact-value">Ежедневно 9:00 - 19:00</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Колонка 4: Платежные системы */}
                    <div className="footer-col">
                        <h3 className="footer-title">Способы оплаты</h3>
                        <div className="payment-methods">
                            <div className="payment-icons">
                                <img
                                    src="/images/uzcard.png"
                                    alt="Uzcard"
                                    className="payment-icon"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/50x30?text=Uzcard';
                                    }}
                                />
                                <img
                                    src="/images/humo.png"
                                    alt="Humo"
                                    className="payment-icon"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/50x30?text=Humo';
                                    }}
                                />
                            </div>
                            <p className="payment-text">
                                Наличные, перевод, терминал
                            </p>
                        </div>
                    </div>
                </div>

                {/* Нижняя часть футера */}
                <div className="footer-bottom">
                    <div className="copyright">
                        © {currentYear} GREE BUKHARA. Все права защищены.
                    </div>
                    <div className="footer-bottom-links">
                        <span className="developed-by">Разработано в</span>
                        <a
                            href="https://akbarsoft.uz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="developer-link"
                        >
                            Akbar Soft
                        </a>
                    </div>
                </div>
            </div>

            {/* Кнопка "Наверх" */}
            <button
                className={`scroll-top ${showScrollTop ? 'visible' : ''}`}
                onClick={scrollToTop}
                aria-label="Наверх"
            >
                <FiArrowUp className="scroll-top-icon" />
            </button>
        </footer>
    );
};

export default Footer;