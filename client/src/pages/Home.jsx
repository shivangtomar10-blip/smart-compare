import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { getFeaturedProducts } from '../services/api.js';
import './Home.css';

const TRENDING_TAGS = [
  { name: 'Cotton Shirts', icon: '👕' },
  { name: 'Silk Sarees', icon: '👗' },
  { name: 'Kurtis', icon: '🥻' },
  { name: 'iPhone 16', icon: '📱' },
  { name: 'HP Laptop', icon: '💻' },
  { name: 'Running Shoes', icon: '👟' },
  { name: 'boAt Earbuds', icon: '🎧' },
  { name: 'Smartwatches', icon: '⌚' },
  { name: 'Luxury Perfumes', icon: '🧴' },
  { name: 'Milton Bottles', icon: '🍶' }
];

const STORE_APPS = [
  {
    name: 'Flipkart',
    cls: 'flipkart',
    q: 'phone',
    renderIcon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M6 8H18L19.5 20H4.5L6 8Z" fill="#2874f0" />
        <path d="M9 8V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V8" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 11V15M10 13H14" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: 'Meesho',
    cls: 'meesho',
    q: 'saree',
    renderIcon: () => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M5 19V9L9.5 15L14 9V19" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="18" cy="10" r="2.2" fill="#f43f5e" />
      </svg>
    )
  },
  {
    name: 'Nykaa',
    cls: 'nykaa',
    q: 'lipstick',
    renderIcon: () => (
      <span style={{ fontWeight: 900, fontSize: '0.82rem', letterSpacing: '-0.03em', color: '#fff' }}>NYK</span>
    )
  },
  {
    name: 'Shopsy',
    cls: 'shopsy',
    q: 'tshirt',
    renderIcon: () => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M6 9H18L19 20H5L6 9Z" fill="#ffffff" fillOpacity="0.2" stroke="#ffffff" strokeWidth="2" />
        <path d="M9 9V7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7V9" stroke="#ffffff" strokeWidth="2" />
        <text x="12" y="16.5" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">S</text>
      </svg>
    )
  },
  {
    name: 'Croma',
    cls: 'croma',
    q: 'laptop',
    renderIcon: () => (
      <span style={{ fontWeight: 900, fontSize: '1.25rem', color: '#ffffff' }}>C</span>
    )
  },
  {
    name: 'Amazon India',
    cls: 'amazon',
    q: 'earbuds',
    renderIcon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <text x="7" y="15" fill="#ffffff" fontSize="13" fontWeight="bold">a</text>
        <path d="M6 18C10 21 15 20.5 18 17.5" stroke="#ff9900" strokeWidth="2" strokeLinecap="round" />
        <polygon points="17,16 19,17.5 18,19.5" fill="#ff9900" />
      </svg>
    )
  },
  {
    name: 'Myntra',
    cls: 'myntra',
    q: 'shirt',
    renderIcon: () => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M4 17L8 7L12 14L16 7L20 17" stroke="#e11d48" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 7L12 14" stroke="#f59e0b" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
    )
  }
];

const CATEGORIES_8 = [
  {
    title: 'Mobiles & Tablets',
    count: '5000+ products',
    cls: 'cat-mobiles',
    icon: '📱',
    q: 'phone'
  },
  {
    title: 'Laptops & Computers',
    count: '3000+ products',
    cls: 'cat-laptops',
    icon: '💻',
    q: 'laptop'
  },
  {
    title: 'Fashion',
    count: '8000+ products',
    cls: 'cat-fashion',
    icon: '👗',
    q: 'fashion'
  },
  {
    title: 'Home & Kitchen',
    count: '4500+ products',
    cls: 'cat-kitchen',
    icon: '🍳',
    q: 'kitchen'
  },
  {
    title: 'Beauty & Personal Care',
    count: '6000+ products',
    cls: 'cat-beauty',
    icon: '💄',
    q: 'beauty'
  },
  {
    title: 'Sports & Fitness',
    count: '3500+ products',
    cls: 'cat-fitness',
    icon: '👟',
    q: 'shoes'
  },
  {
    title: 'Toys & Baby Care',
    count: '2500+ products',
    cls: 'cat-toys',
    icon: '🧸',
    q: 'toys'
  },
  {
    title: 'Books & Stationery',
    count: '4000+ products',
    cls: 'cat-books',
    icon: '📚',
    q: 'books'
  }
];

export default function Home() {
  const [searchVal, setSearchVal] = useState('');
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  const handleHeroSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim().length >= 2) {
      nav(`/search?q=${encodeURIComponent(searchVal.trim())}`);
    }
  };

  useEffect(() => {
    let cancelled = false;
    getFeaturedProducts()
      .then(prods => {
        if (!cancelled) {
          setFeatured(prods.slice(0, 8));
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="home-page">
      {/* ================= 1. ROYAL HERO SECTION ================= */}
      <section className="home-hero">
        <div className="home-hero-inner">
          {/* Left Column: Heading, Subtitle, Search Box, Chips */}
          <div className="hero-content-col">
            <div className="hero-pill-badge">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
              </svg>
              <span>Find the Best Deals Across All Stores</span>
            </div>

            <h1 className="hero-main-heading">
              Compare Products. <span className="hero-cyan-highlight">Save Money.</span>
            </h1>

            <p className="hero-description">
              Search for any product and instantly compare prices, delivery time, quality, return policy and more — across all major apps & websites.
            </p>

            {/* Main Rounded Floating Search Box */}
            <form onSubmit={handleHeroSubmit} className="hero-search-form" role="search">
              <svg className="hero-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="7" strokeWidth="2.2" />
                <line x1="16" y1="16" x2="21" y2="21" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search phones, laptops, shoes..."
                className="hero-search-input"
                aria-label="Search products"
              />
              <button type="submit" className="hero-search-btn">
                <span>Search</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 18L15 12L9 6" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>

            {/* Quick Trend Glass Chips */}
            <div className="hero-chips-wrap">
              {TRENDING_TAGS.map(tag => (
                <Link
                  key={tag.name}
                  to={`/search?q=${encodeURIComponent(tag.name)}`}
                  className="hero-glass-chip"
                >
                  <span className="hero-chip-icon">{tag.icon}</span>
                  <span>{tag.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Shopping Cart & Branded Badges Visual */}
          <div className="hero-visual-col">
            <div className="hero-img-container">
              <img
                src="/images/hero-cart.jpg"
                alt="SmartCompare 3D Shopping Cart Experience"
                className="hero-3d-cart-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. FLOATING APPS COMPARISON CARD ================= */}
      <section className="apps-showcase-wrapper">
        <div className="apps-showcase-card">
          {/* Left info box */}
          <div className="apps-card-left">
            <div className="apps-icon-badge">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20.59 13.41L13.42 20.58C13.0454 20.9547 12.5372 21.1654 12.0075 21.1654C11.4778 21.1654 10.9696 20.9547 10.595 20.58L2.41 12.41C2.15 12.15 2 11.79 2 11.41V4C2 2.9 2.9 2 4 2H11.41C11.79 2 12.15 2.15 12.41 2.41L20.59 10.59C21.37 11.37 21.37 12.63 20.59 13.41Z" strokeWidth="2" />
                <circle cx="7" cy="7" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <div className="apps-card-left-text">
              <h3>Compare Live Products from Major Indian Apps</h3>
              <p>Get the best prices, offers and deals from all top shopping platforms.</p>
            </div>
          </div>

          {/* Center: Store App Badges */}
          <div className="apps-store-icons-row">
            {STORE_APPS.map(app => (
              <Link
                key={app.name}
                to={`/search?q=${encodeURIComponent(app.q)}`}
                className="store-app-item"
                title={`Compare deals on ${app.name}`}
              >
                <div className={`store-app-box ${app.cls}`}>
                  {app.renderIcon()}
                </div>
                <span className="store-app-name">{app.name}</span>
              </Link>
            ))}
          </div>

          {/* Right: Value checklist */}
          <div className="apps-card-right">
            <div className="apps-feature-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20.59 13.41L13.42 20.58L2.41 12.41V4H10.41L20.59 13.41Z" strokeWidth="2.2" />
              </svg>
              <span>Best Prices</span>
            </div>
            <div className="apps-feature-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
              </svg>
              <span>Faster Delivery</span>
            </div>
            <div className="apps-feature-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span>Real Reviews</span>
            </div>
            <div className="apps-feature-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="23 4 23 10 17 10" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M20.49 15A9 9 0 1 1 21.21 8" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
              <span>Return Policy</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. EXPLORE ALL SHOPPING CATEGORIES (8 CARDS) ================= */}
      <section className="home-section-wrap">
        <div className="section-header-row">
          <div>
            <h2 className="section-header-title">
              <span>🔥</span>
              <span>Explore All Shopping Categories</span>
            </h2>
            <p className="section-header-sub">Every major product line across online apps — nothing skipped</p>
          </div>
          <Link to="/search?q=all" className="section-browse-link">
            <span>Browse All Products</span>
            <span>→</span>
          </Link>
        </div>

        <div className="categories-grid-8">
          {CATEGORIES_8.map(cat => (
            <Link
              key={cat.title}
              to={`/search?q=${encodeURIComponent(cat.q)}`}
              className={`category-rich-card ${cat.cls}`}
            >
              <div className="cat-visual-thumb">{cat.icon}</div>
              <h3 className="cat-card-title">{cat.title}</h3>
              <span className="cat-card-count">{cat.count}</span>
              <div className="cat-card-arrow">›</div>
            </Link>
          ))}
        </div>

        {/* ================= 4. TRENDING COMPARISON DEALS ================= */}
        <div className="section-header-row" style={{ marginTop: '3.5rem' }}>
          <div>
            <h2 className="section-header-title">
              <span>⚡</span>
              <span>Trending Live Comparison Deals</span>
            </h2>
            <p className="section-header-sub">Real-time price match across Flipkart, Meesho, Amazon, Myntra & more</p>
          </div>
          <Link to="/search?q=popular" className="section-browse-link">
            <span>View More Deals</span>
            <span>→</span>
          </Link>
        </div>

        {loading ? (
          <div className="grid">
            {[1, 2, 3, 4].map(i => <div key={i} className="card skel" style={{ height: '280px' }} />)}
          </div>
        ) : (
          <div className="grid">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* ================= 5. BOTTOM TRUST / GUARANTEE STRIP ================= */}
        <div className="bottom-trust-strip">
          <div className="trust-item">
            <div className="trust-item-icon">🛡️</div>
            <div className="trust-item-text">
              <h4>100% Genuine Products</h4>
              <p>Shop with confidence</p>
            </div>
          </div>

          <div className="trust-item">
            <div className="trust-item-icon">💎</div>
            <div className="trust-item-text">
              <h4>Best Deal Guaranteed</h4>
              <p>We find the lowest prices</p>
            </div>
          </div>

          <div className="trust-item">
            <div className="trust-item-icon">🧠</div>
            <div className="trust-item-text">
              <h4>Smart Shopping</h4>
              <p>Because you deserve the best</p>
            </div>
          </div>

          <div className="trust-brand-info">
            <div className="trust-brand-title">Smart<span>Compare</span></div>
            <div className="trust-brand-tagline">Compare. Save. Shop Smarter.</div>
          </div>
        </div>
      </section>
    </div>
  );
}
