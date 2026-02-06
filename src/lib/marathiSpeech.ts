// Marathi Speech Utility - Proper female voice pronunciation

let cachedVoice: SpeechSynthesisVoice | null = null;
let voicesLoaded = false;

// Get the best available Marathi female voice
function getMarathiVoice(): SpeechSynthesisVoice | null {
  if (cachedVoice && voicesLoaded) return cachedVoice;

  const voices = speechSynthesis.getVoices();
  if (voices.length === 0) return null;

  // Priority order for finding the best Marathi voice:
  // 1. Female Marathi voice (mr-IN)
  // 2. Any Marathi voice
  // 3. Female Hindi voice (hi-IN) as fallback (similar script)
  // 4. Any Hindi voice

  const marathiVoices = voices.filter(
    (v) => v.lang.toLowerCase().includes("mr") || v.lang.toLowerCase().includes("marathi"),
  );

  // Prefer female voices (common names/patterns for female voices)
  const femalePatterns = ["female", "woman", "lekha", "aditi", "raveena", "priya", "sunita", "meera"];

  // Try to find a female Marathi voice
  let selectedVoice = marathiVoices.find((v) =>
    femalePatterns.some((pattern) => v.name.toLowerCase().includes(pattern)),
  );

  // If no female Marathi voice, use any Marathi voice
  if (!selectedVoice && marathiVoices.length > 0) {
    selectedVoice = marathiVoices[0];
  }

  // Fallback to Hindi if no Marathi voice
  if (!selectedVoice) {
    const hindiVoices = voices.filter(
      (v) => v.lang.toLowerCase().includes("hi") || v.lang.toLowerCase().includes("hindi"),
    );

    selectedVoice =
      hindiVoices.find((v) => femalePatterns.some((pattern) => v.name.toLowerCase().includes(pattern))) ||
      hindiVoices[0];
  }

  cachedVoice = selectedVoice || null;
  voicesLoaded = true;
  return cachedVoice;
}

// Initialize voices when they become available
export function initVoices(): Promise<void> {
  return new Promise((resolve) => {
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
      voicesLoaded = true;
      resolve();
      return;
    }

    speechSynthesis.onvoiceschanged = () => {
      voicesLoaded = true;
      resolve();
    };

    // Timeout fallback
    setTimeout(resolve, 1000);
  });
}

// Speak text in proper Marathi female voice
export function speakMarathi(
  text: string,
  options?: {
    rate?: number;
    pitch?: number;
    onEnd?: () => void;
  },
): void {
  // Cancel any ongoing speech
  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "mr-IN";
  utterance.rate = options?.rate ?? 1;
  utterance.pitch = options?.pitch ?? 1; // Slightly higher for female voice

  const voice = getMarathiVoice();
  if (voice) {
    utterance.voice = voice;
  }

  if (options?.onEnd) {
    utterance.onend = options.onEnd;
  }

  speechSynthesis.speak(utterance);
}

// Speak letter with word (e.g., "अ म्हणजे अननस")
export function speakLetterWithWord(letter: string, example: string): void {
  // Cancel any ongoing speech
  speechSynthesis.cancel();

  // First speak the letter slowly
  const letterUtterance = new SpeechSynthesisUtterance(letter);
  letterUtterance.lang = "mr-IN";
  letterUtterance.rate = 0.4;
  letterUtterance.pitch = 1.2;

  const voice = getMarathiVoice();
  if (voice) {
    letterUtterance.voice = voice;
  }

  letterUtterance.onend = () => {
    // Then speak the full phrase after the letter
    setTimeout(() => {
      const phraseUtterance = new SpeechSynthesisUtterance(`${letter} म्हणजे ${example}`);
      phraseUtterance.lang = "mr-IN";
      phraseUtterance.rate = 0.55;
      phraseUtterance.pitch = 1.1;

      if (voice) {
        phraseUtterance.voice = voice;
      }

      speechSynthesis.speak(phraseUtterance);
    }, 300);
  };

  speechSynthesis.speak(letterUtterance);
}

// Simple pronunciation for feedback words like "शाब्बास"
export function speakFeedback(text: string): void {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "mr-IN";
  utterance.rate = 0.7;
  utterance.pitch = 1.2;

  const voice = getMarathiVoice();
  if (voice) {
    utterance.voice = voice;
  }

  speechSynthesis.speak(utterance);
}
