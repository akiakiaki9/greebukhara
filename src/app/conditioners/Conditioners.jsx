"use client";

import { useState, useEffect } from 'react';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import { DATA } from '../utils/data';
import { FiGrid, FiList, FiSearch, FiX, FiPhone, FiArrowDown } from 'react-icons/fi';
import { FaTelegramPlane } from 'react-icons/fa';
import './conditioners.css';

const ConditionersPage = () => {
    const [filteredData, setFilteredData] = useState(DATA);
    const [selectedSeries, setSelectedSeries] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 60000000 });
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (window.innerWidth > 768 && isFilterOpen) {
                setIsFilterOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isFilterOpen]);

    useEffect(() => {
        if (isFilterOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isFilterOpen]);

    // ✅ АВТОМАТИЧЕСКАЯ ФИЛЬТРАЦИЯ - срабатывает при изменении любого фильтра
    useEffect(() => {
        let filtered = DATA;

        // Фильтр по серии
        if (selectedSeries !== 'all') {
            filtered = filtered.filter(item => item.series === selectedSeries);
        }

        // Фильтр по категории
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(item => item.category === selectedCategory);
        }

        // Фильтр по цене
        filtered = filtered.filter(item =>
            item.price >= priceRange.min && item.price <= priceRange.max
        );

        // Поиск
        if (searchQuery) {
            filtered = filtered.filter(item =>
                item.series.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.model.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredData(filtered);
    }, [selectedSeries, selectedCategory, priceRange, searchQuery]); // ← зависимости

    // Получаем уникальные серии для фильтра
    const seriesList = ['all', ...new Set(DATA.map(item => item.series))];

    // Форматирование цены
    const formatPrice = (price) => {
        return new Intl.NumberFormat('uz-UZ').format(price) + ' сум';
    };

    const resetFilters = () => {
        setSelectedSeries('all');
        setSelectedCategory('all');
        setPriceRange({ min: 0, max: 60000000 });
        setSearchQuery('');
        setIsFilterOpen(false);
        // filteredData обновится автоматически через useEffect
    };

    const handlePhoneCall = (phone) => {
        window.location.href = `tel:${phone}`;
    };

    const handleTelegram = (username) => {
        window.open(`https://t.me/${username}`, '_blank');
    };

    const scrollToCatalog = () => {
        document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <Navbar />

            <main className="conditioners-page">
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
                            <span className="current">Кондиционеры</span>
                        </div>

                        <h1 className="hero-title">
                            Кондиционеры <span className="title-accent">GREE</span>
                        </h1>
                        <p className="hero-subtitle">
                            Премиальная климатическая техника для вашего комфорта
                        </p>

                        {/* Статистика */}
                        <div className="hero-stats">
                            <div className="stat-item">
                                <span className="stat-number">{DATA.length}</span>
                                <span className="stat-label">моделей</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">
                                    {DATA.filter(item => item.category === 'wall').length}
                                </span>
                                <span className="stat-label">настенных</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">
                                    {DATA.filter(item => item.category === 'floor').length}
                                </span>
                                <span className="stat-label">напольных</span>
                            </div>
                        </div>
                    </div>

                    <button className="hero-scroll" onClick={scrollToCatalog}>
                        <span className="scroll-text">К каталогу</span>
                        <FiArrowDown className="scroll-icon" />
                    </button>
                </section>

                {/* Каталог */}
                <div id="catalog" className="catalog-container">
                    <div className="catalog-header">
                        <span className="section-tag">Каталог</span>
                        <h2 className="catalog-title">Наши кондиционеры</h2>
                        <p className="catalog-subtitle">
                            Выберите идеальное решение для вашего помещения
                        </p>
                    </div>

                    {/* Кнопка фильтра для мобильных */}
                    <button
                        className="mobile-filter-toggle"
                        onClick={() => setIsFilterOpen(true)}
                    >
                        <FiSearch />
                        <span>Фильтры</span>
                        {(selectedSeries !== 'all' || selectedCategory !== 'all' || searchQuery || priceRange.max < 60000000) && (
                            <span className="filter-badge">!</span>
                        )}
                    </button>

                    {/* Оверлей для фильтров */}
                    {isFilterOpen && <div className="filters-overlay" onClick={() => setIsFilterOpen(false)} />}

                    {/* Фильтры */}
                    <div className={`filters-section ${isFilterOpen ? 'active' : ''}`}>
                        <div className="filters-header">
                            <h3>Фильтры</h3>
                            <button className="filters-close" onClick={() => setIsFilterOpen(false)}>
                                <FiX />
                            </button>
                        </div>

                        <div className="filters-wrapper">
                            <div className="search-box">
                                <FiSearch className="search-icon" />
                                <input
                                    type="text"
                                    placeholder="Поиск по моделям..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input"
                                />
                                {searchQuery && (
                                    <FiX
                                        className="clear-search"
                                        onClick={() => setSearchQuery('')}
                                    />
                                )}
                            </div>

                            <div className="filter-group">
                                <label className="filter-label">Серия:</label>
                                <select
                                    value={selectedSeries}
                                    onChange={(e) => setSelectedSeries(e.target.value)}
                                    className="filter-select"
                                >
                                    {seriesList.map(series => (
                                        <option key={series} value={series}>
                                            {series === 'all' ? 'Все серии' : series}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="filter-group">
                                <label className="filter-label">Тип:</label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="all">Все типы</option>
                                    <option value="wall">Настенные</option>
                                    <option value="floor">Напольные</option>
                                </select>
                            </div>

                            <div className="filter-group price-filter">
                                <label className="filter-label">Цена до:</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="60000000"
                                    step="100000"
                                    value={priceRange.max}
                                    onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                                    className="price-range"
                                />
                                <div className="price-values">
                                    <span>{formatPrice(priceRange.min)}</span>
                                    <span>{formatPrice(priceRange.max)}</span>
                                </div>
                            </div>

                            <div className="filters-actions">
                                <button className="reset-filters" onClick={resetFilters}>
                                    Сбросить
                                </button>
                                <button className="apply-filters" onClick={() => setIsFilterOpen(false)}>
                                    Применить
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="catalog-controls">
                        {windowWidth > 768 && (
                            <div className="view-toggle">
                                <button
                                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                    onClick={() => setViewMode('grid')}
                                    aria-label="Сетка"
                                >
                                    <FiGrid />
                                </button>
                                <button
                                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                    onClick={() => setViewMode('list')}
                                    aria-label="Список"
                                >
                                    <FiList />
                                </button>
                            </div>
                        )}

                        <div className="results-count">
                            Найдено: <span className="count-number">{filteredData.length}</span> моделей
                        </div>
                    </div>

                    <div className={`products-${viewMode}`}>
                        {filteredData.map((product, index) => (
                            <div
                                key={product.id}
                                className={`product-card ${viewMode === 'list' ? 'list-view' : ''}`}
                                onClick={() => setSelectedProduct(product)}
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className={`product-badge ${product.category}`}>
                                    {product.category === 'wall' ? 'Настенный' : 'Напольный'}
                                </div>

                                <div className="product-image-wrapper">
                                    <img
                                        src={product.image_1}
                                        alt={`${product.series} ${product.model}`}
                                        className="product-image"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.src = '/images/placeholder.png';
                                        }}
                                    />
                                    {product.image_2 && (
                                        <img
                                            src={product.image_2}
                                            alt={`${product.series} ${product.model} вид 2`}
                                            className="product-image-hover"
                                            loading="lazy"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    )}
                                </div>

                                <div className="product-info">
                                    <h3 className="product-series" title={product.series}>{product.series}</h3>
                                    <div className="product-model" title={product.model}>{product.model}</div>
                                    <div className="product-coverage">
                                        <span className="coverage-label">Площадь:</span>
                                        <span className="coverage-value">{product.coverage}</span>
                                    </div>
                                    <div className="product-price">{formatPrice(product.price)}</div>

                                    {windowWidth <= 768 && (
                                        <div className="product-actions-mobile">
                                            <button
                                                className="product-call-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handlePhoneCall('+998902990100');
                                                }}
                                                aria-label="Позвонить"
                                            >
                                                <FiPhone />
                                            </button>
                                            <button
                                                className="product-telegram-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleTelegram('nabi_master');
                                                }}
                                                aria-label="Написать в Telegram"
                                            >
                                                <FaTelegramPlane />
                                            </button>
                                        </div>
                                    )}

                                    <button className="product-btn">Подробнее</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredData.length === 0 && (
                        <div className="no-results">
                            <h3>Ничего не найдено</h3>
                            <p>Попробуйте изменить параметры фильтрации</p>
                            <button className="reset-btn" onClick={resetFilters}>
                                Сбросить фильтры
                            </button>
                        </div>
                    )}
                </div>

                {/* Компонент мастера */}
                <section className="master-section" id='service'>
                    <div className="master-container">
                        <div className="master-content">
                            <span className="master-badge">Монтаж и демонтаж</span>
                            <h2 className="master-title">
                                Профессиональный <span className="title-accent">мастер</span>
                            </h2>
                            <p className="master-description">
                                Опытный специалист по установке и обслуживанию кондиционеров Gree
                            </p>

                            <div className="master-card">
                                <div className="master-avatar">
                                    <img
                                        src="/images/master-avatar.jpg"
                                        alt="Наби - мастер по кондиционерам"
                                        onError={(e) => {
                                            e.target.src = 'https://ui-avatars.com/api/?name=Наби&background=0A66C2&color=fff&size=128';
                                        }}
                                    />
                                </div>

                                <div className="master-info">
                                    <h3 className="master-name">Наби</h3>
                                    <p className="master-exp">Опыт работы: 10+ лет</p>
                                    <div className="master-rating">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span key={star} className="star">★</span>
                                        ))}
                                        <span className="rating-text">4.9 (127 отзывов)</span>
                                    </div>
                                    <div className="master-specialization">
                                        <span className="spec-tag">Монтаж</span>
                                        <span className="spec-tag">Демонтаж</span>
                                        <span className="spec-tag">Ремонт</span>
                                        <span className="spec-tag">Обслуживание</span>
                                    </div>
                                </div>

                                <div className="master-contact">
                                    <div className="master-phone">
                                        <FiPhone className="phone-icon" />
                                        <a href="tel:+998902990100" className="phone-number">
                                            +998 (90) 299-01-00
                                        </a>
                                    </div>
                                    <p className="phone-note">Звоните, всегда на связи</p>
                                    <div className="master-actions">
                                        <a href="tel:+998902990100" className="master-btn call-btn">
                                            Позвонить
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="master-features">
                                <div className="feature-item">
                                    <span className="feature-icon">✅</span>
                                    <div className="feature-text">
                                        <strong>Бесплатный выезд</strong>
                                        <p>На диагностику при заказе монтажа</p>
                                    </div>
                                </div>
                                <div className="feature-item">
                                    <span className="feature-icon">🔧</span>
                                    <div className="feature-text">
                                        <strong>Гарантия на работы</strong>
                                        <p>До 3 лет на установку</p>
                                    </div>
                                </div>
                                <div className="feature-item">
                                    <span className="feature-icon">⚡</span>
                                    <div className="feature-text">
                                        <strong>Быстро</strong>
                                        <p>Выезд в день обращения</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Модальное окно */}
                {selectedProduct && (
                    <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="modal-close" onClick={() => setSelectedProduct(null)}>
                                <FiX />
                            </button>

                            <div className="modal-grid">
                                <div className="modal-images">
                                    <img
                                        src={selectedProduct.image_1}
                                        alt={selectedProduct.series}
                                        className="modal-main-image"
                                    />
                                    {selectedProduct.image_2 && (
                                        <img
                                            src={selectedProduct.image_2}
                                            alt={`${selectedProduct.series} дополнительное`}
                                            className="modal-secondary-image"
                                        />
                                    )}
                                </div>

                                <div className="modal-details">
                                    <span className={`modal-category ${selectedProduct.category}`}>
                                        {selectedProduct.category === 'wall' ? 'Настенный' : 'Напольный'}
                                    </span>
                                    <h2 className="modal-title">{selectedProduct.series}</h2>
                                    <p className="modal-model">Модель: {selectedProduct.model}</p>

                                    <div className="modal-specs">
                                        <div className="spec-item">
                                            <span className="spec-label">Площадь покрытия:</span>
                                            <span className="spec-value">{selectedProduct.coverage}</span>
                                        </div>
                                        <div className="spec-item">
                                            <span className="spec-label">Бренд:</span>
                                            <span className="spec-value">{selectedProduct.brand}</span>
                                        </div>
                                    </div>

                                    <div className="modal-price">
                                        <span className="price-label">Цена:</span>
                                        <span className="price-value">{formatPrice(selectedProduct.price)}</span>
                                    </div>

                                    <div className="modal-actions">
                                        <a href="tel:+998902990100" className="modal-btn call-btn">
                                            <FiPhone /> Позвонить мастеру
                                        </a>
                                    </div>

                                    <div className="modal-master-note">
                                        <p>⚡ Наби - мастер по установке со скидкой 10% при покупке кондиционера</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </>
    );
};

export default ConditionersPage;