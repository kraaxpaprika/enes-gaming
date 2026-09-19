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

/* ==================================================================
   Futbol takımları — "Futbol Kulüpleri" oyunu için.
   logo: Wikipedia'dan armaların thumbnail adresi.
   Yeni takım eklemek için listenin sonuna bir satır ekleyin:
     { name: "Bournemouth", league: "Premier League",
       logo: "https://thumb.wikimedia.org/..." }
   Lig seçilirse seçenekler sadece o ligin takımlarından gelir.
   ================================================================== */
window.FOOTBALL = [
  // Süper Lig
  { name: "Galatasaray", league: "Süper Lig",
    logo: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/20/Galatasaray_Sports_Club_Logo.svg/330px-Galatasaray_Sports_Club_Logo.svg.png" },
  { name: "Fenerbahçe", league: "Süper Lig",
    logo: "https://thumb.wikimedia.org/wikipedia/en/thumb/3/39/Fenerbah%C3%A7e.svg/330px-Fenerbah%C3%A7e.svg.png" },
  { name: "Beşiktaş", league: "Süper Lig",
    logo: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/da/BesiktasJK-Logo.svg/330px-BesiktasJK-Logo.svg.png" },
  { name: "Trabzonspor", league: "Süper Lig",
    logo: "https://thumb.wikimedia.org/wikipedia/en/thumb/d/de/Trabzonspor_Amblem.svg/330px-Trabzonspor_Amblem.svg.png" },

  // Premier League
  { name: "Arsenal", league: "Premier League",
    logo: "https://thumb.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/330px-Arsenal_FC.svg.png" },
  { name: "Chelsea", league: "Premier League",
    logo: "https://thumb.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/330px-Chelsea_FC.svg.png" },
  { name: "Liverpool", league: "Premier League",
    logo: "https://thumb.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/330px-Liverpool_FC.svg.png" },
  { name: "Manchester City", league: "Premier League",
    logo: "https://thumb.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/330px-Manchester_City_FC_badge.svg.png" },
  { name: "Manchester United", league: "Premier League",
    logo: "https://thumb.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/330px-Manchester_United_FC_crest.svg.png" },

  // Serie A
  { name: "Juventus", league: "Serie A",
    logo: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Juventus_FC_-_logo_black_%28Italy%2C_2020%29.svg/330px-Juventus_FC_-_logo_black_%28Italy%2C_2020%29.svg.png" },
  { name: "Inter", league: "Serie A",
    logo: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/330px-FC_Internazionale_Milano_2021.svg.png" },
  { name: "AC Milan", league: "Serie A",
    logo: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d0/Logo_of_AC_Milan.svg/330px-Logo_of_AC_Milan.svg.png" },
  { name: "Napoli", league: "Serie A",
    logo: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/SSC_Napoli_2025_%28white_and_azure%29.svg/330px-SSC_Napoli_2025_%28white_and_azure%29.svg.png" },

  // La Liga
  { name: "Real Madrid", league: "La Liga",
    logo: "https://thumb.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/330px-Real_Madrid_CF.svg.png" },
  { name: "Barcelona", league: "La Liga",
    logo: "https://thumb.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/330px-FC_Barcelona_%28crest%29.svg.png" },
  { name: "Atlético Madrid", league: "La Liga",
    logo: "https://thumb.wikimedia.org/wikipedia/en/thumb/f/f9/Atletico_Madrid_Logo_2024.svg/330px-Atletico_Madrid_Logo_2024.svg.png" },
  { name: "Sevilla", league: "La Liga",
    logo: "https://thumb.wikimedia.org/wikipedia/en/thumb/3/3b/Sevilla_FC_logo.svg/330px-Sevilla_FC_logo.svg.png" }
];
