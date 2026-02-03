// Complete Marathi Alphabet Data
export interface MarathiLetter {
  letter: string;
  pronunciation: string;
  example: string;
  exampleMeaning: string;
  color: string;
}

// स्वर (Vowels)
export const swar: MarathiLetter[] = [
  { letter: "अ", pronunciation: "a", example: "अनार", exampleMeaning: "डाळिंब", color: "kid-orange" },
  { letter: "आ", pronunciation: "aa", example: "आंबा", exampleMeaning: "फळ", color: "kid-pink" },
  { letter: "इ", pronunciation: "i", example: "इमारत", exampleMeaning: "बिल्डिंग", color: "kid-teal" },
  { letter: "ई", pronunciation: "ee", example: "ईडली", exampleMeaning: "खाद्यपदार्थ", color: "kid-purple" },
  { letter: "उ", pronunciation: "u", example: "उंट", exampleMeaning: "प्राणी", color: "kid-yellow" },
  { letter: "ऊ", pronunciation: "oo", example: "ऊन", exampleMeaning: "सूर्यप्रकाश", color: "kid-green" },
  { letter: "ए", pronunciation: "e", example: "एकतार", exampleMeaning: "वाद्य", color: "kid-blue" },
  { letter: "ऐ", pronunciation: "ai", example: "ऐरावत", exampleMeaning: "हत्ती", color: "kid-red" },
  { letter: "ओ", pronunciation: "o", example: "ओवा", exampleMeaning: "मसाला", color: "kid-orange" },
  { letter: "औ", pronunciation: "au", example: "औषध", exampleMeaning: "दवाई", color: "kid-pink" },
  { letter: "अं", pronunciation: "am", example: "अंगठा", exampleMeaning: "हाताचे बोट", color: "kid-teal" },
  { letter: "अः", pronunciation: "ah", example: "दुःख", exampleMeaning: "वेदना", color: "kid-purple" },
];

// व्यंजन (Consonants)
export const vyanjan: MarathiLetter[] = [
  // क वर्ग
  { letter: "क", pronunciation: "ka", example: "कमळ", exampleMeaning: "फूल", color: "kid-orange" },
  { letter: "ख", pronunciation: "kha", example: "खरगोश", exampleMeaning: "प्राणी", color: "kid-pink" },
  { letter: "ग", pronunciation: "ga", example: "गाय", exampleMeaning: "प्राणी", color: "kid-teal" },
  { letter: "घ", pronunciation: "gha", example: "घर", exampleMeaning: "राहण्याची जागा", color: "kid-purple" },
  { letter: "ङ", pronunciation: "nga", example: "पंख", exampleMeaning: "पक्ष्याचे", color: "kid-yellow" },
  
  // च वर्ग
  { letter: "च", pronunciation: "cha", example: "चंद्र", exampleMeaning: "आकाशातील", color: "kid-green" },
  { letter: "छ", pronunciation: "chha", example: "छत्री", exampleMeaning: "पावसाळी", color: "kid-blue" },
  { letter: "ज", pronunciation: "ja", example: "जहाज", exampleMeaning: "पाण्यातील वाहन", color: "kid-red" },
  { letter: "झ", pronunciation: "jha", example: "झाड", exampleMeaning: "वनस्पती", color: "kid-orange" },
  { letter: "ञ", pronunciation: "nya", example: "पंजा", exampleMeaning: "हात", color: "kid-pink" },
  
  // ट वर्ग
  { letter: "ट", pronunciation: "ta", example: "टोपी", exampleMeaning: "कपडा", color: "kid-teal" },
  { letter: "ठ", pronunciation: "tha", example: "ठिकाण", exampleMeaning: "जागा", color: "kid-purple" },
  { letter: "ड", pronunciation: "da", example: "डोंगर", exampleMeaning: "पर्वत", color: "kid-yellow" },
  { letter: "ढ", pronunciation: "dha", example: "ढोल", exampleMeaning: "वाद्य", color: "kid-green" },
  { letter: "ण", pronunciation: "na", example: "बाण", exampleMeaning: "शस्त्र", color: "kid-blue" },
  
  // त वर्ग
  { letter: "त", pronunciation: "ta", example: "तारा", exampleMeaning: "आकाशातील", color: "kid-red" },
  { letter: "थ", pronunciation: "tha", example: "थंडी", exampleMeaning: "हवामान", color: "kid-orange" },
  { letter: "द", pronunciation: "da", example: "दात", exampleMeaning: "शरीराचा भाग", color: "kid-pink" },
  { letter: "ध", pronunciation: "dha", example: "धनुष्य", exampleMeaning: "शस्त्र", color: "kid-teal" },
  { letter: "न", pronunciation: "na", example: "नाक", exampleMeaning: "शरीराचा भाग", color: "kid-purple" },
  
  // प वर्ग
  { letter: "प", pronunciation: "pa", example: "पतंग", exampleMeaning: "उडणारी", color: "kid-yellow" },
  { letter: "फ", pronunciation: "pha", example: "फूल", exampleMeaning: "वनस्पती", color: "kid-green" },
  { letter: "ब", pronunciation: "ba", example: "बदक", exampleMeaning: "पक्षी", color: "kid-blue" },
  { letter: "भ", pronunciation: "bha", example: "भात", exampleMeaning: "अन्न", color: "kid-red" },
  { letter: "म", pronunciation: "ma", example: "मोर", exampleMeaning: "पक्षी", color: "kid-orange" },
  
  // अंतस्थ
  { letter: "य", pronunciation: "ya", example: "यंत्र", exampleMeaning: "मशीन", color: "kid-pink" },
  { letter: "र", pronunciation: "ra", example: "रथ", exampleMeaning: "वाहन", color: "kid-teal" },
  { letter: "ल", pronunciation: "la", example: "लिंबू", exampleMeaning: "फळ", color: "kid-purple" },
  { letter: "व", pronunciation: "va", example: "वाघ", exampleMeaning: "प्राणी", color: "kid-yellow" },
  
  // उष्मे
  { letter: "श", pronunciation: "sha", example: "शाळा", exampleMeaning: "विद्यालय", color: "kid-green" },
  { letter: "ष", pronunciation: "sha", example: "षटकोन", exampleMeaning: "आकार", color: "kid-blue" },
  { letter: "स", pronunciation: "sa", example: "सफरचंद", exampleMeaning: "फळ", color: "kid-red" },
  { letter: "ह", pronunciation: "ha", example: "हत्ती", exampleMeaning: "प्राणी", color: "kid-orange" },
  
  // संयुक्त
  { letter: "ळ", pronunciation: "la", example: "बाळ", exampleMeaning: "लहान मूल", color: "kid-pink" },
  { letter: "क्ष", pronunciation: "ksha", example: "क्षेत्र", exampleMeaning: "जागा", color: "kid-teal" },
  { letter: "ज्ञ", pronunciation: "dnya", example: "ज्ञान", exampleMeaning: "विद्या", color: "kid-purple" },
];

// Numbers
export const ankh = [
  { number: "०", value: 0, word: "शून्य" },
  { number: "१", value: 1, word: "एक" },
  { number: "२", value: 2, word: "दोन" },
  { number: "३", value: 3, word: "तीन" },
  { number: "४", value: 4, word: "चार" },
  { number: "५", value: 5, word: "पाच" },
  { number: "६", value: 6, word: "सहा" },
  { number: "७", value: 7, word: "सात" },
  { number: "८", value: 8, word: "आठ" },
  { number: "९", value: 9, word: "नऊ" },
  { number: "१०", value: 10, word: "दहा" },
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
  { letter: "अ", word: "आंबा", image: "🥭" },
  { letter: "क", word: "कमळ", image: "🪷" },
  { letter: "ग", word: "गाय", image: "🐄" },
  { letter: "घ", word: "घर", image: "🏠" },
  { letter: "च", word: "चंद्र", image: "🌙" },
  { letter: "ज", word: "जहाज", image: "🚢" },
  { letter: "झ", word: "झाड", image: "🌳" },
  { letter: "ट", word: "टोपी", image: "🎩" },
  { letter: "प", word: "पतंग", image: "🪁" },
  { letter: "फ", word: "फूल", image: "🌸" },
  { letter: "ब", word: "बदक", image: "🦆" },
  { letter: "म", word: "मोर", image: "🦚" },
  { letter: "स", word: "सफरचंद", image: "🍎" },
  { letter: "ह", word: "हत्ती", image: "🐘" },
  { letter: "त", word: "तारा", image: "⭐" },
];
