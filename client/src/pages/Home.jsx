import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchBox } from '../App.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { getFeaturedProducts } from '../services/api.js';

const TRENDING_TAGS = [
  'Cotton Shirts', 'Silk Sarees', 'Kurtis', 'iPhone 16',
  'HP Laptop', 'Running Shoes', 'boAt Earbuds', 'Smartwatches',
  'Luxury Perfumes', 'Milton Bottles'
];

const APPS = [
  { name: 'Flipkart', cls: 'flipkart', q: 'phone' },
  { name: 'Meesho', cls: 'meesho', q: 'saree' },
  { name: 'Nykaa', cls: 'nykaa', q: 'lipstick' },
  { name: 'Shopsy', cls: 'shopsy', q: 'tshirt' },
  { name: 'Croma', cls: 'croma', q: 'laptop' },
  { name: 'Amazon India', cls: 'amazon', q: 'earbuds' },
  { name: 'Myntra', cls: 'myntra', q: 'shirt' },
];

const CATEGORIES = [
  { icon: '👔', title: "Men's Fashion", sub: 'Shirts, T-Shirts, Jeans', q: 'shirt' },
  { icon: '👗', title: 'Sarees & Ethnic', sub: 'Silk, Cotton & Banarasi', q: 'saree' },
  { icon: '🥻', title: 'Kurtis & Dresses', sub: 'Anarkali, Kurtas & Tops', q: 'kurti' },
  { icon: '📱', title: 'Smartphones & 5G', sub: 'iPhone, Galaxy, OnePlus', q: 'phone' },
  { icon: '💻', title: 'Laptops & PCs', sub: 'MacBook, HP, Dell, Gaming', q: 'laptop' },
  { icon: '👟', title: 'Shoes & Sneakers', sub: 'Nike, Puma, Sparx, Crocs', q: 'shoes' },
  { icon: '⌚', title: 'Smartwatches', sub: 'Apple, boAt, Titan, Noise', q: 'watch' },
  { icon: '🎧', title: 'Audio & Earbuds', sub: 'AirPods, boAt, Sony, JBL', q: 'earbuds' },
  { icon: '💄', title: 'Beauty & Nykaa', sub: 'Perfumes, Makeup, Skincare', q: 'beauty' },
  { icon: '🏠', title: 'Home & Kitchen', sub: 'Mixer, Air Fryer, Bottles', q: 'mixer' },
  { icon: '🎒', title: 'Bags & Luggage', sub: 'Wildcraft, Trolley Suitcase', q: 'backpack' },
  { icon: '📺', title: '4K Smart TVs', sub: 'Samsung, OLED, Gaming PS5', q: 'tv' },
];

const to = q => `/search?q=${encodeURIComponent(q)}`;

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <>
      <section className="hero">
        <h1>Compare Prices Across India’s Top Online Shopping Apps</h1>
        <p>Find the best live listed prices across Flipkart, Meesho, Amazon, Myntra, Nykaa, Croma & more in ₹ (INR).</p>
        <SearchBox big />
        <div className="chips">
          {TRENDING_TAGS.map(t => (
            <Link key={t} to={to(t)}>🔥 {t}</Link>
          ))}
        </div>
      </section>

      {/* Supported Shopping Apps Strip */}
      <section className="wrap">
        <div className="apps-strip">
          <h3>Compare Live Products From Major Indian Apps</h3>
          <div className="apps-list">
            {APPS.map(app => (
              <Link key={app.name} to={to(app.q)} className={`app-badge ${app.cls}`}>
                ✓ {app.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="section-head">
          <div>
            <h2>Explore All Shopping Categories</h2>
            <p>Every major product line across online apps — nothing skipped</p>
          </div>
          <Link to={to('all')}>Browse All Products →</Link>
        </div>

        <div className="cat-grid-rich">
          {CATEGORIES.map(cat => (
            <Link key={cat.title} to={to(cat.q)} className="cat-card-rich">
              <span className="cat-icon">{cat.icon}</span>
              <span className="cat-title">{cat.title}</span>
              <span className="cat-sub">{cat.sub}</span>
            </Link>
          ))}
        </div>

        {/* Featured Live Comparison Deals */}
        <div className="section-head">
          <div>
            <h2>🔥 Trending Comparison Deals</h2>
            <p>Instant price comparison and highest savings across sellers</p>
          </div>
          <Link to={to('popular')}>View More Deals →</Link>
        </div>

        {loading ? (
          <div className="grid">
            {[1, 2, 3, 4].map(i => <div key={i} className="card skel" />)}
          </div>
        ) : (
          <div className="grid">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Why SmartCompare */}
        <div className="features-grid">
          <div className="feature-box">
            <div className="feat-icon">🛍️</div>
            <h4>All Online Apps in One Place</h4>
            <p>Never switch between Meesho, Flipkart, Amazon, and Myntra again. View all listed sellers side-by-side.</p>
          </div>
          <div className="feature-box">
            <div className="feat-icon">💰</div>
            <h4>Genuine ₹ (INR) Price Savings</h4>
            <p>We automatically highlight the lowest listed offer so you get the best deal every single time.</p>
          </div>
          <div className="feature-box">
            <div className="feat-icon">🔔</div>
            <h4>Price Drop Alerts</h4>
            <p>Set a target price on any smartphone, laptop, or dress and get notified when the price drops.</p>
          </div>
        </div>
      </section>
    </>
  );
}
