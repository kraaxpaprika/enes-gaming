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
