"use client";

import { useState, useEffect } from 'react';
import { DATA } from '@/app/utils/data';
import { FiGrid, FiList, FiSearch, FiX, FiPhone, FiArrowLeft } from 'react-icons/fi';
import { FaTelegramPlane } from 'react-icons/fa';
import './catalog.css';

const Catalog = () => {
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

    // Блокировка скролла при открытых фильтрах
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

    const seriesList = ['all', ...new Set(DATA.map(item => item.series))];
    const categories = ['all', 'wall', 'floor'];

    const formatPrice = (price) => {
        return new Intl.NumberFormat('uz-UZ').format(price) + ' сум';
    };

    const applyFilters = () => {
        let filtered = DATA;

        if (selectedSeries !== 'all') {
            filtered = filtered.filter(item => item.series === selectedSeries);
        }

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(item => item.category === selectedCategory);
        }

        filtered = filtered.filter(item =>
            item.price >= priceRange.min && item.price <= priceRange.max
        );

        if (searchQuery) {
            filtered = filtered.filter(item =>
                item.series.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.model.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredData(filtered);
    };

    const resetFilters = () => {
        setSelectedSeries('all');
        setSelectedCategory('all');
        setPriceRange({ min: 0, max: 60000000 });
        setSearchQuery('');
        setFilteredData(DATA);
    };

    const handlePhoneCall = () => {
        window.location.href = 'tel:+998938456000';
    };

    const handleTelegram = (product) => {
        const text = `Здравствуйте! Меня интересует ${product.series} ${product.model}`;
        window.open(`https://t.me/+998938456000?text=${encodeURIComponent(text)}`, '_blank');
    };

    const closeFilters = () => {
        setIsFilterOpen(false);
    };

    return (
        <section className="catalog">
            {/* Оверлей для мобильных фильтров */}
            {isFilterOpen && <div className="filters-overlay" onClick={closeFilters} />}

            <div className="catalog-container">
                <div className="catalog-header">
                    <h2 className="catalog-title">
                        Наши <span className="title-accent">кондиционеры</span>
                    </h2>
                    <p className="catalog-subtitle">
                        Премиальная климатическая техника Gree в Бухаре
                    </p>
                </div>

                <button
                    className="mobile-filter-toggle"
                    onClick={() => setIsFilterOpen(true)}
                >
                    <FiSearch />
                    <span>Фильтры</span>
                    {filteredData.length !== DATA.length && (
                        <span className="filter-badge">!</span>
                    )}
                </button>

                <div className={`filters-section ${isFilterOpen ? 'active' : ''}`}>
                    {/* Заголовок фильтров для мобильных */}
                    <div className="filters-header">
                        <button className="filters-back" onClick={closeFilters}>
                            <FiArrowLeft />
                        </button>
                        <h3>Фильтры</h3>
                        <button className="filters-close" onClick={closeFilters}>
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
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    applyFilters();
                                }}
                                className="search-input"
                            />
                            {searchQuery && (
                                <FiX
                                    className="clear-search"
                                    onClick={() => {
                                        setSearchQuery('');
                                        applyFilters();
                                    }}
                                />
                            )}
                        </div>

                        <div className="filter-group">
                            <label className="filter-label">Серия:</label>
                            <select
                                value={selectedSeries}
                                onChange={(e) => {
                                    setSelectedSeries(e.target.value);
                                    applyFilters();
                                }}
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
                                onChange={(e) => {
                                    setSelectedCategory(e.target.value);
                                    applyFilters();
                                }}
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
                                onChange={(e) => {
                                    setPriceRange({ ...priceRange, max: Number(e.target.value) });
                                    applyFilters();
                                }}
                                className="price-range"
                            />
                            <div className="price-values">
                                <span>{formatPrice(priceRange.min)}</span>
                                <span>{formatPrice(priceRange.max)}</span>
                            </div>
                        </div>

                        {/* Кнопки действий для мобильных */}
                        <div className="filters-actions">
                            <button className="reset-filters" onClick={resetFilters}>
                                Сбросить
                            </button>
                            <button className="apply-filters" onClick={closeFilters}>
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

                {filteredData.length > 0 ? (
                    <div className={`products-${viewMode}`}>
                        {filteredData.map((product) => (
                            <div
                                key={product.id}
                                className={`product-card ${viewMode === 'list' ? 'list-view' : ''}`}
                                onClick={() => setSelectedProduct(product)}
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
                                                    handlePhoneCall();
                                                }}
                                                aria-label="Позвонить"
                                            >
                                                <FiPhone />
                                            </button>
                                            <button
                                                className="product-telegram-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleTelegram(product);
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
                ) : (
                    <div className="no-results">
                        <h3>Ничего не найдено</h3>
                        <p>Попробуйте изменить параметры фильтрации</p>
                        <button className="reset-btn" onClick={resetFilters}>
                            Сбросить фильтры
                        </button>
                    </div>
                )}
            </div>

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
                                    <button onClick={handlePhoneCall} className="modal-btn call-btn">
                                        <FiPhone className="btn-icon" />
                                        <span>Позвонить</span>
                                    </button>
                                    <button
                                        onClick={() => handleTelegram(selectedProduct)}
                                        className="modal-btn telegram-btn"
                                    >
                                        <FaTelegramPlane className="btn-icon" />
                                        <span>Telegram</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Catalog;