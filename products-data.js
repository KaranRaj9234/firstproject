/**
 * ShopEase - Complete Product Catalog Dataset
 * Categories: Electronics, Fashion, Home & Kitchen, Beauty, Sports & Fitness, Books
 */

const PRODUCTS = [
  // --- ELECTRONICS ---
  {
    id: "prod-el-1",
    name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    category: "electronics",
    categoryName: "Electronics",
    originalPrice: 399.99,
    discountPrice: 329.99,
    discountPercent: 18,
    rating: 4.8,
    reviewCount: 428,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=700&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=700&q=80"
    ],
    description: "Industry-leading noise cancellation optimized to you. Magnificent sound engineered to perfection with 30-hour battery life and ultra-comfortable lightweight fit.",
    features: [
      "Auto NC Optimizer delivers pristine noise reduction",
      "Up to 30-hour battery life with 3-minute quick charging",
      "Crystal clear hands-free calling with 4 beamforming mics",
      "Multipoint connection connects up to 2 devices seamlessly"
    ],
    specs: {
      "Battery Life": "30 Hours",
      "Connectivity": "Bluetooth 5.2 / 3.5mm",
      "Weight": "250g",
      "Color": "Silver Gray"
    },
    stock: 24,
    isFeatured: true,
    isBestSeller: true,
    isNew: false,
    isDeal: true
  },
  {
    id: "prod-el-2",
    name: "Apple Watch Ultra 2 GPS + Cellular 49mm",
    category: "electronics",
    categoryName: "Electronics",
    originalPrice: 799.00,
    discountPrice: 749.00,
    discountPercent: 6,
    rating: 4.9,
    reviewCount: 312,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=700&q=80"
    ],
    description: "The most rugged and capable Apple Watch. Built for outdoor endurance athletes, water sports enthusiasts, and daily high-performance tracking with aerospace-grade titanium.",
    features: [
      "49mm aerospace-grade titanium case for ideal balance of weight & durability",
      "Brightest Always-On Retina display with 3000 nits peak brightness",
      "Precision dual-frequency GPS provides exceptional accuracy",
      "Up to 36 hours of normal use or 72 hours in Low Power Mode"
    ],
    specs: {
      "Case Size": "49mm Titanium",
      "Water Resistance": "100 meters (EN13319)",
      "Battery Life": "Up to 36 hours",
      "Display": "Sapphire Front Crystal"
    },
    stock: 15,
    isFeatured: true,
    isBestSeller: false,
    isNew: true,
    isDeal: false
  },
  {
    id: "prod-el-3",
    name: "Keychron Q1 Pro Wireless Custom Mechanical Keyboard",
    category: "electronics",
    categoryName: "Electronics",
    originalPrice: 219.00,
    discountPrice: 189.00,
    discountPercent: 14,
    rating: 4.7,
    reviewCount: 185,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700&q=80",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=700&q=80"
    ],
    description: "A fully customizable 75% layout mechanical keyboard with full CNC machined aluminum body, double-gasket design, and hot-swappable mechanical switches.",
    features: [
      "QMK/VIA wireless custom mechanical keyboard",
      "Bluetooth 5.1 & Type-C wired dual connectivity",
      "Double-Gasket design for soft, cushioned typing feel",
      "South-facing RGB backlight with programmable knob"
    ],
    specs: {
      "Switches": "K Pro Banana Tactile",
      "Material": "CNC Aluminum Case",
      "Layout": "75% ANSI",
      "Backlight": "South-facing RGB"
    },
    stock: 30,
    isFeatured: false,
    isBestSeller: true,
    isNew: false,
    isDeal: true
  },
  {
    id: "prod-el-4",
    name: "GoPro HERO12 Black Action Camera 5.3K60",
    category: "electronics",
    categoryName: "Electronics",
    originalPrice: 399.99,
    discountPrice: 349.99,
    discountPercent: 12,
    rating: 4.6,
    reviewCount: 94,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=700&q=80"
    ],
    description: "Incredible 5.3K video quality, Emmy-winning HyperSmooth 6.0 video stabilization, and extended battery performance for breathtaking adventure capture.",
    features: [
      "5.3K60 + 4K120 resolution high-dynamic range video",
      "HyperSmooth 6.0 stabilization with 360-degree Horizon Lock",
      "Rugged + waterproof to 33ft (10m) right out of the box",
      "Bluetooth audio support for AirPods and other wireless mics"
    ],
    specs: {
      "Max Resolution": "5.3K at 60fps",
      "Sensor": "27MP 1/1.9\" CMOS",
      "Waterproof": "33ft / 10m",
      "Weight": "154g"
    },
    stock: 18,
    isFeatured: false,
    isBestSeller: false,
    isNew: true,
    isDeal: false
  },

  // --- FASHION ---
  {
    id: "prod-fa-1",
    name: "Vintage Distressed Indigo Denim Jacket",
    category: "fashion",
    categoryName: "Fashion",
    originalPrice: 120.00,
    discountPrice: 79.99,
    discountPercent: 33,
    rating: 4.7,
    reviewCount: 215,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=700&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=700&q=80"
    ],
    description: "Timeless trucker-style denim jacket crafted from 100% premium heavy-gauge cotton denim. Features tailored chest pockets, vintage bronze hardware, and washed distress finish.",
    features: [
      "Heavyweight 13.5 oz raw cotton denim",
      "Button-flap chest pockets and side welt pockets",
      "Pre-shrunk wash with subtle fade accents",
      "Standard regular fit suitable for layering"
    ],
    specs: {
      "Material": "100% Organic Cotton",
      "Fit": "Regular Classic Fit",
      "Care": "Machine wash cold, inside out",
      "Sizes": "S, M, L, XL, XXL"
    },
    stock: 45,
    isFeatured: true,
    isBestSeller: true,
    isNew: false,
    isDeal: true
  },
  {
    id: "prod-fa-2",
    name: "Handcrafted Italian Leather Crossbody Messenger Bag",
    category: "fashion",
    categoryName: "Fashion",
    originalPrice: 185.00,
    discountPrice: 139.00,
    discountPercent: 25,
    rating: 4.9,
    reviewCount: 164,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=700&q=80"
    ],
    description: "Crafted from full-grain vegetable-tanned Italian leather with antique brass hardware. Designed to carry your tablet, notebook, wallet, and everyday essentials in sophisticated style.",
    features: [
      "Full-grain cowhide leather that patinas beautifully over time",
      "Padded sleeve fits iPad / 11-inch tablets",
      "Adjustable ergonomic shoulder strap with pad",
      "Secure magnetic snap and zippered internal organizers"
    ],
    specs: {
      "Dimensions": "11.5\" x 9.5\" x 3.2\"",
      "Material": "Full-grain Italian Leather",
      "Strap Drop": "18\" to 25\" adjustable",
      "Lining": "Durable cotton canvas"
    },
    stock: 20,
    isFeatured: true,
    isBestSeller: false,
    isNew: true,
    isDeal: false
  },
  {
    id: "prod-fa-3",
    name: "CloudFoam Lightweight Breathable Urban Sneakers",
    category: "fashion",
    categoryName: "Fashion",
    originalPrice: 110.00,
    discountPrice: 85.00,
    discountPercent: 23,
    rating: 4.6,
    reviewCount: 389,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=700&q=80"
    ],
    description: "Engineered for maximum all-day comfort with ultra-responsive dual-density foam midsoles and flexible knit mesh uppers.",
    features: [
      "Breathable engineered flyknit upper promotes airflow",
      "Shock-absorbing rubber pods on high-wear outsole zones",
      "Removable memory foam cushioned insole",
      "Reflective heel tab for low-light visibility"
    ],
    specs: {
      "Weight": "270g per shoe",
      "Closure": "Lace-up",
      "Colorway": "Crimson Red / Pure White",
      "Sizes": "US 7 - US 13"
    },
    stock: 50,
    isFeatured: false,
    isBestSeller: true,
    isNew: false,
    isDeal: true
  },
  {
    id: "prod-fa-4",
    name: "Classic Retro Aviator Polarized Sunglasses",
    category: "fashion",
    categoryName: "Fashion",
    originalPrice: 75.00,
    discountPrice: 49.99,
    discountPercent: 33,
    rating: 4.5,
    reviewCount: 140,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700&q=80"
    ],
    description: "Iconic teardrop metal frames with premium scratch-resistant polarized TAC lenses. 100% UV400 protection against harmful UVA/UVB rays.",
    features: [
      "Polarized HD lenses reduce road and water glare",
      "Sturdy alloy frame with spring hinges for flexible fit",
      "Soft silicone anti-slip nose pads",
      "Includes hard protective leather case and microfiber cloth"
    ],
    specs: {
      "Frame Material": "Lightweight Metal Alloy",
      "Lens": "Triacetate Polarized",
      "UV Rating": "UV400 (100% UV Block)",
      "Frame Width": "142mm"
    },
    stock: 65,
    isFeatured: false,
    isBestSeller: false,
    isNew: true,
    isDeal: false
  },

  // --- HOME & KITCHEN ---
  {
    id: "prod-hk-1",
    name: "Smart Ultrasonic Ceramic Aroma Essential Oil Diffuser",
    category: "home",
    categoryName: "Home & Kitchen",
    originalPrice: 69.99,
    discountPrice: 49.99,
    discountPercent: 29,
    rating: 4.8,
    reviewCount: 520,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=700&q=80"
    ],
    description: "Fill your living sanctuary with calming scents and warm ambient light. Handcrafted matte ceramic shell with 4 timer modes and whisper-quiet ultrasonic atomization.",
    features: [
      "Handcrafted matte finish ceramic cover",
      "500ml water tank with up to 16 hours continuous mist",
      "Ambient warm LED mood ring with brightness adjustment",
      "Auto shut-off sensor when water runs out"
    ],
    specs: {
      "Capacity": "500 ml",
      "Coverage": "Up to 400 sq. ft.",
      "Noise Level": "< 23 dB",
      "Power": "12W DC Adapter included"
    },
    stock: 40,
    isFeatured: true,
    isBestSeller: true,
    isNew: false,
    isDeal: true
  },
  {
    id: "prod-hk-2",
    name: "Precision Gooseneck Electric Pour-Over Kettle",
    category: "home",
    categoryName: "Home & Kitchen",
    originalPrice: 129.00,
    discountPrice: 99.00,
    discountPercent: 23,
    rating: 4.9,
    reviewCount: 280,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=700&q=80"
    ],
    description: "Designed for coffee perfectionists. Fluted gooseneck spout delivers steady, balanced water flow. Digital base lets you set exact brewing temperature down to the degree.",
    features: [
      "Exact temperature control from 104°F to 212°F (40°C - 100°C)",
      "60-minute temperature hold mode",
      "Built-in brew stopwatch to time pour-over extractions",
      "304 food-grade stainless steel interior"
    ],
    specs: {
      "Capacity": "0.9 Liters",
      "Power": "1200W Rapid Boil",
      "Material": "304 Stainless Steel & Matte Finish",
      "Spout": "Precision Curve Gooseneck"
    },
    stock: 22,
    isFeatured: true,
    isBestSeller: false,
    isNew: true,
    isDeal: false
  },
  {
    id: "prod-hk-3",
    name: "Minimalist Touch-Control Bedside Ambient Lamp",
    category: "home",
    categoryName: "Home & Kitchen",
    originalPrice: 59.99,
    discountPrice: 39.99,
    discountPercent: 33,
    rating: 4.6,
    reviewCount: 195,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=700&q=80"
    ],
    description: "Warm architectural lighting with 3-way smooth touch dimming. Natural beech wood base and linen shade that complements any nightstand or desk.",
    features: [
      "360-degree touch sensor base with stepless dimming",
      "Built-in USB-A and USB-C fast charging ports in base",
      "Energy-efficient warm white 2700K LED bulb included",
      "Natural solid beech wood pedestal"
    ],
    specs: {
      "Dimensions": "14\" Height x 6\" Diameter",
      "Bulb Type": "E26 LED 6W (Included)",
      "Port Output": "5V / 2.4A USB Charging",
      "Color Temp": "2700K Warm Amber"
    },
    stock: 35,
    isFeatured: false,
    isBestSeller: true,
    isNew: false,
    isDeal: true
  },
  {
    id: "prod-hk-4",
    name: "Eco-Friendly Organic Bamboo 6-Piece Bath Towel Set",
    category: "home",
    categoryName: "Home & Kitchen",
    originalPrice: 89.99,
    discountPrice: 64.99,
    discountPercent: 28,
    rating: 4.7,
    reviewCount: 154,
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=700&q=80"
    ],
    description: "Hotel-grade luxury towels blended from 70% natural bamboo viscose and 30% combed Turkish cotton. Extra plush 650 GSM density for incredible softness and water absorption.",
    features: [
      "650 GSM high-density loop weave dries 2x faster than standard towels",
      "Naturally hypoallergenic, odor-resistant, and gentle on sensitive skin",
      "Reinforced double-stitched hem prevents fraying",
      "Includes 2 Bath Towels, 2 Hand Towels, 2 Washcloths"
    ],
    specs: {
      "Set Contents": "2 Bath (30x58\"), 2 Hand (16x30\"), 2 Face (13x13\")",
      "Material": "70% Bamboo Viscose, 30% Turkish Cotton",
      "Certification": "OEKO-TEX Standard 100",
      "Color": "Slate Stone Gray"
    },
    stock: 28,
    isFeatured: false,
    isBestSeller: false,
    isNew: true,
    isDeal: false
  },

  // --- BEAUTY & PERSONAL CARE ---
  {
    id: "prod-be-1",
    name: "Pure Glow 20% Vitamin C + Hyaluronic Acid Facial Serum",
    category: "beauty",
    categoryName: "Beauty & Personal Care",
    originalPrice: 48.00,
    discountPrice: 34.50,
    discountPercent: 28,
    rating: 4.8,
    reviewCount: 672,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=700&q=80"
    ],
    description: "Rejuvenating antioxidant formula designed to brighten dark spots, even skin tone, and deeply hydrate. Formulated with stable L-Ascorbic Acid, Ferulic Acid, and botanicals.",
    features: [
      "Concentrated 20% Vitamin C + Botanical Hyaluronic Acid",
      "Neutralizes free radicals and boosts collagen synthesis",
      "Cruelty-free, vegan, free of parabens, sulfates, and fragrances",
      "Suitable for all skin types including sensitive skin"
    ],
    specs: {
      "Volume": "30ml / 1.0 fl oz",
      "Skin Type": "All Skin Types",
      "Key Ingredients": "Vitamin C, Ferulic Acid, Hyaluronic Acid, Vitamin E",
      "Formulation": "Lightweight water-based serum"
    },
    stock: 55,
    isFeatured: true,
    isBestSeller: true,
    isNew: false,
    isDeal: true
  },
  {
    id: "prod-be-2",
    name: "Organic Damascus Rose Water Hydrating Face Mist",
    category: "beauty",
    categoryName: "Beauty & Personal Care",
    originalPrice: 28.00,
    discountPrice: 21.00,
    discountPercent: 25,
    rating: 4.6,
    reviewCount: 230,
    image: "https://images.unsplash.com/photo-1608248597359-00f7238290ba?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1608248597359-00f7238290ba?w=700&q=80"
    ],
    description: "100% pure steam-distilled Bulgarian rose water. Instantly restores skin pH balance, cools irritation, and sets makeup with an uplifting floral dewiness.",
    features: [
      "100% pure Rosa Damascena distillate with no added alcohol or preservatives",
      "Ultra-fine micro-mist nozzle for uniform refreshing application",
      "Natural toner and setting spray in one",
      "Glass bottle preserves botanical freshness"
    ],
    specs: {
      "Volume": "100ml / 3.4 fl oz",
      "Origin": "Valley of the Roses, Bulgaria",
      "Fragrance": "Natural subtle rose petal",
      "Package": "UV-resistant amber glass"
    },
    stock: 42,
    isFeatured: false,
    isBestSeller: false,
    isNew: true,
    isDeal: false
  },
  {
    id: "prod-be-3",
    name: "Raw African Shea & Coconut Deep Nourishing Body Butter",
    category: "beauty",
    categoryName: "Beauty & Personal Care",
    originalPrice: 32.00,
    discountPrice: 24.00,
    discountPercent: 25,
    rating: 4.9,
    reviewCount: 310,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=700&q=80"
    ],
    description: "Decadently whipped unrefined shea butter enriched with virgin cold-pressed coconut oil and jojoba. Melts into dry skin for 48-hour moisture lock.",
    features: [
      "Whipped texture absorbs without greasy residue",
      "Rich in essential fatty acids and vitamins A & E",
      "Soothes dry elbows, heels, and winter chapping",
      "Subtle natural cocoa-vanilla aroma"
    ],
    specs: {
      "Net Weight": "250g / 8.8 oz",
      "Formulation": "Whipped butter",
      "Preservative Free": "Yes",
      "Expiry": "24 Months from batch"
    },
    stock: 60,
    isFeatured: false,
    isBestSeller: true,
    isNew: false,
    isDeal: true
  },

  // --- SPORTS & OUTDOORS ---
  {
    id: "prod-sp-1",
    name: "ProGrip Alignment Non-Slip Eco Yoga Mat 6mm",
    category: "sports",
    categoryName: "Sports & Outdoors",
    originalPrice: 85.00,
    discountPrice: 59.99,
    discountPercent: 29,
    rating: 4.8,
    reviewCount: 412,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=700&q=80"
    ],
    description: "Designed for mindful movement. Features laser-etched alignment guides to help perfect posture and prevent injury. Superior wet & dry grip made from biodegradable tree rubber.",
    features: [
      "Laser-etched body alignment lines assist yogis of all levels",
      "Dense 6mm cushioning protects knees, elbows, and joints",
      "Non-slip textured surface provides unbeatable traction even during hot yoga",
      "Free carry strap and breathable storage pouch included"
    ],
    specs: {
      "Dimensions": "72\" x 26\" x 6mm (Extra Long & Wide)",
      "Material": "Natural Tree Rubber + Eco Polyurethane",
      "Weight": "2.4 kg",
      "Color": "Forest Sage Green"
    },
    stock: 35,
    isFeatured: true,
    isBestSeller: true,
    isNew: false,
    isDeal: true
  },
  {
    id: "prod-sp-2",
    name: "HydroActive 32oz Insulated Stainless Steel Sports Bottle",
    category: "sports",
    categoryName: "Sports & Outdoors",
    originalPrice: 42.00,
    discountPrice: 29.99,
    discountPercent: 28,
    rating: 4.7,
    reviewCount: 540,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=700&q=80"
    ],
    description: "Double-wall vacuum insulation keeps iced drinks frosty cold for 24 hours or coffee piping hot for 12 hours. Powder-coated sweat-proof exterior with leakproof chug cap.",
    features: [
      "Keeps cold for 24 hours, hot for 12 hours",
      "18/8 pro-grade stainless steel won't retain or transfer flavor",
      "Leakproof spout lid with ergonomic finger carry loop",
      "BPA-free and dishwasher safe"
    ],
    specs: {
      "Capacity": "32 oz (946 ml)",
      "Insulation": "TempLock Double-Wall Vacuum",
      "Lid Style": "Quick-Twist Chug Cap",
      "Diameter": "Fits standard cup holders (3.5\")"
    },
    stock: 75,
    isFeatured: false,
    isBestSeller: true,
    isNew: false,
    isDeal: false
  },
  {
    id: "prod-sp-3",
    name: "SpeedMaster 360 Ball-Bearing Aluminum Jump Rope",
    category: "sports",
    categoryName: "Sports & Outdoors",
    originalPrice: 30.00,
    discountPrice: 19.99,
    discountPercent: 33,
    rating: 4.6,
    reviewCount: 220,
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=700&q=80"
    ],
    description: "Engineered for speed, double-unders, and intense cardio sessions. Dual 360-degree ball bearings ensure smooth, tangle-free rotation at lightning speed.",
    features: [
      "Precision 360-degree dual-bearing mechanism",
      "Lightweight knurled aluminum non-slip handles",
      "10ft kink-resistant polymer coated steel cable (adjustable)",
      "Includes spare cable and carry bag"
    ],
    specs: {
      "Handle Length": "6.7 inches",
      "Cable Length": "10 ft (easily cut to size)",
      "Cable Diameter": "2.5 mm steel wire",
      "Weight": "160g"
    },
    stock: 80,
    isFeatured: false,
    isBestSeller: false,
    isNew: true,
    isDeal: true
  },

  // --- BOOKS & STATIONERY ---
  {
    id: "prod-bk-1",
    name: "Designing Digital Experiences: Principles & Systems (Hardcover)",
    category: "books",
    categoryName: "Books & Stationery",
    originalPrice: 55.00,
    discountPrice: 42.00,
    discountPercent: 24,
    rating: 4.9,
    reviewCount: 180,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=700&q=80"
    ],
    description: "The definitive guide to product design, user psychology, and modern design systems. Beautifully illustrated hardcover edition printed on 120gsm art paper.",
    features: [
      "Covers end-to-end design thinking, typography, layout, and component tokens",
      "Case studies from world-class tech companies",
      "Full-color high-resolution diagrams throughout 380 pages",
      "Linen cloth hardcover with gold foil stamping"
    ],
    specs: {
      "Pages": "384 pages",
      "Publisher": "Starlight Design Press",
      "Language": "English",
      "Format": "Hardcover Collector's Edition"
    },
    stock: 25,
    isFeatured: true,
    isBestSeller: false,
    isNew: true,
    isDeal: false
  },
  {
    id: "prod-bk-2",
    name: "Minimalist Bullet Dotted Journal & Fountain Pen Set",
    category: "books",
    categoryName: "Books & Stationery",
    originalPrice: 38.00,
    discountPrice: 28.50,
    discountPercent: 25,
    rating: 4.8,
    reviewCount: 310,
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=700&q=80"
    ],
    description: "Premium A5 dotted journal with bleeding-resistant 160 GSM bamboo paper, accompanied by a sleek brass-barrel fine nib fountain pen.",
    features: [
      "Ultra-thick 160 GSM pure white paper resists bleed-through and ghosting",
      "5mm subtle light gray dot grid for perfect sketching and bullet journaling",
      "Lay-flat 180° thread binding, elastic closure, dual ribbon bookmarks",
      "Includes matte black brass fountain pen with converter"
    ],
    specs: {
      "Size": "A5 (5.8 x 8.3 inches)",
      "Page Count": "192 numbered pages",
      "Paper Weight": "160 GSM Bamboo Paper",
      "Cover": "Vegan Leather Hardcover"
    },
    stock: 50,
    isFeatured: false,
    isBestSeller: true,
    isNew: false,
    isDeal: true
  },
  {
    id: "prod-bk-3",
    name: "Atomic Habits: An Easy & Proven Way to Build Good Habits",
    category: "books",
    categoryName: "Books & Stationery",
    originalPrice: 27.00,
    discountPrice: 18.90,
    discountPercent: 30,
    rating: 4.9,
    reviewCount: 1450,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=700&q=80"
    ],
    description: "The #1 New York Times bestseller that transforms how you approach everyday progress. Packed with biology, psychology, and neuroscience to reshape your system.",
    features: [
      "Practical strategies to overcome lack of motivation and willpower",
      "How to make time for new habits and design your environment for success",
      "Over 10 million copies sold worldwide",
      "Includes habit scorecard and downloadable tracking templates"
    ],
    specs: {
      "Format": "Paperback with embossed cover",
      "Pages": "320 pages",
      "Language": "English",
      "Dimensions": "6 x 0.8 x 9 inches"
    },
    stock: 90,
    isFeatured: true,
    isBestSeller: true,
    isNew: false,
    isDeal: false
  },

  // --- ADDITIONAL ELECTRONICS & ACCESSORIES ---
  {
    id: "prod-el-5",
    name: "Anker MagGo 3-in-1 Foldable Wireless Charging Station",
    category: "electronics",
    categoryName: "Electronics",
    originalPrice: 109.99,
    discountPrice: 89.99,
    discountPercent: 18,
    rating: 4.7,
    reviewCount: 340,
    image: "https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=700&q=80"
    ],
    description: "Ultra-compact foldable 15W Qi2 fast charging station. Charges iPhone, Apple Watch, and AirPods simultaneously with built-in active cooling.",
    features: [
      "Certified 15W Qi2 ultra-fast magnetic wireless charging",
      "Folds down to the size of a deck of cards for travel",
      "Adjustable viewing angle up to 60 degrees",
      "Includes 40W USB-C PD power brick and braided cable"
    ],
    specs: {
      "Output": "Phone: 15W, Watch: 5W, Buds: 5W",
      "Weight": "195g",
      "Folded Size": "89 x 60 x 25 mm",
      "Compatibility": "MagSafe & Qi2 Compatible Devices"
    },
    stock: 32,
    isFeatured: false,
    isBestSeller: true,
    isNew: true,
    isDeal: true
  },
  {
    id: "prod-fa-5",
    name: "Classic Chronograph Minimalist Quartz Watch",
    category: "fashion",
    categoryName: "Fashion",
    originalPrice: 145.00,
    discountPrice: 99.00,
    discountPercent: 32,
    rating: 4.7,
    reviewCount: 210,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=700&q=80"
    ],
    description: "Sophisticated minimalist dial with dual sub-dials, date aperture, surgical grade 316L stainless steel case, and quick-release genuine leather strap.",
    features: [
      "Japanese Miyota quartz movement with precision accuracy",
      "Scratch-resistant sapphire crystal glass",
      "Water resistant to 50 meters (5 ATM)",
      "Interchangeable quick-release top-grain leather strap"
    ],
    specs: {
      "Case Diameter": "40mm",
      "Case Thickness": "8.5mm Ultra-slim",
      "Band Width": "20mm",
      "Movement": "Japanese Quartz"
    },
    stock: 26,
    isFeatured: true,
    isBestSeller: false,
    isNew: false,
    isDeal: true
  }
];

// Product Categories metadata
const CATEGORIES_DATA = [
  {
    id: "electronics",
    name: "Electronics",
    description: "Cutting-edge gadgets, smart audio, wearables & custom peripherals.",
    icon: "fa-laptop",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80",
    itemCount: 5,
    tag: "High Tech"
  },
  {
    id: "fashion",
    name: "Fashion & Apparel",
    description: "Curated modern jackets, sneakers, Italian leather accessories & eyewear.",
    icon: "fa-shirt",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80",
    itemCount: 5,
    tag: "Trending"
  },
  {
    id: "home",
    name: "Home & Kitchen",
    description: "Aesthetic ceramic diffusers, precision kettles, ambient lamps & luxury linens.",
    icon: "fa-house",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80",
    itemCount: 4,
    tag: "Lifestyle"
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    description: "Clean skincare, organic rose mists, pure Vitamin C serums & whipped butters.",
    icon: "fa-wand-magic-sparkles",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80",
    itemCount: 3,
    tag: "Clean & Organic"
  },
  {
    id: "sports",
    name: "Sports & Fitness",
    description: "Pro alignment yoga mats, insulated thermal flasks & high-speed jump ropes.",
    icon: "fa-dumbbell",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=80",
    itemCount: 3,
    tag: "Active"
  },
  {
    id: "books",
    name: "Books & Stationery",
    description: "Best-selling design hardcovers, habit transformations & luxury bullet journals.",
    icon: "fa-book-open",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80",
    itemCount: 3,
    tag: "Mindful"
  }
];
