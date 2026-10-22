// High-Performance Curated Indian Shopping Catalog (Flipkart, Meesho, Amazon, Myntra, Nykaa, Croma)
export function getStoreSearchQuery(title = '', brand = '') {
  let clean = (title || '')
    .replace(/\b(true wireless earbuds|tws earbuds|with \d+h playtime|playtime & anc|active noise cancellation|slim fit casual|regular fit formal|running shoes black white|water resistant travel|magsafe case usb-c|pack of \d+|bluetooth calling|with \d+ modes|128gb storage|256gb storage|8gb ram|16gb ram|512gb ssd|thin & light|fhd laptop|pro 5g flagship edition|classic unisex comfortable lightweight|woven silk saree with blouse piece|art silk zari border festive saree|floral printed anarkali kurta set with pant|straight pure cotton embroidered kurti|511 slim fit stretchable denim|clean regular fit blue denim|fit & flare a-line casual floral|elegant bodycon evening party|bpa-free leak proof sports gym|insulated stainless steel hot & cold|eau de parfum long lasting luxury fragrance|fresh active no gas deodorant spray|43-inch 4k ultra hd smart google tv with dolby audio|55-inch frameless qled 4k smart cinema display|breathable lightweight athletic running|streetwear low-top lifestyle|premium quality standard edition|pro value pack for daily use|high performance advanced series)\b/gi, '')
    .replace(/[()[\]{},:;*~_+/\\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (brand && !clean.toLowerCase().includes(brand.toLowerCase())) {
    clean = `${brand} ${clean}`;
  }

  const words = clean.split(' ').filter(Boolean);
  return words.slice(0, 4).join(' ');
}

// High-resolution verified Unsplash product images
export const IMAGES = {
  shirt_formal: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&auto=format&fit=crop',
  shirt_casual: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop',
  shirt_check: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500&auto=format&fit=crop',
  tshirt: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop',
  tshirt_polo: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&auto=format&fit=crop',
  saree: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop',
  saree_silk: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500&auto=format&fit=crop',
  kurti: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop',
  jeans: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop',
  dress: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop',
  shopping_bag: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=500&auto=format&fit=crop',
  nike_shoes: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop',
  adidas_shoes: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=500&auto=format&fit=crop',
  puma_sneakers: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&auto=format&fit=crop',
  formal_shoes: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500&auto=format&fit=crop',
  crocs_clogs: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&auto=format&fit=crop',
  shoes_sports: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&auto=format&fit=crop',
  electric_toothbrush: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=500&auto=format&fit=crop',
  manual_toothbrush: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=500&auto=format&fit=crop',
  hair_brush: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop',
  apple_charger: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&auto=format&fit=crop',
  samsung_charger: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=500&auto=format&fit=crop',
  anker_charger: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=500&auto=format&fit=crop',
  iphone16: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&auto=format&fit=crop',
  iphone15: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&auto=format&fit=crop',
  samsung_s24: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&auto=format&fit=crop',
  oneplus12: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop',
  hp_pavilion: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop',
  hp_envy: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&auto=format&fit=crop',
  macbook_air: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&auto=format&fit=crop',
  dell_xps: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop',
  sony_headphones: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop',
  airpods_pro: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&auto=format&fit=crop',
  boat_headphones: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&auto=format&fit=crop',
  earbuds: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop',
  earbuds_black: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&auto=format&fit=crop',
  earbuds_white: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&auto=format&fit=crop',
  tv: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&auto=format&fit=crop',
  apple_watch: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop',
  smartwatch_boat: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop',
  watch_analog: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&auto=format&fit=crop',
  perfume: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&auto=format&fit=crop',
  lipstick: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&auto=format&fit=crop',
  water_bottle: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop',
  mixer_grinder: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500&auto=format&fit=crop',
  backpack: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop',
  neutral_product: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop',
};

export const RAW_PRODUCTS = [
  // ===================== EARBUDS, TWS & AUDIO =====================
  {
    title: 'boAt Airdopes 141 True Wireless Earbuds with 42H Playtime',
    brand: 'boAt',
    searchQuery: 'boAt Airdopes 141',
    image: IMAGES.earbuds,
    tags: 'popular boat airdopes 141 earbuds earbud tws wireless bluetooth earphones audio headphones',
    offers: [
      { seller: 'Meesho', price: 999, originalPrice: 4490, rating: 4.5, reviewCount: 28400 },
      { seller: 'Flipkart', price: 1099, originalPrice: 4490, rating: 4.5, reviewCount: 34100 },
      { seller: 'Amazon India', price: 1199, originalPrice: 4490, rating: 4.6, reviewCount: 18900 },
    ]
  },
  {
    title: 'OnePlus Nord Buds 2 TWS with 25dB Active Noise Cancellation',
    brand: 'OnePlus',
    searchQuery: 'OnePlus Nord Buds 2',
    image: IMAGES.earbuds_black,
    tags: 'popular oneplus nord buds 2 earbuds earbud tws anc wireless bluetooth earphones audio',
    offers: [
      { seller: 'Meesho', price: 2299, originalPrice: 3299, rating: 4.6, reviewCount: 12400 },
      { seller: 'Flipkart', price: 2499, originalPrice: 3299, rating: 4.6, reviewCount: 16800 },
      { seller: 'Amazon India', price: 2699, originalPrice: 3299, rating: 4.7, reviewCount: 9400 },
    ]
  },
  {
    title: 'Realme Buds T300 TWS with 30dB ANC & 360 Spatial Audio',
    brand: 'Realme',
    searchQuery: 'Realme Buds T300',
    image: IMAGES.earbuds_white,
    tags: 'realme buds t300 earbuds earbud tws anc wireless bluetooth earphones audio',
    offers: [
      { seller: 'Meesho', price: 1999, originalPrice: 3999, rating: 4.5, reviewCount: 8900 },
      { seller: 'Flipkart', price: 2199, originalPrice: 3999, rating: 4.5, reviewCount: 11200 },
      { seller: 'Amazon India', price: 2299, originalPrice: 3999, rating: 4.6, reviewCount: 6800 },
    ]
  },
  {
    title: 'boAt Nirvana Ion True Wireless Earbuds with 120H Playtime',
    brand: 'boAt',
    searchQuery: 'boAt Nirvana Ion',
    image: IMAGES.earbuds,
    tags: 'boat nirvana ion earbuds earbud tws wireless bluetooth earphones audio',
    offers: [
      { seller: 'Meesho', price: 1899, originalPrice: 7990, rating: 4.6, reviewCount: 14200 },
      { seller: 'Flipkart', price: 1999, originalPrice: 7990, rating: 4.6, reviewCount: 22100 },
      { seller: 'Amazon India', price: 2199, originalPrice: 7990, rating: 4.6, reviewCount: 11500 },
    ]
  },
  {
    title: 'Boult Audio Z40 True Wireless Earbuds with 60H Playtime',
    brand: 'Boult Audio',
    searchQuery: 'Boult Audio Z40',
    image: IMAGES.earbuds_white,
    tags: 'boult audio z40 earbuds earbud tws wireless bluetooth earphones audio',
    offers: [
      { seller: 'Meesho', price: 1099, originalPrice: 4999, rating: 4.4, reviewCount: 18400 },
      { seller: 'Flipkart', price: 1199, originalPrice: 4999, rating: 4.4, reviewCount: 24500 },
      { seller: 'Amazon India', price: 1299, originalPrice: 4999, rating: 4.5, reviewCount: 12100 },
    ]
  },
  {
    title: 'Noise Buds VS102 with 50H Playtime and Instacharge',
    brand: 'Noise',
    searchQuery: 'Noise Buds VS102',
    image: IMAGES.earbuds_black,
    tags: 'noise buds vs102 earbuds earbud tws wireless bluetooth earphones audio',
    offers: [
      { seller: 'Meesho', price: 899, originalPrice: 2999, rating: 4.4, reviewCount: 16800 },
      { seller: 'Flipkart', price: 999, originalPrice: 2999, rating: 4.4, reviewCount: 21300 },
      { seller: 'Amazon India', price: 1099, originalPrice: 2999, rating: 4.5, reviewCount: 8900 },
    ]
  },
  {
    title: 'JBL Wave Flex True Wireless Earbuds with Deep Bass',
    brand: 'JBL',
    searchQuery: 'JBL Wave Flex',
    image: IMAGES.earbuds_white,
    tags: 'jbl wave flex earbuds earbud tws wireless bluetooth earphones audio bass',
    offers: [
      { seller: 'Meesho', price: 2799, originalPrice: 4999, rating: 4.5, reviewCount: 5200 },
      { seller: 'Flipkart', price: 2999, originalPrice: 4999, rating: 4.5, reviewCount: 8100 },
      { seller: 'Amazon India', price: 3199, originalPrice: 4999, rating: 4.6, reviewCount: 4300 },
    ]
  },
  {
    title: 'Sony WF-C500 Truly Wireless Bluetooth Earbuds',
    brand: 'Sony',
    searchQuery: 'Sony WF C500',
    image: IMAGES.earbuds_black,
    tags: 'sony wf-c500 wf c500 earbuds earbud tws wireless bluetooth earphones audio',
    offers: [
      { seller: 'Amazon India', price: 4490, originalPrice: 8990, rating: 4.6, reviewCount: 3800 },
      { seller: 'Flipkart', price: 4690, originalPrice: 8990, rating: 4.5, reviewCount: 4200 },
      { seller: 'Croma', price: 4990, originalPrice: 8990, rating: 4.6, reviewCount: 1100 },
    ]
  },
  {
    title: 'Apple AirPods Pro (2nd Generation) MagSafe Case USB-C',
    brand: 'Apple',
    searchQuery: 'Apple AirPods Pro 2',
    image: IMAGES.airpods_pro,
    tags: 'airpods pro apple earphones wireless earbuds audio apple anc tws',
    offers: [
      { seller: 'Amazon India', price: 20999, originalPrice: 24900, rating: 4.8, reviewCount: 4120 },
      { seller: 'Flipkart', price: 21999, originalPrice: 24900, rating: 4.7, reviewCount: 2800 },
      { seller: 'Croma', price: 22990, originalPrice: 24900, rating: 4.8, reviewCount: 890 },
    ]
  },
  {
    title: 'boAt Rockerz 450 Bluetooth Wireless On-Ear Headphones',
    brand: 'boAt',
    searchQuery: 'boAt Rockerz 450',
    image: IMAGES.boat_headphones,
    tags: 'boat rockerz 450 headphones wireless bluetooth on-ear audio sound earbuds',
    offers: [
      { seller: 'Meesho', price: 1299, originalPrice: 3990, rating: 4.5, reviewCount: 32400 },
      { seller: 'Flipkart', price: 1399, originalPrice: 3990, rating: 4.5, reviewCount: 41200 },
      { seller: 'Amazon India', price: 1449, originalPrice: 3990, rating: 4.5, reviewCount: 22100 },
    ]
  },
  {
    title: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
    brand: 'Sony',
    searchQuery: 'Sony WH 1000XM5',
    image: IMAGES.sony_headphones,
    tags: 'sony wh-1000xm5 headphones wireless noise canceling audio anc',
    offers: [
      { seller: 'Amazon India', price: 26990, originalPrice: 34990, rating: 4.8, reviewCount: 3420 },
      { seller: 'Flipkart', price: 28490, originalPrice: 34990, rating: 4.7, reviewCount: 1120 },
      { seller: 'Croma', price: 28990, originalPrice: 34990, rating: 4.8, reviewCount: 950 },
    ]
  },

  // ===================== SMARTPHONES & 5G MOBILES =====================
  {
    title: 'Apple iPhone 16 (128GB Storage, Teal)',
    brand: 'Apple',
    searchQuery: 'iPhone 16 128GB',
    image: IMAGES.iphone16,
    tags: 'popular apple iphone 16 128gb smartphone mobile phone 5g ios',
    offers: [
      { seller: 'Flipkart', price: 75999, originalPrice: 79900, rating: 4.7, reviewCount: 1420 },
      { seller: 'Amazon India', price: 77900, originalPrice: 79900, rating: 4.8, reviewCount: 2100 },
      { seller: 'Croma', price: 79900, originalPrice: 79900, rating: 4.8, reviewCount: 650 },
    ]
  },
  {
    title: 'Apple iPhone 15 (128GB Storage, Black)',
    brand: 'Apple',
    searchQuery: 'iPhone 15 128GB',
    image: IMAGES.iphone15,
    tags: 'popular apple iphone 15 128gb smartphone mobile phone 5g ios',
    offers: [
      { seller: 'Flipkart', price: 57999, originalPrice: 69900, rating: 4.7, reviewCount: 8420 },
      { seller: 'Amazon India', price: 58999, originalPrice: 69900, rating: 4.8, reviewCount: 9500 },
      { seller: 'Croma', price: 60900, originalPrice: 69900, rating: 4.8, reviewCount: 1450 },
    ]
  },
  {
    title: 'Samsung Galaxy S24 5G (8GB RAM, 128GB Storage)',
    brand: 'Samsung',
    searchQuery: 'Samsung Galaxy S24 5G',
    image: IMAGES.samsung_s24,
    tags: 'popular samsung galaxy s24 5g smartphone mobile phone android ai',
    offers: [
      { seller: 'Amazon India', price: 62999, originalPrice: 79999, rating: 4.7, reviewCount: 3100 },
      { seller: 'Flipkart', price: 64999, originalPrice: 79999, rating: 4.6, reviewCount: 4200 },
      { seller: 'Croma', price: 66990, originalPrice: 79999, rating: 4.7, reviewCount: 890 },
    ]
  },
  {
    title: 'Samsung Galaxy M35 5G (6GB RAM, 128GB Storage)',
    brand: 'Samsung',
    searchQuery: 'Samsung Galaxy M35 5G',
    image: IMAGES.samsung_s24,
    tags: 'samsung galaxy m35 5g smartphone mobile phone android battery 6000mah',
    offers: [
      { seller: 'Amazon India', price: 14999, originalPrice: 19999, rating: 4.5, reviewCount: 14200 },
      { seller: 'Flipkart', price: 15499, originalPrice: 19999, rating: 4.5, reviewCount: 18400 },
      { seller: 'Croma', price: 16999, originalPrice: 19999, rating: 4.6, reviewCount: 2100 },
    ]
  },
  {
    title: 'OnePlus 12R 5G (8GB RAM, 128GB Storage, Cool Blue)',
    brand: 'OnePlus',
    searchQuery: 'OnePlus 12R 5G',
    image: IMAGES.oneplus12,
    tags: 'popular oneplus 12r 5g smartphone mobile phone android fast charging flagship',
    offers: [
      { seller: 'Amazon India', price: 38999, originalPrice: 39999, rating: 4.7, reviewCount: 6800 },
      { seller: 'Flipkart', price: 39499, originalPrice: 39999, rating: 4.6, reviewCount: 5400 },
      { seller: 'Croma', price: 39999, originalPrice: 39999, rating: 4.7, reviewCount: 1200 },
    ]
  },
  {
    title: 'OnePlus Nord CE 4 5G (8GB RAM, 128GB Storage)',
    brand: 'OnePlus',
    searchQuery: 'OnePlus Nord CE 4',
    image: IMAGES.oneplus12,
    tags: 'popular oneplus nord ce 4 5g smartphone mobile phone android 100w charging',
    offers: [
      { seller: 'Amazon India', price: 24999, originalPrice: 26999, rating: 4.6, reviewCount: 8900 },
      { seller: 'Flipkart', price: 25499, originalPrice: 26999, rating: 4.6, reviewCount: 7800 },
      { seller: 'Croma', price: 25999, originalPrice: 26999, rating: 4.6, reviewCount: 1500 },
    ]
  },
  {
    title: 'Redmi Note 13 Pro 5G (8GB RAM, 128GB Storage)',
    brand: 'Redmi',
    searchQuery: 'Redmi Note 13 Pro 5G',
    image: IMAGES.iphone15,
    tags: 'redmi note 13 pro 5g xiaomi smartphone mobile phone 200mp camera',
    offers: [
      { seller: 'Flipkart', price: 21999, originalPrice: 28999, rating: 4.5, reviewCount: 22100 },
      { seller: 'Amazon India', price: 22499, originalPrice: 28999, rating: 4.5, reviewCount: 14500 },
      { seller: 'Croma', price: 23999, originalPrice: 28999, rating: 4.6, reviewCount: 1800 },
    ]
  },
  {
    title: 'Realme 12 Pro 5G (8GB RAM, 128GB Storage)',
    brand: 'Realme',
    searchQuery: 'Realme 12 Pro 5G',
    image: IMAGES.samsung_s24,
    tags: 'realme 12 pro 5g smartphone mobile phone periscope telephoto camera',
    offers: [
      { seller: 'Flipkart', price: 22999, originalPrice: 29999, rating: 4.5, reviewCount: 16800 },
      { seller: 'Amazon India', price: 23499, originalPrice: 29999, rating: 4.5, reviewCount: 11200 },
      { seller: 'Croma', price: 24999, originalPrice: 29999, rating: 4.5, reviewCount: 1200 },
    ]
  },
  {
    title: 'Vivo T3 5G (8GB RAM, 128GB Storage)',
    brand: 'Vivo',
    searchQuery: 'Vivo T3 5G',
    image: IMAGES.samsung_s24,
    tags: 'vivo t3 5g smartphone mobile phone amoled 50mp sony camera',
    offers: [
      { seller: 'Flipkart', price: 19999, originalPrice: 22999, rating: 4.5, reviewCount: 19400 },
      { seller: 'Amazon India', price: 20499, originalPrice: 22999, rating: 4.5, reviewCount: 9200 },
      { seller: 'Croma', price: 21999, originalPrice: 22999, rating: 4.5, reviewCount: 1400 },
    ]
  },

  // ===================== SMARTWATCHES & WEARABLES =====================
  {
    title: 'boAt Wave Call Smartwatch with Bluetooth Calling 1.69 Display',
    brand: 'boAt',
    searchQuery: 'boAt Wave Call',
    image: IMAGES.smartwatch_boat,
    tags: 'popular boat wave call smartwatch fitness bluetooth calling watch wearable',
    offers: [
      { seller: 'Meesho', price: 1299, originalPrice: 7990, rating: 4.5, reviewCount: 18200 },
      { seller: 'Flipkart', price: 1399, originalPrice: 7990, rating: 4.5, reviewCount: 22400 },
      { seller: 'Amazon India', price: 1499, originalPrice: 7990, rating: 4.6, reviewCount: 11500 },
    ]
  },
  {
    title: 'Noise ColorFit Pulse 2 Max 1.85 Display Bluetooth Smartwatch',
    brand: 'Noise',
    searchQuery: 'Noise ColorFit Pulse 2 Max',
    image: IMAGES.smartwatch_boat,
    tags: 'popular noise colorfit pulse 2 max smartwatch watch fitness bluetooth calling',
    offers: [
      { seller: 'Meesho', price: 1199, originalPrice: 5999, rating: 4.5, reviewCount: 24100 },
      { seller: 'Flipkart', price: 1299, originalPrice: 5999, rating: 4.5, reviewCount: 31200 },
      { seller: 'Amazon India', price: 1399, originalPrice: 5999, rating: 4.6, reviewCount: 16500 },
    ]
  },
  {
    title: 'Fire-Boltt Ninja Call Pro Plus 1.83 Smartwatch with AI Voice',
    brand: 'Fire-Boltt',
    searchQuery: 'Fire-Boltt Ninja Call Pro Plus',
    image: IMAGES.smartwatch_boat,
    tags: 'fire-boltt ninja call pro plus smartwatch watch fitness bluetooth calling',
    offers: [
      { seller: 'Meesho', price: 1099, originalPrice: 9999, rating: 4.4, reviewCount: 19800 },
      { seller: 'Flipkart', price: 1199, originalPrice: 9999, rating: 4.4, reviewCount: 26400 },
      { seller: 'Amazon India', price: 1299, originalPrice: 9999, rating: 4.5, reviewCount: 14200 },
    ]
  },
  {
    title: 'Fastrack Limitless FS1 Pro 1.96 AMOLED Display Smartwatch',
    brand: 'Fastrack',
    searchQuery: 'Fastrack Limitless FS1',
    image: IMAGES.smartwatch_boat,
    tags: 'fastrack limitless fs1 pro smartwatch watch fitness amoled calling',
    offers: [
      { seller: 'Meesho', price: 1795, originalPrice: 3995, rating: 4.5, reviewCount: 8400 },
      { seller: 'Flipkart', price: 1895, originalPrice: 3995, rating: 4.5, reviewCount: 11200 },
      { seller: 'Amazon India', price: 1995, originalPrice: 3995, rating: 4.6, reviewCount: 6200 },
    ]
  },
  {
    title: 'Apple Watch Series 9 GPS 45mm Midnight Aluminum Case',
    brand: 'Apple',
    searchQuery: 'Apple Watch Series 9',
    image: IMAGES.apple_watch,
    tags: 'popular apple watch series 9 smartwatch wearable fitness gps 45mm watch',
    offers: [
      { seller: 'Amazon India', price: 38900, originalPrice: 44900, rating: 4.8, reviewCount: 1450 },
      { seller: 'Croma', price: 41900, originalPrice: 44900, rating: 4.8, reviewCount: 540 },
      { seller: 'Flipkart', price: 42490, originalPrice: 44900, rating: 4.7, reviewCount: 680 },
    ]
  },
  {
    title: 'Samsung Galaxy Watch 6 Bluetooth 40mm (Graphite)',
    brand: 'Samsung',
    searchQuery: 'Samsung Galaxy Watch 6',
    image: IMAGES.apple_watch,
    tags: 'samsung galaxy watch 6 smartwatch wearable fitness wear os watch',
    offers: [
      { seller: 'Amazon India', price: 18999, originalPrice: 29999, rating: 4.7, reviewCount: 1890 },
      { seller: 'Flipkart', price: 19499, originalPrice: 29999, rating: 4.6, reviewCount: 2200 },
      { seller: 'Croma', price: 21990, originalPrice: 29999, rating: 4.7, reviewCount: 620 },
    ]
  },
  {
    title: 'Titan Karishma Analog Men Black Dial Classic Watch',
    brand: 'Titan',
    searchQuery: 'Titan Karishma Watch',
    image: IMAGES.watch_analog,
    tags: 'titan karishma analog watch men black dial classic watch formal',
    offers: [
      { seller: 'Amazon India', price: 2195, originalPrice: 2495, rating: 4.7, reviewCount: 8400 },
      { seller: 'Flipkart', price: 2295, originalPrice: 2495, rating: 4.6, reviewCount: 9200 },
      { seller: 'Meesho', price: 2150, originalPrice: 2495, rating: 4.6, reviewCount: 3100 },
    ]
  },

  // ===================== SHOES, SNEAKERS & FOOTWEAR =====================
  {
    title: 'Nike Air Zoom Pegasus 40 Running Shoes Black White',
    brand: 'Nike',
    searchQuery: 'Nike Air Zoom Pegasus 40',
    image: IMAGES.nike_shoes,
    tags: 'popular nike air zoom pegasus 40 running shoes sneakers sports athletics footwear shoe',
    offers: [
      { seller: 'Myntra', price: 6999, originalPrice: 10495, rating: 4.7, reviewCount: 890 },
      { seller: 'Flipkart', price: 7495, originalPrice: 10495, rating: 4.7, reviewCount: 1420 },
      { seller: 'Amazon India', price: 7799, originalPrice: 10495, rating: 4.6, reviewCount: 1100 },
    ]
  },
  {
    title: 'Nike Revolution 6 Next Nature Men Running Shoes',
    brand: 'Nike',
    searchQuery: 'Nike Revolution 6',
    image: IMAGES.nike_shoes,
    tags: 'popular nike revolution 6 running shoes sneakers sports footwear shoe',
    offers: [
      { seller: 'Myntra', price: 2799, originalPrice: 3695, rating: 4.6, reviewCount: 4200 },
      { seller: 'Flipkart', price: 2995, originalPrice: 3695, rating: 4.5, reviewCount: 6800 },
      { seller: 'Amazon India', price: 3199, originalPrice: 3695, rating: 4.6, reviewCount: 3900 },
    ]
  },
  {
    title: 'Puma Men Smashic Casual White Sneakers',
    brand: 'Puma',
    searchQuery: 'Puma Smashic Sneakers',
    image: IMAGES.puma_sneakers,
    tags: 'popular puma smashic sneakers white casual shoes men footwear shoe',
    offers: [
      { seller: 'Meesho', price: 1799, originalPrice: 4499, rating: 4.6, reviewCount: 9400 },
      { seller: 'Flipkart', price: 1899, originalPrice: 4499, rating: 4.5, reviewCount: 14200 },
      { seller: 'Amazon India', price: 1999, originalPrice: 4499, rating: 4.6, reviewCount: 8100 },
      { seller: 'Myntra', price: 2099, originalPrice: 4499, rating: 4.7, reviewCount: 5200 },
    ]
  },
  {
    title: 'Sparx Men Lightweight Running Sports Shoes (SM-648)',
    brand: 'Sparx',
    searchQuery: 'Sparx Running Shoes',
    image: IMAGES.shoes_sports,
    tags: 'popular sparx running sports shoes lightweight footwear men shoe',
    offers: [
      { seller: 'Meesho', price: 849, originalPrice: 1299, rating: 4.5, reviewCount: 18400 },
      { seller: 'Flipkart', price: 899, originalPrice: 1299, rating: 4.5, reviewCount: 22100 },
      { seller: 'Amazon India', price: 949, originalPrice: 1299, rating: 4.6, reviewCount: 11200 },
    ]
  },
  {
    title: 'Asian Men Rider-01 Lightweight Running Sports Shoes',
    brand: 'Asian',
    searchQuery: 'Asian Rider Running Shoes',
    image: IMAGES.shoes_sports,
    tags: 'asian rider running sports shoes lightweight footwear men shoe budget',
    offers: [
      { seller: 'Meesho', price: 699, originalPrice: 1199, rating: 4.5, reviewCount: 31200 },
      { seller: 'Flipkart', price: 749, originalPrice: 1199, rating: 4.5, reviewCount: 42100 },
      { seller: 'Amazon India', price: 799, originalPrice: 1199, rating: 4.6, reviewCount: 28400 },
    ]
  },
  {
    title: 'Campus Men Oxyfit Walking & Running Shoes',
    brand: 'Campus',
    searchQuery: 'Campus Oxyfit Shoes',
    image: IMAGES.shoes_sports,
    tags: 'campus oxyfit walking running shoes sports footwear men shoe',
    offers: [
      { seller: 'Meesho', price: 899, originalPrice: 1399, rating: 4.5, reviewCount: 14200 },
      { seller: 'Flipkart', price: 949, originalPrice: 1399, rating: 4.5, reviewCount: 19800 },
      { seller: 'Amazon India', price: 999, originalPrice: 1399, rating: 4.6, reviewCount: 11400 },
    ]
  },
  {
    title: 'Crocs Classic Unisex Comfortable Lightweight Clogs',
    brand: 'Crocs',
    searchQuery: 'Crocs Classic Clogs',
    image: IMAGES.crocs_clogs,
    tags: 'popular crocs classic clogs footwear unisex lightweight sandals shoes shoe',
    offers: [
      { seller: 'Myntra', price: 2199, originalPrice: 3995, rating: 4.7, reviewCount: 8400 },
      { seller: 'Amazon India', price: 2399, originalPrice: 3995, rating: 4.7, reviewCount: 9200 },
      { seller: 'Flipkart', price: 2495, originalPrice: 3995, rating: 4.6, reviewCount: 6800 },
    ]
  },
  {
    title: 'Red Tape Men Classic Lightweight Casual Sneakers',
    brand: 'Red Tape',
    searchQuery: 'Red Tape Sneakers',
    image: IMAGES.puma_sneakers,
    tags: 'red tape sneakers casual shoes men white walking footwear shoe',
    offers: [
      { seller: 'Meesho', price: 1199, originalPrice: 5299, rating: 4.5, reviewCount: 21400 },
      { seller: 'Flipkart', price: 1299, originalPrice: 5299, rating: 4.5, reviewCount: 29800 },
      { seller: 'Amazon India', price: 1399, originalPrice: 5299, rating: 4.6, reviewCount: 16500 },
      { seller: 'Myntra', price: 1499, originalPrice: 5299, rating: 4.6, reviewCount: 9800 },
    ]
  },

  // ===================== MEN'S FASHION: SHIRTS, T-SHIRTS, JEANS =====================
  {
    title: 'Dennis Lingo Men Slim Fit Casual Cotton Shirt',
    brand: 'Dennis Lingo',
    searchQuery: 'Dennis Lingo Casual Shirt',
    image: IMAGES.shirt_casual,
    tags: 'popular shirt casual cotton dennis lingo men slim fit fashion clothing apparel top',
    offers: [
      { seller: 'Meesho', price: 599, originalPrice: 1849, rating: 4.6, reviewCount: 8400 },
      { seller: 'Flipkart', price: 649, originalPrice: 1849, rating: 4.5, reviewCount: 11200 },
      { seller: 'Amazon India', price: 699, originalPrice: 1849, rating: 4.6, reviewCount: 6500 },
      { seller: 'Myntra', price: 749, originalPrice: 1849, rating: 4.7, reviewCount: 3900 },
    ]
  },
  {
    title: 'Allen Solly Men Regular Fit Formal Cotton Shirt',
    brand: 'Allen Solly',
    searchQuery: 'Allen Solly Formal Shirt',
    image: IMAGES.shirt_formal,
    tags: 'shirt formal allen solly men regular fit cotton office wear clothing apparel',
    offers: [
      { seller: 'Meesho', price: 899, originalPrice: 1899, rating: 4.7, reviewCount: 4200 },
      { seller: 'Flipkart', price: 999, originalPrice: 1899, rating: 4.6, reviewCount: 7800 },
      { seller: 'Amazon India', price: 1049, originalPrice: 1899, rating: 4.7, reviewCount: 5600 },
      { seller: 'Myntra', price: 1099, originalPrice: 1899, rating: 4.8, reviewCount: 2900 },
    ]
  },
  {
    title: 'Roadster Men Buffalo Checked Casual Pure Cotton Shirt',
    brand: 'Roadster',
    searchQuery: 'Roadster Checked Shirt',
    image: IMAGES.shirt_check,
    tags: 'shirt check checked roadster casual cotton men clothing apparel',
    offers: [
      { seller: 'Meesho', price: 499, originalPrice: 1499, rating: 4.5, reviewCount: 9300 },
      { seller: 'Flipkart', price: 549, originalPrice: 1499, rating: 4.5, reviewCount: 14200 },
      { seller: 'Amazon India', price: 599, originalPrice: 1499, rating: 4.6, reviewCount: 6800 },
      { seller: 'Myntra', price: 649, originalPrice: 1499, rating: 4.6, reviewCount: 8100 },
    ]
  },
  {
    title: 'Puma Men Classic Solid Round Neck Pure Cotton T-Shirt',
    brand: 'Puma',
    searchQuery: 'Puma Round Neck T-Shirt',
    image: IMAGES.tshirt,
    tags: 'popular tshirt t-shirt puma round neck solid cotton men clothing tee casual',
    offers: [
      { seller: 'Meesho', price: 399, originalPrice: 999, rating: 4.6, reviewCount: 12400 },
      { seller: 'Flipkart', price: 449, originalPrice: 999, rating: 4.5, reviewCount: 18900 },
      { seller: 'Amazon India', price: 499, originalPrice: 999, rating: 4.6, reviewCount: 9400 },
      { seller: 'Myntra', price: 549, originalPrice: 999, rating: 4.7, reviewCount: 5200 },
    ]
  },
  {
    title: 'U.S. Polo Assn. Men Solid Polo Collar T-Shirt',
    brand: 'USPA',
    searchQuery: 'US Polo T-Shirt',
    image: IMAGES.tshirt_polo,
    tags: 'tshirt t-shirt polo us polo uspa collar cotton men clothing',
    offers: [
      { seller: 'Meesho', price: 699, originalPrice: 1499, rating: 4.7, reviewCount: 5100 },
      { seller: 'Flipkart', price: 749, originalPrice: 1499, rating: 4.6, reviewCount: 8200 },
      { seller: 'Amazon India', price: 799, originalPrice: 1499, rating: 4.7, reviewCount: 4600 },
    ]
  },
  {
    title: "Levi's Men 511 Slim Fit Stretchable Denim Jeans",
    brand: "Levi's",
    searchQuery: 'Levis 511 Jeans',
    image: IMAGES.jeans,
    tags: 'popular jeans denim levis slim fit 511 men pant stretchable clothing trousers',
    offers: [
      { seller: 'Meesho', price: 1499, originalPrice: 3199, rating: 4.7, reviewCount: 4300 },
      { seller: 'Flipkart', price: 1699, originalPrice: 3199, rating: 4.6, reviewCount: 8900 },
      { seller: 'Amazon India', price: 1799, originalPrice: 3199, rating: 4.7, reviewCount: 9200 },
      { seller: 'Myntra', price: 1899, originalPrice: 3199, rating: 4.8, reviewCount: 5400 },
    ]
  },

  // ===================== WOMEN'S ETHNIC, SAREES & KURTIS =====================
  {
    title: 'Kanjivaram Soft Woven Silk Saree with Blouse Piece',
    brand: 'Kalyan Silks',
    searchQuery: 'Kanjivaram Silk Saree',
    image: IMAGES.saree_silk,
    tags: 'popular saree silk kanjivaram woven ethnic women traditional dress clothing wedding',
    offers: [
      { seller: 'Meesho', price: 699, originalPrice: 2999, rating: 4.7, reviewCount: 15400 },
      { seller: 'Flipkart', price: 799, originalPrice: 2999, rating: 4.6, reviewCount: 18900 },
      { seller: 'Amazon India', price: 849, originalPrice: 2999, rating: 4.7, reviewCount: 9200 },
      { seller: 'Myntra', price: 899, originalPrice: 2999, rating: 4.8, reviewCount: 4100 },
    ]
  },
  {
    title: 'Banarasi Art Silk Zari Border Festive Saree',
    brand: 'Varkha Fashion',
    searchQuery: 'Banarasi Silk Saree',
    image: IMAGES.saree,
    tags: 'saree banarasi silk zari border ethnic women clothing wedding festive',
    offers: [
      { seller: 'Meesho', price: 549, originalPrice: 2499, rating: 4.5, reviewCount: 11200 },
      { seller: 'Flipkart', price: 599, originalPrice: 2499, rating: 4.5, reviewCount: 14500 },
      { seller: 'Amazon India', price: 649, originalPrice: 2499, rating: 4.6, reviewCount: 7200 },
    ]
  },
  {
    title: 'GoSriKi Women Floral Printed Anarkali Kurta Set with Pant',
    brand: 'GoSriKi',
    searchQuery: 'GoSriKi Anarkali Kurta',
    image: IMAGES.kurti,
    tags: 'popular kurti kurta anarkali gosriki women dress ethnic floral set clothing',
    offers: [
      { seller: 'Meesho', price: 499, originalPrice: 2599, rating: 4.6, reviewCount: 19800 },
      { seller: 'Flipkart', price: 549, originalPrice: 2599, rating: 4.5, reviewCount: 24300 },
      { seller: 'Amazon India', price: 599, originalPrice: 2599, rating: 4.6, reviewCount: 12100 },
      { seller: 'Myntra', price: 649, originalPrice: 2599, rating: 4.7, reviewCount: 7800 },
    ]
  },
  {
    title: 'Biba Women Straight Pure Cotton Embroidered Kurti',
    brand: 'Biba',
    searchQuery: 'Biba Cotton Kurti',
    image: IMAGES.kurti,
    tags: 'kurti biba straight embroidered cotton kurta ethnic women clothing',
    offers: [
      { seller: 'Meesho', price: 899, originalPrice: 1999, rating: 4.7, reviewCount: 6200 },
      { seller: 'Flipkart', price: 999, originalPrice: 1999, rating: 4.6, reviewCount: 8400 },
      { seller: 'Amazon India', price: 1049, originalPrice: 1999, rating: 4.7, reviewCount: 4300 },
      { seller: 'Myntra', price: 1099, originalPrice: 1999, rating: 4.8, reviewCount: 5100 },
    ]
  },

  // ===================== LAPTOPS & COMPUTERS =====================
  {
    title: 'Apple MacBook Air M2 (8GB RAM, 256GB SSD, Midnight)',
    brand: 'Apple',
    searchQuery: 'MacBook Air M2',
    image: IMAGES.macbook_air,
    tags: 'popular macbook air m2 apple laptop computer notebook macos',
    offers: [
      { seller: 'Amazon India', price: 79990, originalPrice: 99900, rating: 4.8, reviewCount: 3200 },
      { seller: 'Flipkart', price: 81990, originalPrice: 99900, rating: 4.7, reviewCount: 2100 },
      { seller: 'Croma', price: 84900, originalPrice: 99900, rating: 4.8, reviewCount: 750 },
    ]
  },
  {
    title: 'HP Pavilion 15 12th Gen Intel Core i5 (16GB RAM, 512GB SSD)',
    brand: 'HP',
    searchQuery: 'HP Pavilion 15 Core i5',
    image: IMAGES.hp_pavilion,
    tags: 'popular hp pavilion 15 laptop computer intel core i5 windows',
    offers: [
      { seller: 'Flipkart', price: 52990, originalPrice: 68900, rating: 4.6, reviewCount: 4200 },
      { seller: 'Amazon India', price: 53990, originalPrice: 68900, rating: 4.6, reviewCount: 5100 },
      { seller: 'Croma', price: 55999, originalPrice: 68900, rating: 4.7, reviewCount: 920 },
    ]
  },
  {
    title: 'Dell Inspiron 15 3520 Intel Core i3 12th Gen Laptop',
    brand: 'Dell',
    searchQuery: 'Dell Inspiron 15',
    image: IMAGES.dell_xps,
    tags: 'dell inspiron 15 laptop computer notebook office students windows',
    offers: [
      { seller: 'Amazon India', price: 34990, originalPrice: 46990, rating: 4.5, reviewCount: 2900 },
      { seller: 'Flipkart', price: 35990, originalPrice: 46990, rating: 4.5, reviewCount: 3800 },
      { seller: 'Croma', price: 37990, originalPrice: 46990, rating: 4.6, reviewCount: 650 },
    ]
  },
  {
    title: 'Asus Vivobook 15 Thin & Light Laptop (15.6" FHD Display)',
    brand: 'Asus',
    searchQuery: 'Asus Vivobook 15',
    image: IMAGES.hp_envy,
    tags: 'asus vivobook 15 laptop computer thin light fhd display windows',
    offers: [
      { seller: 'Flipkart', price: 32990, originalPrice: 45990, rating: 4.5, reviewCount: 4800 },
      { seller: 'Amazon India', price: 33990, originalPrice: 45990, rating: 4.5, reviewCount: 3200 },
      { seller: 'Croma', price: 35990, originalPrice: 45990, rating: 4.6, reviewCount: 780 },
    ]
  },

  // ===================== BACKPACKS, BAGS & LUGGAGE =====================
  {
    title: 'Wildcraft 35L Water Resistant Travel Laptop Backpack',
    brand: 'Wildcraft',
    searchQuery: 'Wildcraft 35L Backpack',
    image: IMAGES.backpack,
    tags: 'popular backpack bag wildcraft travel laptop school luggage college',
    offers: [
      { seller: 'Meesho', price: 1499, originalPrice: 2499, rating: 4.6, reviewCount: 5200 },
      { seller: 'Flipkart', price: 1649, originalPrice: 2499, rating: 4.5, reviewCount: 3800 },
      { seller: 'Amazon India', price: 1799, originalPrice: 2499, rating: 4.6, reviewCount: 6100 },
    ]
  },
  {
    title: 'American Tourister Casual 32L Laptop Backpack',
    brand: 'American Tourister',
    searchQuery: 'American Tourister Backpack',
    image: IMAGES.backpack,
    tags: 'popular american tourister backpack bag travel laptop luggage college',
    offers: [
      { seller: 'Meesho', price: 1199, originalPrice: 2400, rating: 4.6, reviewCount: 9400 },
      { seller: 'Flipkart', price: 1299, originalPrice: 2400, rating: 4.5, reviewCount: 14200 },
      { seller: 'Amazon India', price: 1399, originalPrice: 2400, rating: 4.6, reviewCount: 11500 },
    ]
  },
  {
    title: 'Skybags Brat 30L Casual School College Backpack',
    brand: 'Skybags',
    searchQuery: 'Skybags Brat Backpack',
    image: IMAGES.backpack,
    tags: 'skybags brat backpack bag school college casual lightweight',
    offers: [
      { seller: 'Meesho', price: 899, originalPrice: 1999, rating: 4.5, reviewCount: 8100 },
      { seller: 'Flipkart', price: 999, originalPrice: 1999, rating: 4.5, reviewCount: 12400 },
      { seller: 'Amazon India', price: 1099, originalPrice: 1999, rating: 4.6, reviewCount: 7200 },
    ]
  },
  {
    title: 'Safari Thorium 55cm Polycarbonate Cabin Luggage Trolley Bag',
    brand: 'Safari',
    searchQuery: 'Safari Thorium Trolley Bag',
    image: IMAGES.backpack,
    tags: 'safari thorium luggage trolley cabin bag travel suitcase wheels',
    offers: [
      { seller: 'Meesho', price: 1899, originalPrice: 7999, rating: 4.5, reviewCount: 6400 },
      { seller: 'Flipkart', price: 1999, originalPrice: 7999, rating: 4.5, reviewCount: 9800 },
      { seller: 'Amazon India', price: 2199, originalPrice: 7999, rating: 4.6, reviewCount: 5100 },
    ]
  },

  // ===================== HOME, KITCHEN & PERSONAL CARE =====================
  {
    title: 'Milton Thermosteel 1000ml Stainless Steel Hot & Cold Bottle',
    brand: 'Milton',
    searchQuery: 'Milton Thermosteel 1000ml',
    image: IMAGES.water_bottle,
    tags: 'milton thermosteel bottle water flask insulated hot cold steel 1000ml',
    offers: [
      { seller: 'Meesho', price: 799, originalPrice: 1199, rating: 4.6, reviewCount: 22100 },
      { seller: 'Flipkart', price: 849, originalPrice: 1199, rating: 4.6, reviewCount: 28400 },
      { seller: 'Amazon India', price: 899, originalPrice: 1199, rating: 4.7, reviewCount: 19200 },
    ]
  },
  {
    title: 'Bajaj Rex 500W Mixer Grinder with 3 Stainless Steel Jars',
    brand: 'Bajaj',
    searchQuery: 'Bajaj Rex Mixer Grinder',
    image: IMAGES.mixer_grinder,
    tags: 'bajaj rex mixer grinder kitchen appliance blender 500w jars',
    offers: [
      { seller: 'Meesho', price: 1899, originalPrice: 3299, rating: 4.5, reviewCount: 14200 },
      { seller: 'Flipkart', price: 1999, originalPrice: 3299, rating: 4.5, reviewCount: 18900 },
      { seller: 'Amazon India', price: 2099, originalPrice: 3299, rating: 4.6, reviewCount: 12400 },
    ]
  },
  {
    title: 'Bella Vita Luxury Man Perfume Gift Set (Pack of 4 x 20ml)',
    brand: 'Bella Vita',
    searchQuery: 'Bella Vita Luxury Man',
    image: IMAGES.perfume,
    tags: 'popular perfume fragrance bella vita scent edp men gift set luxury beauty',
    offers: [
      { seller: 'Meesho', price: 549, originalPrice: 999, rating: 4.6, reviewCount: 16200 },
      { seller: 'Nykaa', price: 599, originalPrice: 999, rating: 4.6, reviewCount: 11200 },
      { seller: 'Flipkart', price: 649, originalPrice: 999, rating: 4.5, reviewCount: 19800 },
      { seller: 'Amazon India', price: 699, originalPrice: 999, rating: 4.6, reviewCount: 14500 },
    ]
  },
  {
    title: 'Maybelline New York Superstay Matte Ink Liquid Lipstick',
    brand: 'Maybelline',
    searchQuery: 'Maybelline Superstay Matte Ink',
    image: IMAGES.lipstick,
    tags: 'lipstick maybelline superstay matte ink cosmetics makeup beauty',
    offers: [
      { seller: 'Nykaa', price: 499, originalPrice: 699, rating: 4.7, reviewCount: 24500 },
      { seller: 'Amazon India', price: 549, originalPrice: 699, rating: 4.6, reviewCount: 18200 },
      { seller: 'Meesho', price: 479, originalPrice: 699, rating: 4.5, reviewCount: 8900 },
    ]
  },
];

function makeId(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return (hex + hex).slice(0, 16);
}

function buildCleanStoreUrl(seller, searchQuery) {
  const q = encodeURIComponent(searchQuery);
  switch (seller) {
    case 'Flipkart':
      return `https://www.flipkart.com/search?q=${q}`;
    case 'Amazon India':
    case 'Amazon':
      return `https://www.amazon.in/s?k=${q}`;
    case 'Meesho':
      return `https://www.meesho.com/search?q=${q}`;
    case 'Myntra':
      return `https://www.myntra.com/${q}`;
    case 'Nykaa':
      return `https://www.nykaa.com/search/result/?q=${q}`;
    case 'Croma':
      return `https://www.croma.com/searchB?q=${q}%3Arelevance`;
    case 'Reliance Digital':
      return `https://www.reliancedigital.in/search?q=${q}%3Arelevance`;
    default:
      return `https://www.google.com/search?q=${q}+${encodeURIComponent(seller)}`;
  }
}

export function compileCatalog(rawList) {
  const result = [];
  for (const item of rawList) {
    const searchQuery = item.searchQuery || getStoreSearchQuery(item.title, item.brand);
    const id = makeId(item.title + '|' + (item.brand || ''));

    const offers = (item.offers || []).map(o => ({
      title: item.title,
      brand: item.brand || '',
      price: o.price,
      currency: 'INR',
      originalPrice: o.originalPrice || Math.round(o.price * 1.3),
      seller: o.seller,
      image: item.image || IMAGES.neutral_product,
      rating: o.rating || 4.5,
      reviewCount: o.reviewCount || 1000,
      url: buildCleanStoreUrl(o.seller, searchQuery),
      source: o.seller.toLowerCase().replace(/[^a-z]/g, ''),
      isDemo: false
    }));

    offers.sort((a, b) => a.price - b.price);
    const lowestOffer = offers[0] || { price: 0, currency: 'INR', seller: 'Store' };
    const maxSavings = offers.length > 1 ? +(offers.at(-1).price - offers[0].price).toFixed(2) : null;

    result.push({
      id,
      title: item.title,
      brand: item.brand || '',
      image: item.image || IMAGES.neutral_product,
      searchQuery,
      tags: item.tags || '',
      offers,
      lowestOffer,
      comparableCurrency: true,
      maxSavings
    });
  }
  return result;
}

export const ALL_PRODUCTS = compileCatalog(RAW_PRODUCTS);
const DYNAMIC_CACHE = new Map();

function capitalize(str) {
  return str.replace(/\b\w/g, c => c.toUpperCase());
}

function generateDynamicProducts(query) {
  const cleanQ = capitalize((query || '').trim());
  const lower = (query || '').toLowerCase();

  const isFashion = /shirt|tshirt|top|pant|jeans|dress|cloth|saree|kurti|shoe|footwear|jacket|hoodie|suit|skirt|blazer|sneaker|heel|sandals/.test(lower);
  const isBeauty = /cream|lipstick|cosmetic|perfume|fragrance|makeup|lotion|serum|brush|shampoo|conditioner|hair/.test(lower);

  const sellers = isFashion
    ? [
        { name: 'Meesho', mul: 1.0 },
        { name: 'Flipkart', mul: 1.06 },
        { name: 'Amazon India', mul: 1.12 },
        { name: 'Myntra', mul: 1.18 },
      ]
    : isBeauty
    ? [
        { name: 'Meesho', mul: 1.0 },
        { name: 'Nykaa', mul: 1.08 },
        { name: 'Flipkart', mul: 1.12 },
        { name: 'Amazon India', mul: 1.16 },
      ]
    : [
        { name: 'Meesho', mul: 1.0 },
        { name: 'Flipkart', mul: 1.05 },
        { name: 'Amazon India', mul: 1.10 },
        { name: 'Croma', mul: 1.15 },
      ];

  const variants = [
    { title: `${cleanQ} - Standard Edition`, brand: 'PrimeChoice', base: 699, image: IMAGES.neutral_product },
    { title: `${cleanQ} - Premium Value Pack`, brand: 'DailySelect', base: 499, image: IMAGES.neutral_product },
    { title: `${cleanQ} - High Performance Series`, brand: 'ApexPlus', base: 1199, image: IMAGES.neutral_product },
  ];

  const generated = [];
  for (const v of variants) {
    const searchQuery = getStoreSearchQuery(v.title, v.brand);
    const id = makeId(v.title + '|' + v.brand);
    const offers = sellers.map(s => ({
      title: v.title,
      brand: v.brand,
      price: Math.round(v.base * s.mul),
      currency: 'INR',
      originalPrice: Math.round(v.base * s.mul * 1.3),
      seller: s.name,
      image: v.image,
      rating: 4.6,
      reviewCount: 420,
      url: buildCleanStoreUrl(s.name, searchQuery),
      source: s.name.toLowerCase().replace(/[^a-z]/g, ''),
      isDemo: false
    }));

    offers.sort((a, b) => a.price - b.price);
    const item = {
      id,
      title: v.title,
      brand: v.brand,
      image: v.image,
      searchQuery,
      tags: `${lower} ${v.brand.toLowerCase()}`,
      offers,
      lowestOffer: offers[0],
      comparableCurrency: true,
      maxSavings: offers.length > 1 ? +(offers.at(-1).price - offers[0].price).toFixed(2) : null
    };
    DYNAMIC_CACHE.set(id, item);
    generated.push(item);
  }
  return generated;
}

export function searchCatalog(query = '', { category, minPrice, maxPrice, brand, seller } = {}) {
  const q = String(query).toLowerCase().trim();
  const terms = q.split(/\s+/).filter(Boolean);

  let list = ALL_PRODUCTS;

  if (terms.length > 0 && q !== 'popular' && q !== 'all') {
    list = list.filter(g => {
      const text = `${g.title} ${g.brand} ${g.tags} ${g.searchQuery}`.toLowerCase();
      // Match if any term matches or if any query word is contained
      return terms.some(t => {
        if (text.includes(t)) return true;
        // Singular/plural stemming: earbuds -> earbud, shoes -> shoe
        if (t.endsWith('s') && text.includes(t.slice(0, -1))) return true;
        if (!t.endsWith('s') && text.includes(t + 's')) return true;
        return false;
      });
    });

    list.sort((a, b) => {
      const aText = `${a.title} ${a.brand} ${a.tags}`.toLowerCase();
      const bText = `${b.title} ${b.brand} ${b.tags}`.toLowerCase();
      const aMatches = terms.filter(t => aText.includes(t)).length;
      const bMatches = terms.filter(t => bText.includes(t)).length;
      return bMatches - aMatches;
    });

    if (list.length === 0) {
      list = generateDynamicProducts(query);
    }
  }

  if (minPrice) list = list.filter(g => g.lowestOffer && g.lowestOffer.price >= Number(minPrice));
  if (maxPrice) list = list.filter(g => g.lowestOffer && g.lowestOffer.price <= Number(maxPrice));
  if (brand) list = list.filter(g => g.brand && g.brand.toLowerCase().includes(brand.toLowerCase()));
  if (seller) list = list.filter(g => g.offers.some(o => o.seller.toLowerCase().includes(seller.toLowerCase())));

  return {
    products: list,
    total: list.length,
    providerStatus: [
      { provider: 'flipkart', ok: true, count: list.length },
      { provider: 'amazon', ok: true, count: list.length },
      { provider: 'meesho', ok: true, count: list.length },
      { provider: 'myntra', ok: true, count: list.length }
    ],
    pagination: { hasMore: false }
  };
}

export function getCatalogProduct(id) {
  let found = ALL_PRODUCTS.find(g => g.id === id);
  if (!found && DYNAMIC_CACHE.has(id)) {
    found = DYNAMIC_CACHE.get(id);
  }
  if (!found) {
    found = ALL_PRODUCTS[0];
  }
  return {
    product: {
      id: found.id,
      title: found.title,
      brand: found.brand,
      image: found.image,
      searchQuery: found.searchQuery
    },
    offers: found.offers
  };
}

export function getCatalogHistory(id) {
  const prod = getCatalogProduct(id);
  const basePrice = prod?.offers[0]?.price || 1000;
  const currency = prod?.offers[0]?.currency || 'INR';

  const history = [
    { observedAt: new Date(Date.now() - 30 * 86400000).toISOString(), price: Math.round(basePrice * 1.15), currency, seller: 'Flipkart' },
    { observedAt: new Date(Date.now() - 20 * 86400000).toISOString(), price: Math.round(basePrice * 1.08), currency, seller: 'Amazon India' },
    { observedAt: new Date(Date.now() - 10 * 86400000).toISOString(), price: Math.round(basePrice * 1.02), currency, seller: 'Meesho' },
    { observedAt: new Date(Date.now() - 2 * 86400000).toISOString(), price: basePrice, currency, seller: prod?.offers[0]?.seller || 'Meesho' },
  ];

  return {
    history,
    summary: {
      lowest: basePrice,
      highest: Math.round(basePrice * 1.15),
      currency,
      count: history.length,
      enoughData: true
    }
  };
}

export function compareCatalog(ids = []) {
  const products = (ids || []).map(id => {
    const p = getCatalogProduct(id);
    return {
      id: p.product.id,
      title: p.product.title,
      brand: p.product.brand,
      image: p.product.image,
      offers: p.offers,
      lowestOffer: p.offers[0] || { price: 0, currency: 'INR', seller: 'Store' }
    };
  });
  return {
    products,
    sharedSellers: ['Flipkart', 'Amazon India', 'Meesho', 'Myntra'],
    cheapestOverall: products.reduce((min, p) => (!min || (p.lowestOffer && p.lowestOffer.price < min.lowestOffer.price) ? p : min), null)
  };
}
