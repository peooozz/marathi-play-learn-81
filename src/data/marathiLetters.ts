// Complete Marathi Alphabet Data - Based on Target Publications Chart
export interface MarathiLetter {
  letter: string;
  pronunciation: string;
  example: string;
  exampleMeaning: string;
  emoji: string;
  color: string;
}

// स्वर (Vowels) - 16 vowels based on chart
export const swar: MarathiLetter[] = [
  { letter: "अ", pronunciation: "a", example: "अननस", exampleMeaning: "Pineapple", emoji: "🍍", color: "kid-red" },
  { letter: "आ", pronunciation: "aa", example: "आवळा", exampleMeaning: "Gooseberry", emoji: "🫒", color: "kid-pink" },
  { letter: "इ", pronunciation: "i", example: "इमारत", exampleMeaning: "Building", emoji: "🏢", color: "kid-teal" },
  { letter: "ई", pronunciation: "ee", example: "ईडलिंबू", exampleMeaning: "Lemon", emoji: "🍋", color: "kid-purple" },
  { letter: "उ", pronunciation: "u", example: "उशी", exampleMeaning: "Pillow", emoji: "🛏️", color: "kid-yellow" },
  { letter: "ऊ", pronunciation: "oo", example: "ऊस", exampleMeaning: "Sugarcane", emoji: "🎋", color: "kid-green" },
  { letter: "ऋ", pronunciation: "ru", example: "ऋषी", exampleMeaning: "Sage", emoji: "🧘", color: "kid-blue" },
  { letter: "ए", pronunciation: "e", example: "एडका", exampleMeaning: "Ram", emoji: "🐏", color: "kid-orange" },
  { letter: "ऐ", pronunciation: "ai", example: "ऐरण", exampleMeaning: "Anvil", emoji: "⚒️", color: "kid-red" },
  { letter: "ओ", pronunciation: "o", example: "ओठ", exampleMeaning: "Lips", emoji: "👄", color: "kid-pink" },
  { letter: "औ", pronunciation: "au", example: "औषध", exampleMeaning: "Medicine", emoji: "💊", color: "kid-teal" },
  { letter: "अं", pronunciation: "am", example: "अंगठी", exampleMeaning: "Ring", emoji: "💍", color: "kid-purple" },
  { letter: "अः", pronunciation: "ah", example: "प्रातःकाल", exampleMeaning: "Morning", emoji: "🌅", color: "kid-yellow" },
  { letter: "ॲ", pronunciation: "ae", example: "बॅट", exampleMeaning: "Bat", emoji: "🏏", color: "kid-green" },
  { letter: "ऑ", pronunciation: "ao", example: "रॉकेट", exampleMeaning: "Rocket", emoji: "🚀", color: "kid-blue" },
];

// व्यंजन (Consonants) - Based on chart
export const vyanjan: MarathiLetter[] = [
  // क वर्ग
  { letter: "क", pronunciation: "ka", example: "कमळ", exampleMeaning: "Lotus", emoji: "🪷", color: "kid-red" },
  { letter: "ख", pronunciation: "kha", example: "खडू", exampleMeaning: "Chalk", emoji: "🖍️", color: "kid-pink" },
  { letter: "ग", pronunciation: "ga", example: "गवत", exampleMeaning: "Grass", emoji: "🌿", color: "kid-teal" },
  { letter: "घ", pronunciation: "gha", example: "घर", exampleMeaning: "House", emoji: "🏠", color: "kid-purple" },
  { letter: "ङ", pronunciation: "nga", example: "पंख", exampleMeaning: "Wing", emoji: "🪽", color: "kid-yellow" },
  
  // च वर्ग
  { letter: "च", pronunciation: "cha", example: "चटई", exampleMeaning: "Mat", emoji: "🧶", color: "kid-green" },
  { letter: "छ", pronunciation: "chha", example: "छत्री", exampleMeaning: "Umbrella", emoji: "☂️", color: "kid-blue" },
  { letter: "ज", pronunciation: "ja", example: "जहाज", exampleMeaning: "Ship", emoji: "🚢", color: "kid-orange" },
  { letter: "झ", pronunciation: "jha", example: "झुणा", exampleMeaning: "Swing", emoji: "🎠", color: "kid-red" },
  { letter: "ञ", pronunciation: "nya", example: "पंजा", exampleMeaning: "Paw", emoji: "🐾", color: "kid-pink" },
  
  // ट वर्ग
  { letter: "ट", pronunciation: "ta", example: "टरबूज", exampleMeaning: "Watermelon", emoji: "🍉", color: "kid-teal" },
  { letter: "ठ", pronunciation: "tha", example: "ठसा", exampleMeaning: "Stamp", emoji: "📮", color: "kid-purple" },
  { letter: "ड", pronunciation: "da", example: "डफ", exampleMeaning: "Drum", emoji: "🥁", color: "kid-yellow" },
  { letter: "ढ", pronunciation: "dha", example: "ढग", exampleMeaning: "Cloud", emoji: "☁️", color: "kid-green" },
  { letter: "ण", pronunciation: "na", example: "बाण", exampleMeaning: "Arrow", emoji: "🏹", color: "kid-blue" },
  
  // त वर्ग
  { letter: "त", pronunciation: "ta", example: "तबला", exampleMeaning: "Tabla", emoji: "🪘", color: "kid-orange" },
  { letter: "थ", pronunciation: "tha", example: "थवा", exampleMeaning: "Flock", emoji: "🦆", color: "kid-red" },
  { letter: "द", pronunciation: "da", example: "दप्तर", exampleMeaning: "Bag", emoji: "🎒", color: "kid-pink" },
  { letter: "ध", pronunciation: "dha", example: "धरण", exampleMeaning: "Dam", emoji: "🌊", color: "kid-teal" },
  { letter: "न", pronunciation: "na", example: "नख", exampleMeaning: "Nail", emoji: "💅", color: "kid-purple" },
  
  // प वर्ग
  { letter: "प", pronunciation: "pa", example: "पणती", exampleMeaning: "Lamp", emoji: "🪔", color: "kid-yellow" },
  { letter: "फ", pronunciation: "pha", example: "फणस", exampleMeaning: "Jackfruit", emoji: "🍈", color: "kid-green" },
  { letter: "ब", pronunciation: "ba", example: "बगळा", exampleMeaning: "Heron", emoji: "🦢", color: "kid-blue" },
  { letter: "भ", pronunciation: "bha", example: "भटजी", exampleMeaning: "Priest", emoji: "🙏", color: "kid-orange" },
  { letter: "म", pronunciation: "ma", example: "मका", exampleMeaning: "Corn", emoji: "🌽", color: "kid-red" },
  
  // अंतस्थ
  { letter: "य", pronunciation: "ya", example: "यज्ञ", exampleMeaning: "Ritual", emoji: "🔥", color: "kid-pink" },
  { letter: "र", pronunciation: "ra", example: "रत", exampleMeaning: "Chariot", emoji: "🛞", color: "kid-teal" },
  { letter: "ल", pronunciation: "la", example: "लगोरी", exampleMeaning: "Game", emoji: "🎯", color: "kid-purple" },
  { letter: "व", pronunciation: "va", example: "वड", exampleMeaning: "Banyan", emoji: "🌳", color: "kid-yellow" },
  
  // उष्मे
  { letter: "श", pronunciation: "sha", example: "शहाळे", exampleMeaning: "Coconut", emoji: "🥥", color: "kid-green" },
  { letter: "ष", pronunciation: "sha", example: "षटकोन", exampleMeaning: "Hexagon", emoji: "⬡", color: "kid-blue" },
  { letter: "स", pronunciation: "sa", example: "सरडा", exampleMeaning: "Lizard", emoji: "🦎", color: "kid-orange" },
  { letter: "ह", pronunciation: "ha", example: "हत्ती", exampleMeaning: "Elephant", emoji: "🐘", color: "kid-red" },
  
  // संयुक्त
  { letter: "ळ", pronunciation: "la", example: "गूळ", exampleMeaning: "Jaggery", emoji: "🍬", color: "kid-pink" },
  { letter: "क्ष", pronunciation: "ksha", example: "क्षत्रिय", exampleMeaning: "Warrior", emoji: "⚔️", color: "kid-teal" },
  { letter: "ज्ञ", pronunciation: "dnya", example: "ज्ञानेश्वर", exampleMeaning: "Saint", emoji: "🙏", color: "kid-purple" },
];

// Numbers - अंक ओळख
export const ankh = [
  { number: "१", value: 1, word: "एक", emoji: "1️⃣" },
  { number: "२", value: 2, word: "दोन", emoji: "2️⃣" },
  { number: "३", value: 3, word: "तीन", emoji: "3️⃣" },
  { number: "४", value: 4, word: "चार", emoji: "4️⃣" },
  { number: "५", value: 5, word: "पाच", emoji: "5️⃣" },
  { number: "६", value: 6, word: "सहा", emoji: "6️⃣" },
  { number: "७", value: 7, word: "सात", emoji: "7️⃣" },
  { number: "८", value: 8, word: "आठ", emoji: "8️⃣" },
  { number: "९", value: 9, word: "नऊ", emoji: "9️⃣" },
  { number: "१०", value: 10, word: "दहा", emoji: "🔟" },
];

// All letters combined
export const allLetters = [...swar, ...vyanjan];

// Worksheet data - matching exercises
export interface MatchingPair {
  letter: string;
  word: string;
  image: string;
}

export const matchingPairs: MatchingPair[] = [
  { letter: "अ", word: "अननस", image: "🍍" },
  { letter: "आ", word: "आवळा", image: "🫒" },
  { letter: "क", word: "कमळ", image: "🪷" },
  { letter: "ख", word: "खडू", image: "🖍️" },
  { letter: "ग", word: "गवत", image: "🌿" },
  { letter: "घ", word: "घर", image: "🏠" },
  { letter: "च", word: "चटई", image: "🧶" },
  { letter: "छ", word: "छत्री", image: "☂️" },
  { letter: "ज", word: "जहाज", image: "🚢" },
  { letter: "झ", word: "झुणा", image: "🎠" },
  { letter: "ट", word: "टरबूज", image: "🍉" },
  { letter: "प", word: "पणती", image: "🪔" },
  { letter: "फ", word: "फणस", image: "🍈" },
  { letter: "म", word: "मका", image: "🌽" },
  { letter: "स", word: "सरडा", image: "🦎" },
  { letter: "ह", word: "हत्ती", image: "🐘" },
];

// Fill in the blanks data
export interface FillBlankQuestion {
  word: string;
  meaning: string;
  blanks: { position: number; letter: string }[];
  emoji: string;
}

export const fillBlankQuestions: FillBlankQuestion[] = [
  { word: "कमळ", meaning: "Lotus", blanks: [{ position: 0, letter: "क" }], emoji: "🪷" },
  { word: "घर", meaning: "House", blanks: [{ position: 0, letter: "घ" }], emoji: "🏠" },
  { word: "जहाज", meaning: "Ship", blanks: [{ position: 0, letter: "ज" }], emoji: "🚢" },
  { word: "छत्री", meaning: "Umbrella", blanks: [{ position: 0, letter: "छ" }], emoji: "☂️" },
  { word: "हत्ती", meaning: "Elephant", blanks: [{ position: 0, letter: "ह" }], emoji: "🐘" },
  { word: "मका", meaning: "Corn", blanks: [{ position: 0, letter: "म" }], emoji: "🌽" },
  { word: "पणती", meaning: "Lamp", blanks: [{ position: 0, letter: "प" }], emoji: "🪔" },
  { word: "तबला", meaning: "Tabla", blanks: [{ position: 0, letter: "त" }], emoji: "🪘" },
  { word: "बगळा", meaning: "Heron", blanks: [{ position: 0, letter: "ब" }], emoji: "🦢" },
  { word: "सरडा", meaning: "Lizard", blanks: [{ position: 0, letter: "स" }], emoji: "🦎" },
  { word: "गवत", meaning: "Grass", blanks: [{ position: 0, letter: "ग" }], emoji: "🌿" },
  { word: "अननस", meaning: "Pineapple", blanks: [{ position: 0, letter: "अ" }], emoji: "🍍" },
];
