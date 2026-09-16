/* ==================================================================
   Game content. Add new words / countries here - the games pick
   everything up automatically.
   ================================================================== */

/* English vocabulary: emoji + word + topic */
window.WORDS = [
  // animals
  { emoji: "🐶", word: "dog", topic: "Animals" },
  { emoji: "🐱", word: "cat", topic: "Animals" },
  { emoji: "🐴", word: "horse", topic: "Animals" },
  { emoji: "🐘", word: "elephant", topic: "Animals" },
  { emoji: "🦁", word: "lion", topic: "Animals" },
  { emoji: "🐻", word: "bear", topic: "Animals" },
  { emoji: "🐸", word: "frog", topic: "Animals" },
  { emoji: "🐟", word: "fish", topic: "Animals" },
  { emoji: "🐦", word: "bird", topic: "Animals" },
  { emoji: "🐝", word: "bee", topic: "Animals" },
  { emoji: "🦋", word: "butterfly", topic: "Animals" },
  { emoji: "🐢", word: "turtle", topic: "Animals" },
  { emoji: "🦒", word: "giraffe", topic: "Animals" },
  { emoji: "🐧", word: "penguin", topic: "Animals" },
  { emoji: "🐮", word: "cow", topic: "Animals" },

  // food
  { emoji: "🍎", word: "apple", topic: "Food" },
  { emoji: "🍌", word: "banana", topic: "Food" },
  { emoji: "🍓", word: "strawberry", topic: "Food" },
  { emoji: "🍇", word: "grapes", topic: "Food" },
  { emoji: "🍉", word: "watermelon", topic: "Food" },
  { emoji: "🥕", word: "carrot", topic: "Food" },
  { emoji: "🍞", word: "bread", topic: "Food" },
  { emoji: "🧀", word: "cheese", topic: "Food" },
  { emoji: "🥚", word: "egg", topic: "Food" },
  { emoji: "🍪", word: "cookie", topic: "Food" },
  { emoji: "🍫", word: "chocolate", topic: "Food" },
  { emoji: "🥛", word: "milk", topic: "Food" },

  // school & home
  { emoji: "📚", word: "books", topic: "School" },
  { emoji: "✏️", word: "pencil", topic: "School" },
  { emoji: "✂️", word: "scissors", topic: "School" },
  { emoji: "🎒", word: "backpack", topic: "School" },
  { emoji: "🪑", word: "chair", topic: "School" },
  { emoji: "🕰️", word: "clock", topic: "School" },
  { emoji: "🚪", word: "door", topic: "Home" },
  { emoji: "🛏️", word: "bed", topic: "Home" },
  { emoji: "🪟", word: "window", topic: "Home" },
  { emoji: "🔑", word: "key", topic: "Home" },
  { emoji: "🧦", word: "socks", topic: "Home" },
  { emoji: "👟", word: "shoes", topic: "Home" },

  // outside & travel
  { emoji: "⚽", word: "football", topic: "Sports" },
  { emoji: "🏀", word: "basketball", topic: "Sports" },
  { emoji: "🚲", word: "bicycle", topic: "Travel" },
  { emoji: "🚌", word: "bus", topic: "Travel" },
  { emoji: "✈️", word: "airplane", topic: "Travel" },
  { emoji: "🚂", word: "train", topic: "Travel" },
  { emoji: "🚢", word: "ship", topic: "Travel" },
  { emoji: "🌳", word: "tree", topic: "Nature" },
  { emoji: "🌸", word: "flower", topic: "Nature" },
  { emoji: "☀️", word: "sun", topic: "Nature" },
  { emoji: "🌧️", word: "rain", topic: "Nature" },
  { emoji: "❄️", word: "snow", topic: "Nature" },
  { emoji: "🌈", word: "rainbow", topic: "Nature" },
  { emoji: "⛰️", word: "mountain", topic: "Nature" },
  { emoji: "🌙", word: "moon", topic: "Nature" },
  { emoji: "⭐", word: "star", topic: "Nature" }
];

/* Countries: ISO code (for the flag image), name, capital, continent */
window.COUNTRIES = [
  { code: "tr", name: "Türkiye", capital: "Ankara", continent: "Asia" },
  { code: "de", name: "Germany", capital: "Berlin", continent: "Europe" },
  { code: "fr", name: "France", capital: "Paris", continent: "Europe" },
  { code: "it", name: "Italy", capital: "Rome", continent: "Europe" },
  { code: "es", name: "Spain", capital: "Madrid", continent: "Europe" },
  { code: "gb", name: "United Kingdom", capital: "London", continent: "Europe" },
  { code: "nl", name: "Netherlands", capital: "Amsterdam", continent: "Europe" },
  { code: "pt", name: "Portugal", capital: "Lisbon", continent: "Europe" },
  { code: "gr", name: "Greece", capital: "Athens", continent: "Europe" },
  { code: "se", name: "Sweden", capital: "Stockholm", continent: "Europe" },
  { code: "no", name: "Norway", capital: "Oslo", continent: "Europe" },
  { code: "pl", name: "Poland", capital: "Warsaw", continent: "Europe" },
  { code: "ch", name: "Switzerland", capital: "Bern", continent: "Europe" },
  { code: "ru", name: "Russia", capital: "Moscow", continent: "Europe" },

  { code: "jp", name: "Japan", capital: "Tokyo", continent: "Asia" },
  { code: "cn", name: "China", capital: "Beijing", continent: "Asia" },
  { code: "in", name: "India", capital: "New Delhi", continent: "Asia" },
  { code: "kr", name: "South Korea", capital: "Seoul", continent: "Asia" },
  { code: "sa", name: "Saudi Arabia", capital: "Riyadh", continent: "Asia" },
  { code: "id", name: "Indonesia", capital: "Jakarta", continent: "Asia" },
  { code: "th", name: "Thailand", capital: "Bangkok", continent: "Asia" },
  { code: "az", name: "Azerbaijan", capital: "Baku", continent: "Asia" },

  { code: "eg", name: "Egypt", capital: "Cairo", continent: "Africa" },
  { code: "ma", name: "Morocco", capital: "Rabat", continent: "Africa" },
  { code: "za", name: "South Africa", capital: "Pretoria", continent: "Africa" },
  { code: "ng", name: "Nigeria", capital: "Abuja", continent: "Africa" },
  { code: "ke", name: "Kenya", capital: "Nairobi", continent: "Africa" },
  { code: "et", name: "Ethiopia", capital: "Addis Ababa", continent: "Africa" },

  { code: "us", name: "United States", capital: "Washington, D.C.", continent: "North America" },
  { code: "ca", name: "Canada", capital: "Ottawa", continent: "North America" },
  { code: "mx", name: "Mexico", capital: "Mexico City", continent: "North America" },
  { code: "cu", name: "Cuba", capital: "Havana", continent: "North America" },

  { code: "br", name: "Brazil", capital: "Brasília", continent: "South America" },
  { code: "ar", name: "Argentina", capital: "Buenos Aires", continent: "South America" },
  { code: "cl", name: "Chile", capital: "Santiago", continent: "South America" },
  { code: "pe", name: "Peru", capital: "Lima", continent: "South America" },
  { code: "co", name: "Colombia", capital: "Bogotá", continent: "South America" },

  { code: "au", name: "Australia", capital: "Canberra", continent: "Oceania" },
  { code: "nz", name: "New Zealand", capital: "Wellington", continent: "Oceania" }
];

window.CONTINENTS = [
  "Europe", "Asia", "Africa", "North America", "South America", "Oceania"
];

/* ==================================================================
   Türkçe kelimeler — "Kelime Tamamlama" oyunu için.
   Kelimeler BÜYÜK harfle yazılır (Türkçe İ/I karışmasın diye).
   Yeni kelime eklemek için listenin sonuna bir satır ekleyin:
     { emoji: "🐍", word: "YILAN", topic: "Hayvanlar" }
   seviye: kelime uzunluğundan otomatik hesaplanır.
   ================================================================== */
window.TR_WORDS = [
  // Hayvanlar
  { emoji: "🐶", word: "KÖPEK",     topic: "Hayvanlar" },
  { emoji: "🐱", word: "KEDİ",      topic: "Hayvanlar" },
  { emoji: "🐴", word: "AT",        topic: "Hayvanlar" },
  { emoji: "🐘", word: "FİL",       topic: "Hayvanlar" },
  { emoji: "🦁", word: "ASLAN",     topic: "Hayvanlar" },
  { emoji: "🐻", word: "AYI",       topic: "Hayvanlar" },
  { emoji: "🐸", word: "KURBAĞA",   topic: "Hayvanlar" },
  { emoji: "🐟", word: "BALIK",     topic: "Hayvanlar" },
  { emoji: "🐦", word: "KUŞ",       topic: "Hayvanlar" },
  { emoji: "🐝", word: "ARI",       topic: "Hayvanlar" },
  { emoji: "🦋", word: "KELEBEK",   topic: "Hayvanlar" },
  { emoji: "🐢", word: "KAPLUMBAĞA",topic: "Hayvanlar" },
  { emoji: "🐑", word: "KOYUN",     topic: "Hayvanlar" },
  { emoji: "🐄", word: "İNEK",      topic: "Hayvanlar" },
  { emoji: "🐔", word: "TAVUK",     topic: "Hayvanlar" },
  { emoji: "🦆", word: "ÖRDEK",     topic: "Hayvanlar" },
  { emoji: "🐺", word: "KURT",      topic: "Hayvanlar" },
  { emoji: "🦊", word: "TİLKİ",     topic: "Hayvanlar" },
  { emoji: "🐍", word: "YILAN",     topic: "Hayvanlar" },
  { emoji: "🐜", word: "KARINCA",   topic: "Hayvanlar" },

  // Meyve & sebze
  { emoji: "🍎", word: "ELMA",      topic: "Meyveler" },
  { emoji: "🍐", word: "ARMUT",     topic: "Meyveler" },
  { emoji: "🍌", word: "MUZ",       topic: "Meyveler" },
  { emoji: "🍉", word: "KARPUZ",    topic: "Meyveler" },
  { emoji: "🍇", word: "ÜZÜM",      topic: "Meyveler" },
  { emoji: "🍓", word: "ÇİLEK",     topic: "Meyveler" },
  { emoji: "🍒", word: "KİRAZ",     topic: "Meyveler" },
  { emoji: "🍊", word: "PORTAKAL",  topic: "Meyveler" },
  { emoji: "🍋", word: "LİMON",     topic: "Meyveler" },
  { emoji: "🍑", word: "ŞEFTALİ",   topic: "Meyveler" },
  { emoji: "🥕", word: "HAVUÇ",     topic: "Sebzeler" },
  { emoji: "🥔", word: "PATATES",   topic: "Sebzeler" },
  { emoji: "🍅", word: "DOMATES",   topic: "Sebzeler" },
  { emoji: "🧅", word: "SOĞAN",     topic: "Sebzeler" },
  { emoji: "🥒", word: "SALATALIK", topic: "Sebzeler" },
  { emoji: "🌽", word: "MISIR",     topic: "Sebzeler" },

  // Ev & okul
  { emoji: "🏠", word: "EV",        topic: "Ev" },
  { emoji: "🚪", word: "KAPI",      topic: "Ev" },
  { emoji: "🪟", word: "PENCERE",   topic: "Ev" },
  { emoji: "🪑", word: "SANDALYE",  topic: "Ev" },
  { emoji: "🛏️", word: "YATAK",     topic: "Ev" },
  { emoji: "🥄", word: "KAŞIK",     topic: "Ev" },
  { emoji: "🍴", word: "ÇATAL",     topic: "Ev" },
  { emoji: "🥛", word: "SÜT",       topic: "Ev" },
  { emoji: "🍞", word: "EKMEK",     topic: "Ev" },
  { emoji: "🧀", word: "PEYNİR",    topic: "Ev" },
  { emoji: "📚", word: "KİTAP",     topic: "Okul" },
  { emoji: "✏️", word: "KALEM",     topic: "Okul" },
  { emoji: "📒", word: "DEFTER",    topic: "Okul" },
  { emoji: "🎒", word: "ÇANTA",     topic: "Okul" },
  { emoji: "🏫", word: "OKUL",      topic: "Okul" },
  { emoji: "✂️", word: "MAKAS",     topic: "Okul" },
  { emoji: "📏", word: "CETVEL",    topic: "Okul" },

  // Doğa
  { emoji: "☀️", word: "GÜNEŞ",     topic: "Doğa" },
  { emoji: "🌙", word: "AY",        topic: "Doğa" },
  { emoji: "⭐", word: "YILDIZ",    topic: "Doğa" },
  { emoji: "☁️", word: "BULUT",     topic: "Doğa" },
  { emoji: "🌧️", word: "YAĞMUR",    topic: "Doğa" },
  { emoji: "❄️", word: "KAR",       topic: "Doğa" },
  { emoji: "🌊", word: "DENİZ",     topic: "Doğa" },
  { emoji: "🌳", word: "AĞAÇ",      topic: "Doğa" },
  { emoji: "🌷", word: "LALE",      topic: "Doğa" },
  { emoji: "🌹", word: "GÜL",       topic: "Doğa" },
  { emoji: "⛰️", word: "DAĞ",       topic: "Doğa" },
  { emoji: "🔥", word: "ATEŞ",      topic: "Doğa" },

  // Taşıtlar
  { emoji: "🚗", word: "ARABA",     topic: "Taşıtlar" },
  { emoji: "🚌", word: "OTOBÜS",    topic: "Taşıtlar" },
  { emoji: "🚲", word: "BİSİKLET",  topic: "Taşıtlar" },
  { emoji: "✈️", word: "UÇAK",      topic: "Taşıtlar" },
  { emoji: "🚢", word: "GEMİ",      topic: "Taşıtlar" },
  { emoji: "🚂", word: "TREN",      topic: "Taşıtlar" },
  { emoji: "🚁", word: "HELİKOPTER",topic: "Taşıtlar" },

  // Vücut & aile
  { emoji: "👁️", word: "GÖZ",       topic: "Vücudumuz" },
  { emoji: "👂", word: "KULAK",     topic: "Vücudumuz" },
  { emoji: "👃", word: "BURUN",     topic: "Vücudumuz" },
  { emoji: "✋", word: "EL",        topic: "Vücudumuz" },
  { emoji: "🦶", word: "AYAK",      topic: "Vücudumuz" },
  { emoji: "🦷", word: "DİŞ",       topic: "Vücudumuz" },
  { emoji: "👩", word: "ANNE",      topic: "Ailem" },
  { emoji: "👨", word: "BABA",      topic: "Ailem" },
  { emoji: "👶", word: "BEBEK",     topic: "Ailem" },
  { emoji: "👵", word: "BABAANNE",  topic: "Ailem" },
  { emoji: "👦", word: "KARDEŞ",    topic: "Ailem" }
];
