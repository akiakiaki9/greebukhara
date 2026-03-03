"use client";

import { useState, useEffect } from 'react';
import { FiPhone, FiClock, FiX } from 'react-icons/fi';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { usePathname } from 'next/navigation';
import './navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { href: '/', label: 'Главная' },
        { href: '/conditioners', label: 'Кондиционеры' },
        { href: '/contacts', label: 'Контакты' },
    ];

    const isActiveLink = (href) => {
        if (href === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(href);
    };

    return (
        <>
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="navbar-container">
                    {/* Логотип */}
                    <a href="/" className="navbar-logo" aria-label="На главную">
                        <img src="/images/logo.png" alt="Логотип компании" loading="lazy" />
                    </a>

                    {/* Десктопное меню */}
                    <ul className="navbar-menu">
                        {navLinks.map((link) => (
                            <li key={link.href} className="nav-item">
                                <a
                                    href={link.href}
                                    className={`nav-link ${isActiveLink(link.href) ? 'active' : ''}`}
                                >
                                    <span className="nav-link-text">{link.label}</span>
                                    <span className="nav-link-indicator"></span>
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Контакты */}
                    <div className="navbar-contacts desktop-only">
                        <div className="contact-info">
                            <div className="contact-phone">
                                <FiPhone className="contact-icon" />
                                <div className="phone-number">
                                    <span className="contact-label">Звоните</span>
                                    <a href="tel:+998938456000" className="phone-link">+998 (93) 845-60-00</a>
                                </div>
                            </div>
                            <div className="contact-schedule">
                                <FiClock className="contact-icon" />
                                <div className="schedule-text">
                                    <span className="contact-label">Ежедневно</span>
                                    <span className="schedule-time">9:00 - 19:00</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Компактные контакты */}
                    <div className="navbar-contacts compact tablet-only">
                        <a href="tel:+998938456000" className="compact-phone-link">
                            <FiPhone className="contact-icon" />
                        </a>
                    </div>

                    {/* Бургер-кнопка */}
                    <button
                        className={`burger-button ${isOpen ? 'active' : ''}`}
                        onClick={toggleMenu}
                        aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
                    >
                        {isOpen ? <FiX className="burger-icon close" /> : <HiOutlineMenuAlt3 className="burger-icon" />}
                    </button>

                    {/* Мобильное меню */}
                    <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
                        <ul className="mobile-nav-menu">
                            {navLinks.map((link, index) => (
                                <li key={link.href} className="mobile-nav-item">
                                    <a
                                        href={link.href}
                                        className={`mobile-nav-link ${isActiveLink(link.href) ? 'active' : ''}`}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className="mobile-contacts">
                            <div className="mobile-contact-header">
                                <h4 className="mobile-contact-title">Контакты</h4>
                            </div>

                            {/* Основной номер магазина */}
                            <div className="mobile-contact-item main">
                                <div className="mobile-contact-icon-wrapper">
                                    <FiPhone className="mobile-contact-icon" />
                                </div>
                                <div className="mobile-contact-text">
                                    <span className="mobile-contact-label">Магазин</span>
                                    <a href="tel:+998938456000" className="mobile-contact-link">+998 (93) 845-60-00</a>
                                    <span className="mobile-contact-note">Ежедневно 9:00-19:00</span>
                                </div>
                            </div>

                            {/* Номер мастера */}
                            <div className="mobile-contact-item master">
                                <div className="mobile-contact-icon-wrapper master-icon">
                                    <FiPhone className="mobile-contact-icon" />
                                </div>
                                <div className="mobile-contact-text">
                                    <span className="mobile-contact-label master-label">Мастер Наби</span>
                                    <a href="tel:+998902990100" className="mobile-contact-link master-link">+998 (90) 299-01-00</a>
                                    <span className="mobile-contact-note">Монтаж и ремонт</span>
                                </div>
                            </div>

                            <div className="mobile-contact-item">
                                <FiClock className="mobile-contact-icon" />
                                <div className="mobile-contact-text">
                                    <span className="mobile-contact-label">Режим работы</span>
                                    <span className="mobile-contact-schedule">Ежедневно 9:00 - 19:00</span>
                                    <span className="mobile-contact-note">Без выходных</span>
                                </div>
                            </div>

                            {/* Кнопки быстрых действий */}
                            <div className="mobile-quick-actions">
                                <a href="tel:+998938456000" className="quick-action-btn call-shop">
                                    <FiPhone className="quick-icon" />
                                    <span>Магазин</span>
                                </a>
                                <a href="tel:+998902990100" className="quick-action-btn call-master">
                                    <FiPhone className="quick-icon" />
                                    <span>Мастер</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;