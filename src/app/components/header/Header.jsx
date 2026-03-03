"use client";

import { useState, useEffect, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight, FiPhone } from 'react-icons/fi';
import './header.css';

const Header = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const slides = [
        {
            id: 1,
            title: 'Премиальные кондиционеры Gree',
            subtitle: 'Официальный дилер в Бухаре',
            description: 'Немецкие технологии и надежность для вашего комфорта',
            image: '/images/header/1.jpg',
            buttonText: 'Каталог',
            buttonLink: '/conditioners',
            showCallButton: false
        },
        {
            id: 2,
            title: 'Профессиональная установка',
            subtitle: 'Монтаж под ключ',
            description: 'Сертифицированные специалисты с опытом более 10 лет',
            image: '/images/header/2.jpg',
            buttonText: 'Позвонить',
            buttonLink: 'tel:+998938456000',
            showCallButton: true
        },
        {
            id: 3,
            title: 'Сервисное обслуживание',
            subtitle: 'Гарантия качества',
            description: 'Регулярное ТО и ремонт кондиционеров любой сложности',
            image: '/images/header/3.jpg',
            buttonText: 'Позвонить',
            buttonLink: 'tel:+998938456000',
            showCallButton: true
        }
    ];

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }, [slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 5000);
    };

    useEffect(() => {
        let interval;
        if (isAutoPlaying) {
            interval = setInterval(nextSlide, 5000);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, nextSlide]);

    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 100) {
            nextSlide();
        }
        if (touchStart - touchEnd < -100) {
            prevSlide();
        }
        setTouchStart(0);
        setTouchEnd(0);
    };

    const pauseAutoPlay = () => setIsAutoPlaying(false);
    const resumeAutoPlay = () => setIsAutoPlaying(true);

    const handleButtonClick = (link) => {
        if (link.startsWith('tel:')) {
            window.location.href = link;
        } else {
            window.location.href = link;
        }
    };

    return (
        <header className="header">
            <div
                className="carousel-container"
                onMouseEnter={pauseAutoPlay}
                onMouseLeave={resumeAutoPlay}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* Слайды */}
                <div
                    className="carousel-track"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {slides.map((slide) => (
                        <div key={slide.id} className="carousel-slide">
                            <div className="slide-image-wrapper">
                                <div
                                    className="slide-image"
                                    style={{ backgroundImage: `url(${slide.image})` }}
                                />
                                <div className="slide-overlay" />
                            </div>

                            <div className="slide-content">
                                <div className="slide-text-container">
                                    <span className="slide-subtitle">{slide.subtitle}</span>
                                    <h1 className="slide-title">{slide.title}</h1>
                                    <p className="slide-description">{slide.description}</p>

                                    {/* Кнопка */}
                                    <div className="slide-actions">
                                        {slide.showCallButton ? (
                                            <button
                                                onClick={() => handleButtonClick(slide.buttonLink)}
                                                className="slide-button call-button"
                                                aria-label="Позвонить"
                                            >
                                                <FiPhone className="call-icon" />
                                                <span>{slide.buttonText}</span>
                                                <span className="button-glow"></span>
                                            </button>
                                        ) : (
                                            <a href={slide.buttonLink} className="slide-button primary">
                                                {slide.buttonText}
                                                <span className="button-glow"></span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Кнопки навигации */}
                <button
                    className="carousel-button prev"
                    onClick={prevSlide}
                    aria-label="Предыдущий слайд"
                >
                    <FiChevronLeft />
                    <span className="button-glow"></span>
                </button>

                <button
                    className="carousel-button next"
                    onClick={nextSlide}
                    aria-label="Следующий слайд"
                >
                    <FiChevronRight />
                    <span className="button-glow"></span>
                </button>

                {/* Индикаторы */}
                <div className="carousel-dots">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${currentSlide === index ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Перейти к слайду ${index + 1}`}
                        >
                            <span className="dot-inner"></span>
                        </button>
                    ))}
                </div>

                {/* Счетчик слайдов */}
                <div className="slide-counter">
                    <span className="current">{String(currentSlide + 1).padStart(2, '0')}</span>
                    <span className="separator">/</span>
                    <span className="total">{String(slides.length).padStart(2, '0')}</span>
                </div>
            </div>

            {/* Индикатор прокрутки */}
            <div className="scroll-indicator">
                <span className="scroll-text">Листайте вниз</span>
                <span className="scroll-line"></span>
                <span className="scroll-arrow"></span>
            </div>
        </header>
    );
};

export default Header;