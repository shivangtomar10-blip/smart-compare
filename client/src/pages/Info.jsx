const C = {
  about: ['About SmartCompare', 'SmartCompare gathers listed prices from the shopping sources it is connected to and shows them side by side. It never invents prices, and tells you when a source is unavailable.'],
  contact: ['Contact Us', 'Questions or feedback? Email support@smartcompare.example (replace with your address).'],
  privacy: ['Privacy Policy', 'We collect only what is needed to run your account (email, saved items). Passwords are stored hashed. We do not sell personal data. Edit this text for your deployment.'],
  terms: ['Terms and Conditions', 'Prices and availability come from third-party sellers and may change. Always confirm the final price at checkout. Edit this text for your deployment.'],
};
export default function Info({ page }) { const [t, b] = C[page]; return <div className="wrap narrow"><h2>{t}</h2><p>{b}</p></div>; }
