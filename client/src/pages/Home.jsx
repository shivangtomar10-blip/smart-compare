import { Link } from 'react-router-dom';
import { SearchBox } from '../App.jsx';
const CATS = ['Smartphones', 'Laptops', 'Headphones', 'Smartwatches', 'Running shoes', 'Home appliances', 'Beauty', 'Books'];
const TRENDING = ['iPhone 17', 'HP laptop', 'Samsung phone', 'wireless headphones'];
const to = q => `/search?q=${encodeURIComponent(q)}`;
export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>Find the best listed price, across sellers.</h1>
        <p>Search any product and compare prices from the shopping sources we are connected to.</p>
        <SearchBox big />
        <div className="chips">{TRENDING.map(t => <Link key={t} to={to(t)}>{t}</Link>)}</div>
      </section>
      <section className="wrap"><h2>Popular categories</h2>
        <div className="grid cats">{CATS.map(c => <Link key={c} to={to(c)} className="card cat">{c}</Link>)}</div>
      </section>
    </>
  );
}
