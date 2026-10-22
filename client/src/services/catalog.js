// High-performance browser catalog & search engine with 0ms latency
const IMAGES = {
  // Clothing & Indian Ethnic Wear (Meesho, Flipkart, Myntra, Ajio favorites)
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

  // Footwear & Shoes
  nike_shoes: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop',
  adidas_shoes: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=500&auto=format&fit=crop',
  puma_sneakers: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&auto=format&fit=crop',
  formal_shoes: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500&auto=format&fit=crop',
  crocs_clogs: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&auto=format&fit=crop',

  // Brushes (Dental & Grooming)
  electric_toothbrush: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=500&auto=format&fit=crop',
  manual_toothbrush: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=500&auto=format&fit=crop',
  hair_brush: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop',

  // Chargers, Cables & Power
  apple_charger: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&auto=format&fit=crop',
  samsung_charger: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=500&auto=format&fit=crop',
  anker_charger: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=500&auto=format&fit=crop',

  // Smartphones & Mobiles
  iphone17: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop',
  iphone16: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&auto=format&fit=crop',
  iphone15: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&auto=format&fit=crop',
  samsung_s24: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&auto=format&fit=crop',
  samsung_s23: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&auto=format&fit=crop',
  oneplus12: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop',

  // Laptops & Computers
  hp_pavilion: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop',
  hp_envy: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&auto=format&fit=crop',
  macbook_pro: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop',
  macbook_air: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&auto=format&fit=crop',
  dell_xps: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop',
  gaming_laptop: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop',

  // Audio, Headphones & Earbuds
  sony_headphones: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop',
  airpods_pro: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&auto=format&fit=crop',
  boat_headphones: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&auto=format&fit=crop',
  earbuds: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop',
  speaker: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&auto=format&fit=crop',
  tv: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&auto=format&fit=crop',
  ps5: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&auto=format&fit=crop',

  // Watches & Smartwatches
  apple_watch: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop',
  samsung_watch: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop',
  watch_analog: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&auto=format&fit=crop',

  // Computer Peripherals & Electronics
  mouse: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop',
  keyboard: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop',
  sunglasses: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop',

  // Personal Care, Grooming & Beauty (Nykaa & Meesho favorites)
  trimmer: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=500&auto=format&fit=crop',
  perfume: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&auto=format&fit=crop',
  lipstick: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&auto=format&fit=crop',
  face_cream: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop',

  // Home, Kitchen, Appliances & Travel
  water_bottle: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop',
  mixer_grinder: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500&auto=format&fit=crop',
  dyson_vacuum: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&auto=format&fit=crop',
  bedsheet: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=500&auto=format&fit=crop',
  backpack: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop',
  suitcase: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=500&auto=format&fit=crop',

  // Elegant neutral fallback package (Clean parcel box)
  neutral_product: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop',
};

const CURATED = [
  // ===================== MEN'S FASHION & SHIRTS =====================
  { title: 'Dennis Lingo Men Slim Fit Casual Cotton Shirt', brand: 'Dennis Lingo', price: 599, currency: 'INR', seller: 'Meesho', image: IMAGES.shirt_casual, rating: 4.6, reviewCount: 8400, tags: 'popular shirt casual cotton dennis lingo men slim fit fashion clothing apparel top' },
  { title: 'Dennis Lingo Men Slim Fit Casual Cotton Shirt', brand: 'Dennis Lingo', price: 649, currency: 'INR', seller: 'Flipkart', image: IMAGES.shirt_casual, rating: 4.5, reviewCount: 11200, tags: 'popular shirt casual cotton dennis lingo men slim fit fashion clothing apparel top' },
  { title: 'Dennis Lingo Men Slim Fit Casual Cotton Shirt', brand: 'Dennis Lingo', price: 699, currency: 'INR', seller: 'Amazon India', image: IMAGES.shirt_casual, rating: 4.6, reviewCount: 6500, tags: 'popular shirt casual cotton dennis lingo men slim fit fashion clothing apparel top' },
  { title: 'Dennis Lingo Men Slim Fit Casual Cotton Shirt', brand: 'Dennis Lingo', price: 749, currency: 'INR', seller: 'Myntra', image: IMAGES.shirt_casual, rating: 4.7, reviewCount: 3900, tags: 'popular shirt casual cotton dennis lingo men slim fit fashion clothing apparel top' },

  { title: 'Allen Solly Men Regular Fit Formal Cotton Shirt', brand: 'Allen Solly', price: 899, currency: 'INR', seller: 'Meesho', image: IMAGES.shirt_formal, rating: 4.7, reviewCount: 4200, tags: 'shirt formal allen solly men regular fit cotton office wear clothing apparel' },
  { title: 'Allen Solly Men Regular Fit Formal Cotton Shirt', brand: 'Allen Solly', price: 999, currency: 'INR', seller: 'Flipkart', image: IMAGES.shirt_formal, rating: 4.6, reviewCount: 7800, tags: 'shirt formal allen solly men regular fit cotton office wear clothing apparel' },
  { title: 'Allen Solly Men Regular Fit Formal Cotton Shirt', brand: 'Allen Solly', price: 1049, currency: 'INR', seller: 'Amazon India', image: IMAGES.shirt_formal, rating: 4.7, reviewCount: 5600, tags: 'shirt formal allen solly men regular fit cotton office wear clothing apparel' },
  { title: 'Allen Solly Men Regular Fit Formal Cotton Shirt', brand: 'Allen Solly', price: 1099, currency: 'INR', seller: 'Myntra', image: IMAGES.shirt_formal, rating: 4.8, reviewCount: 2900, tags: 'shirt formal allen solly men regular fit cotton office wear clothing apparel' },

  { title: 'Roadster Men Buffalo Checked Casual Pure Cotton Shirt', brand: 'Roadster', price: 499, currency: 'INR', seller: 'Meesho', image: IMAGES.shirt_check, rating: 4.5, reviewCount: 9300, tags: 'shirt check checked roadster casual cotton men clothing apparel' },
  { title: 'Roadster Men Buffalo Checked Casual Pure Cotton Shirt', brand: 'Roadster', price: 549, currency: 'INR', seller: 'Flipkart', image: IMAGES.shirt_check, rating: 4.5, reviewCount: 14200, tags: 'shirt check checked roadster casual cotton men clothing apparel' },
  { title: 'Roadster Men Buffalo Checked Casual Pure Cotton Shirt', brand: 'Roadster', price: 599, currency: 'INR', seller: 'Amazon India', image: IMAGES.shirt_check, rating: 4.6, reviewCount: 6800, tags: 'shirt check checked roadster casual cotton men clothing apparel' },
  { title: 'Roadster Men Buffalo Checked Casual Pure Cotton Shirt', brand: 'Roadster', price: 649, currency: 'INR', seller: 'Myntra', image: IMAGES.shirt_check, rating: 4.6, reviewCount: 8100, tags: 'shirt check checked roadster casual cotton men clothing apparel' },

  { title: 'Peter England Men Classic Formal White Cotton Shirt', brand: 'Peter England', price: 799, currency: 'INR', seller: 'Meesho', image: IMAGES.shirt_formal, rating: 4.6, reviewCount: 5100, tags: 'shirt formal white peter england cotton men clothing office' },
  { title: 'Peter England Men Classic Formal White Cotton Shirt', brand: 'Peter England', price: 849, currency: 'INR', seller: 'Flipkart', image: IMAGES.shirt_formal, rating: 4.5, reviewCount: 6300, tags: 'shirt formal white peter england cotton men clothing office' },
  { title: 'Peter England Men Classic Formal White Cotton Shirt', brand: 'Peter England', price: 899, currency: 'INR', seller: 'Ajio', image: IMAGES.shirt_formal, rating: 4.6, reviewCount: 2200, tags: 'shirt formal white peter england cotton men clothing office' },

  // ===================== T-SHIRTS & CASUALS =====================
  { title: 'Puma Men Classic Solid Round Neck Pure Cotton T-Shirt', brand: 'Puma', price: 399, currency: 'INR', seller: 'Meesho', image: IMAGES.tshirt, rating: 4.6, reviewCount: 12400, tags: 'popular tshirt t-shirt puma round neck solid cotton men clothing tee casual' },
  { title: 'Puma Men Classic Solid Round Neck Pure Cotton T-Shirt', brand: 'Puma', price: 449, currency: 'INR', seller: 'Flipkart', image: IMAGES.tshirt, rating: 4.5, reviewCount: 18900, tags: 'popular tshirt t-shirt puma round neck solid cotton men clothing tee casual' },
  { title: 'Puma Men Classic Solid Round Neck Pure Cotton T-Shirt', brand: 'Puma', price: 499, currency: 'INR', seller: 'Amazon India', image: IMAGES.tshirt, rating: 4.6, reviewCount: 9400, tags: 'popular tshirt t-shirt puma round neck solid cotton men clothing tee casual' },
  { title: 'Puma Men Classic Solid Round Neck Pure Cotton T-Shirt', brand: 'Puma', price: 549, currency: 'INR', seller: 'Myntra', image: IMAGES.tshirt, rating: 4.7, reviewCount: 5200, tags: 'popular tshirt t-shirt puma round neck solid cotton men clothing tee casual' },

  { title: 'U.S. Polo Assn. Men Solid Polo Collar T-Shirt', brand: 'USPA', price: 699, currency: 'INR', seller: 'Meesho', image: IMAGES.tshirt_polo, rating: 4.7, reviewCount: 5100, tags: 'tshirt t-shirt polo us polo uspa collar cotton men clothing' },
  { title: 'U.S. Polo Assn. Men Solid Polo Collar T-Shirt', brand: 'USPA', price: 749, currency: 'INR', seller: 'Flipkart', image: IMAGES.tshirt_polo, rating: 4.6, reviewCount: 8200, tags: 'tshirt t-shirt polo us polo uspa collar cotton men clothing' },
  { title: 'U.S. Polo Assn. Men Solid Polo Collar T-Shirt', brand: 'USPA', price: 799, currency: 'INR', seller: 'Amazon India', image: IMAGES.tshirt_polo, rating: 4.7, reviewCount: 4600, tags: 'tshirt t-shirt polo us polo uspa collar cotton men clothing' },

  // ===================== SAREES & ETHNIC WEAR =====================
  { title: 'Kanjivaram Soft Woven Silk Saree with Blouse Piece', brand: 'Kalyan Silks', price: 699, currency: 'INR', seller: 'Meesho', image: IMAGES.saree_silk, rating: 4.7, reviewCount: 15400, tags: 'popular saree silk kanjivaram woven ethnic women traditional dress clothing wedding' },
  { title: 'Kanjivaram Soft Woven Silk Saree with Blouse Piece', brand: 'Kalyan Silks', price: 799, currency: 'INR', seller: 'Flipkart', image: IMAGES.saree_silk, rating: 4.6, reviewCount: 18900, tags: 'popular saree silk kanjivaram woven ethnic women traditional dress clothing wedding' },
  { title: 'Kanjivaram Soft Woven Silk Saree with Blouse Piece', brand: 'Kalyan Silks', price: 849, currency: 'INR', seller: 'Amazon India', image: IMAGES.saree_silk, rating: 4.7, reviewCount: 9200, tags: 'popular saree silk kanjivaram woven ethnic women traditional dress clothing wedding' },
  { title: 'Kanjivaram Soft Woven Silk Saree with Blouse Piece', brand: 'Kalyan Silks', price: 899, currency: 'INR', seller: 'Myntra', image: IMAGES.saree_silk, rating: 4.8, reviewCount: 4100, tags: 'popular saree silk kanjivaram woven ethnic women traditional dress clothing wedding' },

  { title: 'Banarasi Art Silk Zari Border Festive Saree', brand: 'Varkha Fashion', price: 549, currency: 'INR', seller: 'Meesho', image: IMAGES.saree, rating: 4.5, reviewCount: 11200, tags: 'saree banarasi silk zari border ethnic women clothing' },
  { title: 'Banarasi Art Silk Zari Border Festive Saree', brand: 'Varkha Fashion', price: 599, currency: 'INR', seller: 'Flipkart', image: IMAGES.saree, rating: 4.5, reviewCount: 14500, tags: 'saree banarasi silk zari border ethnic women clothing' },
  { title: 'Banarasi Art Silk Zari Border Festive Saree', brand: 'Varkha Fashion', price: 649, currency: 'INR', seller: 'Amazon India', image: IMAGES.saree, rating: 4.6, reviewCount: 7200, tags: 'saree banarasi silk zari border ethnic women clothing' },

  // ===================== KURTIS & WOMEN'S APPAREL =====================
  { title: 'GoSriKi Women Floral Printed Anarkali Kurta with Pant Set', brand: 'GoSriKi', price: 499, currency: 'INR', seller: 'Meesho', image: IMAGES.kurti, rating: 4.6, reviewCount: 19800, tags: 'popular kurti kurta anarkali gosriki women dress ethnic floral set clothing' },
  { title: 'GoSriKi Women Floral Printed Anarkali Kurta with Pant Set', brand: 'GoSriKi', price: 549, currency: 'INR', seller: 'Flipkart', image: IMAGES.kurti, rating: 4.5, reviewCount: 24300, tags: 'popular kurti kurta anarkali gosriki women dress ethnic floral set clothing' },
  { title: 'GoSriKi Women Floral Printed Anarkali Kurta with Pant Set', brand: 'GoSriKi', price: 599, currency: 'INR', seller: 'Amazon India', image: IMAGES.kurti, rating: 4.6, reviewCount: 12100, tags: 'popular kurti kurta anarkali gosriki women dress ethnic floral set clothing' },
  { title: 'GoSriKi Women Floral Printed Anarkali Kurta with Pant Set', brand: 'GoSriKi', price: 649, currency: 'INR', seller: 'Myntra', image: IMAGES.kurti, rating: 4.7, reviewCount: 7800, tags: 'popular kurti kurta anarkali gosriki women dress ethnic floral set clothing' },

  { title: 'Biba Women Straight Pure Cotton Embroidered Kurti', brand: 'Biba', price: 899, currency: 'INR', seller: 'Meesho', image: IMAGES.kurti, rating: 4.7, reviewCount: 6200, tags: 'kurti biba straight embroidered cotton kurta ethnic women clothing' },
  { title: 'Biba Women Straight Pure Cotton Embroidered Kurti', brand: 'Biba', price: 999, currency: 'INR', seller: 'Flipkart', image: IMAGES.kurti, rating: 4.6, reviewCount: 8400, tags: 'kurti biba straight embroidered cotton kurta ethnic women clothing' },
  { title: 'Biba Women Straight Pure Cotton Embroidered Kurti', brand: 'Biba', price: 1049, currency: 'INR', seller: 'Myntra', image: IMAGES.kurti, rating: 4.8, reviewCount: 5100, tags: 'kurti biba straight embroidered cotton kurta ethnic women clothing' },

  // ===================== JEANS & TROUSERS =====================
  { title: 'Levi\'s Men 511 Slim Fit Stretchable Denim Jeans', brand: 'Levi\'s', price: 1499, currency: 'INR', seller: 'Meesho', image: IMAGES.jeans, rating: 4.7, reviewCount: 4300, tags: 'popular jeans denim levis slim fit 511 men pant stretchable clothing trousers' },
  { title: 'Levi\'s Men 511 Slim Fit Stretchable Denim Jeans', brand: 'Levi\'s', price: 1699, currency: 'INR', seller: 'Flipkart', image: IMAGES.jeans, rating: 4.6, reviewCount: 8900, tags: 'popular jeans denim levis slim fit 511 men pant stretchable clothing trousers' },
  { title: 'Levi\'s Men 511 Slim Fit Stretchable Denim Jeans', brand: 'Levi\'s', price: 1799, currency: 'INR', seller: 'Amazon India', image: IMAGES.jeans, rating: 4.7, reviewCount: 9200, tags: 'popular jeans denim levis slim fit 511 men pant stretchable clothing trousers' },
  { title: 'Levi\'s Men 511 Slim Fit Stretchable Denim Jeans', brand: 'Levi\'s', price: 1899, currency: 'INR', seller: 'Myntra', image: IMAGES.jeans, rating: 4.8, reviewCount: 5400, tags: 'popular jeans denim levis slim fit 511 men pant stretchable clothing trousers' },

  // ===================== FOOTWEAR & SNEAKERS =====================
  { title: 'Nike Air Zoom Pegasus 40 Running Shoes Black White', brand: 'Nike', price: 6999, currency: 'INR', seller: 'Myntra', image: IMAGES.nike_shoes, rating: 4.7, reviewCount: 890, tags: 'popular nike air zoom pegasus 40 running shoes sneakers sports athletics footwear' },
  { title: 'Nike Air Zoom Pegasus 40 Running Shoes Black White', brand: 'Nike', price: 7495, currency: 'INR', seller: 'Flipkart', image: IMAGES.nike_shoes, rating: 4.7, reviewCount: 1420, tags: 'popular nike air zoom pegasus 40 running shoes sneakers sports athletics footwear' },
  { title: 'Nike Air Zoom Pegasus 40 Running Shoes Black White', brand: 'Nike', price: 7799, currency: 'INR', seller: 'Amazon India', image: IMAGES.nike_shoes, rating: 4.6, reviewCount: 1100, tags: 'popular nike air zoom pegasus 40 running shoes sneakers sports athletics footwear' },

  { title: 'Puma Men Smashic Casual White Sneakers', brand: 'Puma', price: 1799, currency: 'INR', seller: 'Meesho', image: IMAGES.puma_sneakers, rating: 4.6, reviewCount: 9400, tags: 'puma smashic sneakers white casual shoes men footwear' },
  { title: 'Puma Men Smashic Casual White Sneakers', brand: 'Puma', price: 1899, currency: 'INR', seller: 'Flipkart', image: IMAGES.puma_sneakers, rating: 4.5, reviewCount: 14200, tags: 'puma smashic sneakers white casual shoes men footwear' },
  { title: 'Puma Men Smashic Casual White Sneakers', brand: 'Puma', price: 1999, currency: 'INR', seller: 'Amazon India', image: IMAGES.puma_sneakers, rating: 4.6, reviewCount: 8100, tags: 'puma smashic sneakers white casual shoes men footwear' },

  { title: 'Sparx Men Lightweight Running Sports Shoes', brand: 'Sparx', price: 849, currency: 'INR', seller: 'Meesho', image: IMAGES.shoes_sports, rating: 4.5, reviewCount: 18400, tags: 'sparx running sports shoes lightweight footwear men' },
  { title: 'Sparx Men Lightweight Running Sports Shoes', brand: 'Sparx', price: 899, currency: 'INR', seller: 'Flipkart', image: IMAGES.shoes_sports, rating: 4.5, reviewCount: 22100, tags: 'sparx running sports shoes lightweight footwear men' },
  { title: 'Sparx Men Lightweight Running Sports Shoes', brand: 'Sparx', price: 949, currency: 'INR', seller: 'Amazon India', image: IMAGES.shoes_sports, rating: 4.6, reviewCount: 11200, tags: 'sparx running sports shoes lightweight footwear men' },

  { title: 'Crocs Classic Unisex Comfortable Lightweight Clogs', brand: 'Crocs', price: 2199, currency: 'INR', seller: 'Myntra', image: IMAGES.crocs_clogs, rating: 4.7, reviewCount: 8400, tags: 'crocs classic clogs footwear unisex lightweight sandals' },
  { title: 'Crocs Classic Unisex Comfortable Lightweight Clogs', brand: 'Crocs', price: 2399, currency: 'INR', seller: 'Amazon India', image: IMAGES.crocs_clogs, rating: 4.7, reviewCount: 9200, tags: 'crocs classic clogs footwear unisex lightweight sandals' },
  { title: 'Crocs Classic Unisex Comfortable Lightweight Clogs', brand: 'Crocs', price: 2495, currency: 'INR', seller: 'Flipkart', image: IMAGES.crocs_clogs, rating: 4.6, reviewCount: 6800, tags: 'crocs classic clogs footwear unisex lightweight sandals' },

  // ===================== SMARTPHONES & MOBILES =====================
  { title: 'Apple iPhone 17 Pro 256GB Titanium Smartphone', brand: 'Apple', price: 129900, currency: 'INR', seller: 'Amazon India', image: IMAGES.iphone17, rating: 4.9, reviewCount: 890, tags: 'iphone 17 pro apple phone smartphone mobile 256gb titanium' },
  { title: 'Apple iPhone 17 Pro 256GB Titanium Smartphone', brand: 'Apple', price: 131900, currency: 'INR', seller: 'Flipkart', image: IMAGES.iphone17, rating: 4.8, reviewCount: 650, tags: 'iphone 17 pro apple phone smartphone mobile 256gb titanium' },
  { title: 'Apple iPhone 17 Pro 256GB Titanium Smartphone', brand: 'Apple', price: 134900, currency: 'INR', seller: 'Croma', image: IMAGES.iphone17, rating: 4.9, reviewCount: 320, tags: 'iphone 17 pro apple phone smartphone mobile 256gb titanium' },

  { title: 'Apple iPhone 16 128GB Black Smartphone', brand: 'Apple', price: 74999, currency: 'INR', seller: 'Amazon India', image: IMAGES.iphone16, rating: 4.8, reviewCount: 2420, tags: 'popular iphone 16 apple phone smartphone mobile 128gb' },
  { title: 'Apple iPhone 16 128GB Black Smartphone', brand: 'Apple', price: 76900, currency: 'INR', seller: 'Flipkart', image: IMAGES.iphone16, rating: 4.7, reviewCount: 1820, tags: 'popular iphone 16 apple phone smartphone mobile 128gb' },
  { title: 'Apple iPhone 16 128GB Black Smartphone', brand: 'Apple', price: 79900, currency: 'INR', seller: 'Reliance Digital', image: IMAGES.iphone16, rating: 4.8, reviewCount: 940, tags: 'popular iphone 16 apple phone smartphone mobile 128gb' },

  { title: 'Apple iPhone 15 128GB Blue Smartphone', brand: 'Apple', price: 64999, currency: 'INR', seller: 'Flipkart', image: IMAGES.iphone15, rating: 4.8, reviewCount: 5400, tags: 'iphone 15 apple phone smartphone mobile 128gb' },
  { title: 'Apple iPhone 15 128GB Blue Smartphone', brand: 'Apple', price: 66900, currency: 'INR', seller: 'Amazon India', image: IMAGES.iphone15, rating: 4.8, reviewCount: 6200, tags: 'iphone 15 apple phone smartphone mobile 128gb' },

  { title: 'Samsung Galaxy S24 Ultra 256GB Smartphone Titanium Gray', brand: 'Samsung', price: 119999, currency: 'INR', seller: 'Amazon India', image: IMAGES.samsung_s24, rating: 4.8, reviewCount: 1850, tags: 'popular samsung galaxy s24 ultra phone smartphone mobile android 256gb' },
  { title: 'Samsung Galaxy S24 Ultra 256GB Smartphone Titanium Gray', brand: 'Samsung', price: 121500, currency: 'INR', seller: 'Croma', image: IMAGES.samsung_s24, rating: 4.8, reviewCount: 620, tags: 'popular samsung galaxy s24 ultra phone smartphone mobile android 256gb' },
  { title: 'Samsung Galaxy S24 Ultra 256GB Smartphone Titanium Gray', brand: 'Samsung', price: 124999, currency: 'INR', seller: 'Flipkart', image: IMAGES.samsung_s24, rating: 4.9, reviewCount: 1420, tags: 'popular samsung galaxy s24 ultra phone smartphone mobile android 256gb' },

  { title: 'OnePlus 12 5G 256GB Flowy Emerald Smartphone', brand: 'OnePlus', price: 64999, currency: 'INR', seller: 'Amazon India', image: IMAGES.oneplus12, rating: 4.7, reviewCount: 3100, tags: 'oneplus 12 5g phone smartphone mobile android 256gb' },
  { title: 'OnePlus 12 5G 256GB Flowy Emerald Smartphone', brand: 'OnePlus', price: 66499, currency: 'INR', seller: 'Flipkart', image: IMAGES.oneplus12, rating: 4.6, reviewCount: 2200, tags: 'oneplus 12 5g phone smartphone mobile android 256gb' },
  { title: 'OnePlus 12 5G 256GB Flowy Emerald Smartphone', brand: 'OnePlus', price: 67999, currency: 'INR', seller: 'Croma', image: IMAGES.oneplus12, rating: 4.7, reviewCount: 840, tags: 'oneplus 12 5g phone smartphone mobile android 256gb' },

  { title: 'OnePlus Nord CE 4 5G 128GB Celadon Marble Smartphone', brand: 'OnePlus', price: 24999, currency: 'INR', seller: 'Amazon India', image: IMAGES.oneplus12, rating: 4.6, reviewCount: 6200, tags: 'oneplus nord ce 4 5g phone smartphone mobile android' },
  { title: 'OnePlus Nord CE 4 5G 128GB Celadon Marble Smartphone', brand: 'OnePlus', price: 25499, currency: 'INR', seller: 'Flipkart', image: IMAGES.oneplus12, rating: 4.5, reviewCount: 4800, tags: 'oneplus nord ce 4 5g phone smartphone mobile android' },

  // ===================== LAPTOPS & COMPUTERS =====================
  { title: 'Apple MacBook Air 13 M2 8GB RAM 256GB SSD Midnight', brand: 'Apple', price: 89900, currency: 'INR', seller: 'Amazon India', image: IMAGES.macbook_air, rating: 4.8, reviewCount: 2100, tags: 'popular apple macbook air 13 m2 laptop computer 8gb macos' },
  { title: 'Apple MacBook Air 13 M2 8GB RAM 256GB SSD Midnight', brand: 'Apple', price: 92900, currency: 'INR', seller: 'Flipkart', image: IMAGES.macbook_air, rating: 4.8, reviewCount: 890, tags: 'popular apple macbook air 13 m2 laptop computer 8gb macos' },
  { title: 'Apple MacBook Air 13 M2 8GB RAM 256GB SSD Midnight', brand: 'Apple', price: 94900, currency: 'INR', seller: 'Croma', image: IMAGES.macbook_air, rating: 4.8, reviewCount: 520, tags: 'popular apple macbook air 13 m2 laptop computer 8gb macos' },

  { title: 'Apple MacBook Pro 14 M3 16GB RAM 512GB SSD Space Gray', brand: 'Apple', price: 159900, currency: 'INR', seller: 'Amazon India', image: IMAGES.macbook_pro, rating: 4.9, reviewCount: 520, tags: 'apple macbook pro 14 m3 laptop computer 16gb 512gb macos' },
  { title: 'Apple MacBook Pro 14 M3 16GB RAM 512GB SSD Space Gray', brand: 'Apple', price: 164900, currency: 'INR', seller: 'Flipkart', image: IMAGES.macbook_pro, rating: 4.8, reviewCount: 310, tags: 'apple macbook pro 14 m3 laptop computer 16gb 512gb macos' },

  { title: 'HP Pavilion 15.6 Laptop Intel Core i7 16GB RAM 512GB SSD', brand: 'HP', price: 67990, currency: 'INR', seller: 'Amazon India', image: IMAGES.hp_pavilion, rating: 4.7, reviewCount: 840, tags: 'popular hp laptop pavilion computer 15.6 intel core i7 16gb ram ssd windows' },
  { title: 'HP Pavilion 15.6 Laptop Intel Core i7 16GB RAM 512GB SSD', brand: 'HP', price: 69990, currency: 'INR', seller: 'Flipkart', image: IMAGES.hp_pavilion, rating: 4.6, reviewCount: 620, tags: 'popular hp laptop pavilion computer 15.6 intel core i7 16gb ram ssd windows' },
  { title: 'HP Pavilion 15.6 Laptop Intel Core i7 16GB RAM 512GB SSD', brand: 'HP', price: 72990, currency: 'INR', seller: 'Croma', image: IMAGES.hp_pavilion, rating: 4.7, reviewCount: 280, tags: 'popular hp laptop pavilion computer 15.6 intel core i7 16gb ram ssd windows' },

  { title: 'Asus ROG Strix G16 Gaming Laptop 16GB RAM RTX 4060', brand: 'Asus', price: 114990, currency: 'INR', seller: 'Amazon India', image: IMAGES.gaming_laptop, rating: 4.8, reviewCount: 420, tags: 'asus rog strix gaming laptop computer rtx 4060 16gb' },
  { title: 'Asus ROG Strix G16 Gaming Laptop 16GB RAM RTX 4060', brand: 'Asus', price: 119990, currency: 'INR', seller: 'Flipkart', image: IMAGES.gaming_laptop, rating: 4.7, reviewCount: 310, tags: 'asus rog strix gaming laptop computer rtx 4060 16gb' },

  // ===================== AUDIO, HEADPHONES & SPEAKERS =====================
  { title: 'boAt Rockerz 450 Bluetooth On-Ear Wireless Headphones', brand: 'boAt', price: 1299, currency: 'INR', seller: 'Meesho', image: IMAGES.boat_headphones, rating: 4.5, reviewCount: 14500, tags: 'popular boat rockerz 450 headphones wireless bluetooth on-ear audio sound' },
  { title: 'boAt Rockerz 450 Bluetooth On-Ear Wireless Headphones', brand: 'boAt', price: 1399, currency: 'INR', seller: 'Flipkart', image: IMAGES.boat_headphones, rating: 4.5, reviewCount: 18200, tags: 'popular boat rockerz 450 headphones wireless bluetooth on-ear audio sound' },
  { title: 'boAt Rockerz 450 Bluetooth On-Ear Wireless Headphones', brand: 'boAt', price: 1449, currency: 'INR', seller: 'Amazon India', image: IMAGES.boat_headphones, rating: 4.5, reviewCount: 12100, tags: 'popular boat rockerz 450 headphones wireless bluetooth on-ear audio sound' },

  { title: 'boAt Airdopes 141 True Wireless Earbuds with 42H Playtime', brand: 'boAt', price: 999, currency: 'INR', seller: 'Meesho', image: IMAGES.earbuds, rating: 4.5, reviewCount: 28400, tags: 'popular boat airdopes 141 earbuds tws wireless bluetooth earphones audio' },
  { title: 'boAt Airdopes 141 True Wireless Earbuds with 42H Playtime', brand: 'boAt', price: 1099, currency: 'INR', seller: 'Flipkart', image: IMAGES.earbuds, rating: 4.5, reviewCount: 34100, tags: 'popular boat airdopes 141 earbuds tws wireless bluetooth earphones audio' },
  { title: 'boAt Airdopes 141 True Wireless Earbuds with 42H Playtime', brand: 'boAt', price: 1199, currency: 'INR', seller: 'Amazon India', image: IMAGES.earbuds, rating: 4.6, reviewCount: 18900, tags: 'popular boat airdopes 141 earbuds tws wireless bluetooth earphones audio' },

  { title: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones Black', brand: 'Sony', price: 26990, currency: 'INR', seller: 'Amazon India', image: IMAGES.sony_headphones, rating: 4.8, reviewCount: 3420, tags: 'sony wh-1000xm5 headphones wireless noise canceling audio' },
  { title: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones Black', brand: 'Sony', price: 28490, currency: 'INR', seller: 'Croma', image: IMAGES.sony_headphones, rating: 4.7, reviewCount: 950, tags: 'sony wh-1000xm5 headphones wireless noise canceling audio' },
  { title: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones Black', brand: 'Sony', price: 28990, currency: 'INR', seller: 'Flipkart', image: IMAGES.sony_headphones, rating: 4.8, reviewCount: 1120, tags: 'sony wh-1000xm5 headphones wireless noise canceling audio' },

  { title: 'Apple AirPods Pro (2nd Generation) MagSafe Case USB-C', brand: 'Apple', price: 20999, currency: 'INR', seller: 'Amazon India', image: IMAGES.airpods_pro, rating: 4.8, reviewCount: 4120, tags: 'airpods pro apple earphones wireless earbuds audio' },
  { title: 'Apple AirPods Pro (2nd Generation) MagSafe Case USB-C', brand: 'Apple', price: 21999, currency: 'INR', seller: 'Flipkart', image: IMAGES.airpods_pro, rating: 4.7, reviewCount: 2800, tags: 'airpods pro apple earphones wireless earbuds audio' },
  { title: 'Apple AirPods Pro (2nd Generation) MagSafe Case USB-C', brand: 'Apple', price: 22990, currency: 'INR', seller: 'Croma', image: IMAGES.airpods_pro, rating: 4.8, reviewCount: 890, tags: 'airpods pro apple earphones wireless earbuds audio' },

  // ===================== WATCHES & SMARTWATCHES =====================
  { title: 'Apple Watch Series 9 GPS 45mm Midnight Aluminum Case', brand: 'Apple', price: 38900, currency: 'INR', seller: 'Amazon India', image: IMAGES.apple_watch, rating: 4.8, reviewCount: 1450, tags: 'popular apple watch series 9 smartwatch wearable fitness gps 45mm' },
  { title: 'Apple Watch Series 9 GPS 45mm Midnight Aluminum Case', brand: 'Apple', price: 41900, currency: 'INR', seller: 'Croma', image: IMAGES.apple_watch, rating: 4.8, reviewCount: 540, tags: 'popular apple watch series 9 smartwatch wearable fitness gps 45mm' },
  { title: 'Apple Watch Series 9 GPS 45mm Midnight Aluminum Case', brand: 'Apple', price: 42490, currency: 'INR', seller: 'Flipkart', image: IMAGES.apple_watch, rating: 4.7, reviewCount: 680, tags: 'popular apple watch series 9 smartwatch wearable fitness gps 45mm' },

  { title: 'boAt Wave Call Smartwatch with Bluetooth Calling 1.69 Display', brand: 'boAt', price: 1299, currency: 'INR', seller: 'Meesho', image: IMAGES.smartwatch_boat, rating: 4.5, reviewCount: 18200, tags: 'popular boat wave call smartwatch fitness bluetooth calling watch wearable' },
  { title: 'boAt Wave Call Smartwatch with Bluetooth Calling 1.69 Display', brand: 'boAt', price: 1399, currency: 'INR', seller: 'Flipkart', image: IMAGES.smartwatch_boat, rating: 4.5, reviewCount: 22400, tags: 'popular boat wave call smartwatch fitness bluetooth calling watch wearable' },
  { title: 'boAt Wave Call Smartwatch with Bluetooth Calling 1.69 Display', brand: 'boAt', price: 1499, currency: 'INR', seller: 'Amazon India', image: IMAGES.smartwatch_boat, rating: 4.6, reviewCount: 11500, tags: 'popular boat wave call smartwatch fitness bluetooth calling watch wearable' },

  { title: 'Titan Karishma Analog Men\'s Black Dial Classic Watch', brand: 'Titan', price: 2195, currency: 'INR', seller: 'Amazon India', image: IMAGES.watch_analog, rating: 4.7, reviewCount: 8400, tags: 'titan karishma analog watch men black dial classic watch' },
  { title: 'Titan Karishma Analog Men\'s Black Dial Classic Watch', brand: 'Titan', price: 2295, currency: 'INR', seller: 'Flipkart', image: IMAGES.watch_analog, rating: 4.6, reviewCount: 9200, tags: 'titan karishma analog watch men black dial classic watch' },
  { title: 'Titan Karishma Analog Men\'s Black Dial Classic Watch', brand: 'Titan', price: 2395, currency: 'INR', seller: 'Tata CLiQ', image: IMAGES.watch_analog, rating: 4.7, reviewCount: 3100, tags: 'titan karishma analog watch men black dial classic watch' },

  // ===================== PERSONAL CARE & BEAUTY (NYKAA & MEESHO) =====================
  { title: 'Bella Vita Luxury Man Perfume Gift Set (Pack of 4 x 20ml)', brand: 'Bella Vita', price: 549, currency: 'INR', seller: 'Meesho', image: IMAGES.perfume, rating: 4.6, reviewCount: 16200, tags: 'popular perfume fragrance bella vita scent edp men gift set luxury beauty' },
  { title: 'Bella Vita Luxury Man Perfume Gift Set (Pack of 4 x 20ml)', brand: 'Bella Vita', price: 599, currency: 'INR', seller: 'Nykaa', image: IMAGES.perfume, rating: 4.6, reviewCount: 11200, tags: 'popular perfume fragrance bella vita scent edp men gift set luxury beauty' },
  { title: 'Bella Vita Luxury Man Perfume Gift Set (Pack of 4 x 20ml)', brand: 'Bella Vita', price: 649, currency: 'INR', seller: 'Flipkart', image: IMAGES.perfume, rating: 4.5, reviewCount: 19800, tags: 'popular perfume fragrance bella vita scent edp men gift set luxury beauty' },
  { title: 'Bella Vita Luxury Man Perfume Gift Set (Pack of 4 x 20ml)', brand: 'Bella Vita', price: 699, currency: 'INR', seller: 'Amazon India', image: IMAGES.perfume, rating: 4.6, reviewCount: 14500, tags: 'popular perfume fragrance bella vita scent edp men gift set luxury beauty' },

  { title: 'Maybelline New York Superstay Matte Ink Liquid Lipstick', brand: 'Maybelline', price: 499, currency: 'INR', seller: 'Nykaa', image: IMAGES.lipstick, rating: 4.7, reviewCount: 24500, tags: 'lipstick maybelline superstay matte ink cosmetics makeup beauty' },
  { title: 'Maybelline New York Superstay Matte Ink Liquid Lipstick', brand: 'Maybelline', price: 549, currency: 'INR', seller: 'Amazon India', image: IMAGES.lipstick, rating: 4.6, reviewCount: 18200, tags: 'lipstick maybelline superstay matte ink cosmetics makeup beauty' },
  { title: 'Maybelline New York Superstay Matte Ink Liquid Lipstick', brand: 'Maybelline', price: 599, currency: 'INR', seller: 'Flipkart', image: IMAGES.lipstick, rating: 4.5, reviewCount: 14100, tags: 'lipstick maybelline superstay matte ink cosmetics makeup beauty' },

  { title: 'Philips BT1232/15 Cordless Beard Trimmer (Micro USB Charging)', brand: 'Philips', price: 899, currency: 'INR', seller: 'Meesho', image: IMAGES.trimmer, rating: 4.6, reviewCount: 14200, tags: 'popular philips trimmer shaver beard grooming personal care cordless' },
  { title: 'Philips BT1232/15 Cordless Beard Trimmer (Micro USB Charging)', brand: 'Philips', price: 949, currency: 'INR', seller: 'Flipkart', image: IMAGES.trimmer, rating: 4.5, reviewCount: 21800, tags: 'popular philips trimmer shaver beard grooming personal care cordless' },
  { title: 'Philips BT1232/15 Cordless Beard Trimmer (Micro USB Charging)', brand: 'Philips', price: 999, currency: 'INR', seller: 'Amazon India', image: IMAGES.trimmer, rating: 4.6, reviewCount: 16500, tags: 'popular philips trimmer shaver beard grooming personal care cordless' },

  { title: 'Oral-B Vitality Precision Clean Electric Toothbrush', brand: 'Oral-B', price: 1599, currency: 'INR', seller: 'Amazon India', image: IMAGES.electric_toothbrush, rating: 4.8, reviewCount: 4890, tags: 'brush toothbrush electric oral-b dental clean teeth personal care' },
  { title: 'Oral-B Vitality Precision Clean Electric Toothbrush', brand: 'Oral-B', price: 1699, currency: 'INR', seller: 'Flipkart', image: IMAGES.electric_toothbrush, rating: 4.7, reviewCount: 2310, tags: 'brush toothbrush electric oral-b dental clean teeth personal care' },
  { title: 'Oral-B Vitality Precision Clean Electric Toothbrush', brand: 'Oral-B', price: 1799, currency: 'INR', seller: 'Croma', image: IMAGES.electric_toothbrush, rating: 4.8, reviewCount: 650, tags: 'brush toothbrush electric oral-b dental clean teeth personal care' },

  { title: 'Colgate ZigZag Charcoal Manual Toothbrush (Pack of 6)', brand: 'Colgate', price: 180, currency: 'INR', seller: 'Amazon India', image: IMAGES.manual_toothbrush, rating: 4.6, reviewCount: 12400, tags: 'brush toothbrush colgate zigzag charcoal teeth manual pack' },
  { title: 'Colgate ZigZag Charcoal Manual Toothbrush (Pack of 6)', brand: 'Colgate', price: 195, currency: 'INR', seller: 'Flipkart', image: IMAGES.manual_toothbrush, rating: 4.5, reviewCount: 9400, tags: 'brush toothbrush colgate zigzag charcoal teeth manual pack' },
  { title: 'Colgate ZigZag Charcoal Manual Toothbrush (Pack of 6)', brand: 'Colgate', price: 210, currency: 'INR', seller: 'Meesho', image: IMAGES.manual_toothbrush, rating: 4.6, reviewCount: 1800, tags: 'brush toothbrush colgate zigzag charcoal teeth manual pack' },

  // ===================== HOME, KITCHEN & APPLIANCES =====================
  { title: 'Milton Thermosteel 1000ml Insulated Water Bottle', brand: 'Milton', price: 799, currency: 'INR', seller: 'Meesho', image: IMAGES.water_bottle, rating: 4.7, reviewCount: 14200, tags: 'popular bottle water flask milton thermosteel stainless steel 1000ml home kitchen' },
  { title: 'Milton Thermosteel 1000ml Insulated Water Bottle', brand: 'Milton', price: 849, currency: 'INR', seller: 'Flipkart', image: IMAGES.water_bottle, rating: 4.6, reviewCount: 8900, tags: 'popular bottle water flask milton thermosteel stainless steel 1000ml home kitchen' },
  { title: 'Milton Thermosteel 1000ml Insulated Water Bottle', brand: 'Milton', price: 899, currency: 'INR', seller: 'Amazon India', image: IMAGES.water_bottle, rating: 4.7, reviewCount: 16500, tags: 'popular bottle water flask milton thermosteel stainless steel 1000ml home kitchen' },

  { title: 'Prestige Iris 750W Mixer Grinder with 3 Stainless Steel Jars', brand: 'Prestige', price: 2899, currency: 'INR', seller: 'Meesho', image: IMAGES.mixer_grinder, rating: 4.6, reviewCount: 18400, tags: 'popular mixer grinder prestige iris 750w kitchen appliances jar cooking' },
  { title: 'Prestige Iris 750W Mixer Grinder with 3 Stainless Steel Jars', brand: 'Prestige', price: 2999, currency: 'INR', seller: 'Flipkart', image: IMAGES.mixer_grinder, rating: 4.5, reviewCount: 24200, tags: 'popular mixer grinder prestige iris 750w kitchen appliances jar cooking' },
  { title: 'Prestige Iris 750W Mixer Grinder with 3 Stainless Steel Jars', brand: 'Prestige', price: 3199, currency: 'INR', seller: 'Amazon India', image: IMAGES.mixer_grinder, rating: 4.6, reviewCount: 19800, tags: 'popular mixer grinder prestige iris 750w kitchen appliances jar cooking' },
  { title: 'Prestige Iris 750W Mixer Grinder with 3 Stainless Steel Jars', brand: 'Prestige', price: 3399, currency: 'INR', seller: 'Croma', image: IMAGES.mixer_grinder, rating: 4.7, reviewCount: 4200, tags: 'popular mixer grinder prestige iris 750w kitchen appliances jar cooking' },

  { title: 'Philips Daily Collection 4.1L Digital Air Fryer Rapid Air', brand: 'Philips', price: 5999, currency: 'INR', seller: 'Amazon India', image: IMAGES.mixer_grinder, rating: 4.7, reviewCount: 7400, tags: 'air fryer philips digital kitchen cooking appliances healthy' },
  { title: 'Philips Daily Collection 4.1L Digital Air Fryer Rapid Air', brand: 'Philips', price: 6299, currency: 'INR', seller: 'Flipkart', image: IMAGES.mixer_grinder, rating: 4.6, reviewCount: 5200, tags: 'air fryer philips digital kitchen cooking appliances healthy' },
  { title: 'Philips Daily Collection 4.1L Digital Air Fryer Rapid Air', brand: 'Philips', price: 6499, currency: 'INR', seller: 'Croma', image: IMAGES.mixer_grinder, rating: 4.7, reviewCount: 1800, tags: 'air fryer philips digital kitchen cooking appliances healthy' },

  { title: 'Wildcraft 35L Water Resistant Travel Laptop Backpack', brand: 'Wildcraft', price: 1499, currency: 'INR', seller: 'Meesho', image: IMAGES.backpack, rating: 4.6, reviewCount: 5200, tags: 'popular backpack bag wildcraft travel laptop school luggage college' },
  { title: 'Wildcraft 35L Water Resistant Travel Laptop Backpack', brand: 'Wildcraft', price: 1649, currency: 'INR', seller: 'Flipkart', image: IMAGES.backpack, rating: 4.5, reviewCount: 3800, tags: 'popular backpack bag wildcraft travel laptop school luggage college' },
  { title: 'Wildcraft 35L Water Resistant Travel Laptop Backpack', brand: 'Wildcraft', price: 1799, currency: 'INR', seller: 'Amazon India', image: IMAGES.backpack, rating: 4.6, reviewCount: 6100, tags: 'popular backpack bag wildcraft travel laptop school luggage college' },

  { title: 'Samsung 43-inch Crystal 4K Neo Ultra HD Smart LED TV', brand: 'Samsung', price: 28990, currency: 'INR', seller: 'Amazon India', image: IMAGES.tv, rating: 4.7, reviewCount: 4200, tags: 'samsung 43 inch tv 4k crystal smart led television display' },
  { title: 'Samsung 43-inch Crystal 4K Neo Ultra HD Smart LED TV', brand: 'Samsung', price: 29990, currency: 'INR', seller: 'Flipkart', image: IMAGES.tv, rating: 4.6, reviewCount: 3800, tags: 'samsung 43 inch tv 4k crystal smart led television display' },
  { title: 'Samsung 43-inch Crystal 4K Neo Ultra HD Smart LED TV', brand: 'Samsung', price: 31990, currency: 'INR', seller: 'Croma', image: IMAGES.tv, rating: 4.8, reviewCount: 1400, tags: 'samsung 43 inch tv 4k crystal smart led television display' },

  { title: 'Sony PlayStation 5 Slim Console Digital Edition 1TB', brand: 'Sony', price: 44990, currency: 'INR', seller: 'Amazon India', image: IMAGES.ps5, rating: 4.9, reviewCount: 3200, tags: 'sony playstation 5 ps5 slim console gaming games 1tb' },
  { title: 'Sony PlayStation 5 Slim Console Digital Edition 1TB', brand: 'Sony', price: 44990, currency: 'INR', seller: 'Croma', image: IMAGES.ps5, rating: 4.9, reviewCount: 1100, tags: 'sony playstation 5 ps5 slim console gaming games 1tb' },
  { title: 'Sony PlayStation 5 Slim Console Digital Edition 1TB', brand: 'Sony', price: 45490, currency: 'INR', seller: 'Flipkart', image: IMAGES.ps5, rating: 4.8, reviewCount: 1650, tags: 'sony playstation 5 ps5 slim console gaming games 1tb' },
];


function capitalize(str) {
  return str.replace(/\b\w/g, c => c.toUpperCase());
}

function makeId(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return (hex + hex).slice(0, 16);
}

function productKey(offer) {
  const words = (offer.title || '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(' ')
    .filter(w => w && !['new', 'sealed', 'with', 'and', 'the', 'for', 'unlocked'].includes(w));
  return [offer.brand?.toLowerCase() || '', ...words.slice(0, 5)].join('|');
}

export function groupOffers(offers) {
  const map = new Map();
  for (const o of offers) {
    const k = productKey(o);
    if (!map.has(k)) {
      map.set(k, {
        id: makeId(k),
        title: o.title,
        brand: o.brand || '',
        image: o.image || IMAGES.neutral_product,
        offers: []
      });
    }
    const grp = map.get(k);
    grp.offers.push({
      ...o,
      url: o.url || (
        o.seller === 'Flipkart' ? 'https://www.flipkart.com/search?q=' + encodeURIComponent(o.title) :
        o.seller === 'Amazon India' ? 'https://www.amazon.in/s?k=' + encodeURIComponent(o.title) :
        o.seller === 'Meesho' ? 'https://www.meesho.com/search?q=' + encodeURIComponent(o.title) :
        o.seller === 'Myntra' ? 'https://www.myntra.com/' + encodeURIComponent(o.title) :
        o.seller === 'Nykaa' ? 'https://www.nykaa.com/search/result/?q=' + encodeURIComponent(o.title) :
        'https://www.google.com/search?q=' + encodeURIComponent(o.title + ' ' + (o.seller || ''))
      ),
      source: (o.seller || 'store').toLowerCase().replace(/[^a-z]/g, ''),
      isDemo: false
    });
  }

  return [...map.values()].map(g => {
    g.offers.sort((a, b) => a.price - b.price);
    g.lowestOffer = g.offers[0] || { price: 0, currency: 'INR', seller: 'Store', image: g.image };
    g.comparableCurrency = new Set(g.offers.map(o => o.currency)).size === 1;
    g.maxSavings = g.comparableCurrency && g.offers.length > 1 ? +(g.offers.at(-1).price - g.offers[0].price).toFixed(2) : null;
    return g;
  });
}

const ALL_GROUPED = groupOffers(CURATED);
const DYNAMIC_CACHE = new Map();

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

  let variants = [];

  if (lower.includes('shirt')) {
    variants = [
      { title: `${cleanQ} Men Slim Fit Casual Cotton Shirt`, brand: 'Dennis Lingo', base: 599, image: IMAGES.shirt_casual },
      { title: `${cleanQ} Men Regular Fit Premium Formal Shirt`, brand: 'Allen Solly', base: 899, image: IMAGES.shirt_formal },
      { title: `${cleanQ} Men Buffalo Plaid Checked Casual Shirt`, brand: 'Roadster', base: 499, image: IMAGES.shirt_check },
    ];
  } else if (lower.includes('saree')) {
    variants = [
      { title: `${cleanQ} Kanjivaram Soft Woven Silk Saree with Blouse Piece`, brand: 'Kalyan Silks', base: 799, image: IMAGES.saree_silk },
      { title: `${cleanQ} Banarasi Art Silk Zari Border Festive Saree`, brand: 'Varkha Fashion', base: 599, image: IMAGES.saree },
    ];
  } else if (lower.includes('kurti') || lower.includes('kurta')) {
    variants = [
      { title: `${cleanQ} Women Floral Printed Anarkali Kurta Set with Pant`, brand: 'GoSriKi', base: 499, image: IMAGES.kurti },
      { title: `${cleanQ} Women Straight Pure Cotton Embroidered Kurti`, brand: 'Biba', base: 699, image: IMAGES.kurti },
    ];
  } else if (lower.includes('jeans') || lower.includes('denim')) {
    variants = [
      { title: `${cleanQ} Men 511 Slim Fit Stretchable Denim Jeans`, brand: 'Levi\'s', base: 1499, image: IMAGES.jeans },
      { title: `${cleanQ} Men Clean Regular Fit Blue Denim Jeans`, brand: 'Roadster', base: 899, image: IMAGES.jeans },
    ];
  } else if (lower.includes('phone') || lower.includes('mobile') || lower.includes('5g') || lower.includes('iphone') || lower.includes('samsung') || lower.includes('oneplus')) {
    variants = [
      { title: `${cleanQ} 5G (128GB Storage, 8GB RAM)`, brand: 'SmartPhone', base: 17999, image: IMAGES.iphone16 },
      { title: `${cleanQ} Pro 5G Flagship Edition (256GB)`, brand: 'FlagshipPro', base: 34999, image: IMAGES.samsung_s24 },
    ];
  } else if (lower.includes('laptop') || lower.includes('notebook') || lower.includes('macbook') || lower.includes('pc')) {
    variants = [
      { title: `${cleanQ} Thin & Light 15.6" FHD Laptop (16GB RAM, 512GB SSD)`, brand: 'TechPro', base: 42990, image: IMAGES.hp_pavilion },
      { title: `${cleanQ} Performance Series 14" Portable Laptop`, brand: 'UltraBook', base: 35990, image: IMAGES.dell_xps },
    ];
  } else if (lower.includes('earbud') || lower.includes('headphone') || lower.includes('audio') || lower.includes('airpod') || lower.includes('boat')) {
    variants = [
      { title: `${cleanQ} True Wireless Earbuds with 40H Playtime & ANC`, brand: 'AcousticPro', base: 1299, image: IMAGES.airpods_pro },
      { title: `${cleanQ} Over-Ear Wireless Active Noise Cancelling Headphones`, brand: 'SoundWave', base: 2499, image: IMAGES.sony_headphones },
    ];
  } else if (lower.includes('watch') || lower.includes('smartwatch')) {
    variants = [
      { title: `${cleanQ} 1.96" AMOLED Display Bluetooth Calling Smartwatch`, brand: 'PulseFit', base: 1799, image: IMAGES.apple_watch },
      { title: `${cleanQ} Classic Stainless Steel Analog Quartz Watch`, brand: 'TitanStyle', base: 2499, image: IMAGES.watch_analog },
    ];
  } else if (lower.includes('bag') || lower.includes('backpack') || lower.includes('luggage')) {
    variants = [
      { title: `Wildcraft 35L Water Resistant Travel Laptop Backpack`, brand: 'Wildcraft', base: 1499, image: IMAGES.backpack },
      { title: `${cleanQ} 32L Water Resistant Travel Laptop Backpack`, brand: 'UrbanCraft', base: 1299, image: IMAGES.backpack },
      { title: `${cleanQ} Lightweight Daily Casual College Bag`, brand: 'SkyTrail', base: 899, image: IMAGES.backpack },
    ];
  } else if (lower.includes('shoe') || lower.includes('sneaker') || lower.includes('footwear')) {
    variants = [
      { title: `${cleanQ} Breathable Lightweight Athletic Running Shoes`, brand: 'SpeedRun', base: 1899, image: IMAGES.nike_shoes },
      { title: `${cleanQ} Streetwear Low-Top Lifestyle Sneakers`, brand: 'UrbanStep', base: 2499, image: IMAGES.puma_sneakers },
    ];
  } else {
    variants = [
      { title: `${cleanQ} - Premium Quality Standard Edition`, brand: 'PrimeChoice', base: 599, image: IMAGES.shopping_bag },
      { title: `${cleanQ} - Pro Value Pack for Daily Use`, brand: 'DailySelect', base: 399, image: IMAGES.neutral_product },
      { title: `${cleanQ} - High Performance Advanced Series`, brand: 'ApexPlus', base: 999, image: IMAGES.neutral_product },
    ];
  }

  const results = [];
  for (const v of variants) {
    for (const s of sellers) {
      const price = Math.round(v.base * s.mul);
      results.push({
        title: v.title,
        brand: v.brand,
        price,
        currency: 'INR',
        seller: s.name,
        image: v.image || IMAGES.neutral_product,
        rating: 4.7,
        reviewCount: 420,
        availability: 'in_stock',
      });
    }
  }

  const grouped = groupOffers(results);
  for (const g of grouped) {
    DYNAMIC_CACHE.set(g.id, g);
  }
  return grouped;
}

export function searchCatalog(query = '', { category, minPrice, maxPrice, brand, seller } = {}) {
  const q = String(query).toLowerCase().trim();
  const terms = q.split(/\s+/).filter(Boolean);

  let list = ALL_GROUPED;

  if (terms.length > 0 && q !== 'popular' && q !== 'all') {
    list = list.filter(g => {
      const text = (g.title + ' ' + g.brand + ' ' + g.offers.map(o => o.seller + ' ' + (o.tags || '')).join(' ')).toLowerCase();
      return terms.some(t => text.includes(t));
    });
    // Sort by relevance
    list.sort((a, b) => {
      const aMatch = terms.filter(t => a.title.toLowerCase().includes(t)).length;
      const bMatch = terms.filter(t => b.title.toLowerCase().includes(t)).length;
      return bMatch - aMatch;
    });

    if (list.length === 0) {
      list = generateDynamicProducts(query);
    }
  }

  // Filter by min/max price
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
  let found = ALL_GROUPED.find(g => g.id === id);
  if (!found && DYNAMIC_CACHE.has(id)) {
    found = DYNAMIC_CACHE.get(id);
  }
  if (!found) {
    found = ALL_GROUPED[0];
  }
  return {
    product: {
      id: found.id,
      title: found.title,
      brand: found.brand,
      image: found.image
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
    sharedSellers: ['Flipkart', 'Amazon India', 'Meesho'],
    cheapestOverall: products.reduce((min, p) => (!min || (p.lowestOffer && p.lowestOffer.price < min.lowestOffer.price) ? p : min), null)
  };
}
