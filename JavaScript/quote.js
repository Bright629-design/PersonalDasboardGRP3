// quotes.js — Quotes only, no author displayed

const quoteText = document.getElementById('quote-text');
const newQuoteBtn = document.getElementById('new-quote-btn');

const fallbackQuotes = [
  "The only way to do great work is to love what you do.",
  "Life is what happens when you're busy making other plans.",
  "Get busy living or get busy dying.",
  "You only live once, but if you do it right, once is enough.",
  "Believe you can and you're halfway there.",
  "Act as if what you do makes a difference. It does.",
  "In the middle of every difficulty lies opportunity.",
  "It does not matter how slowly you go as long as you do not stop.",
  "Everything you've ever wanted is on the other side of fear.",
  "Success is not final, failure is not fatal — it is the courage to continue that counts.",
];

async function fetchRandomQuote() {
  try {
    const response = await fetch('https://api.quotable.io/random');
    if (response.ok) {
      const data = await response.json();
      updateQuoteUI(data.content);
      saveQuote(data.content);
      return;
    }
    throw new Error('API failed');
  } catch (error) {
    console.warn('Quote API unavailable, using fallback');
    const pick = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    updateQuoteUI(pick);
    saveQuote(pick);
  }
}

function updateQuoteUI(text) {
  quoteText.innerText = text;
}

function saveQuote(text) {
  localStorage.setItem('dashboardQuote', JSON.stringify({
    text,
    savedAt: Date.now()
  }));
}

function initQuote() {
  const storedRaw = localStorage.getItem('dashboardQuote');
  let shouldRefresh = true;

  if (storedRaw) {
    try {
      const stored = JSON.parse(storedRaw);
      const oneDay = 24 * 60 * 60 * 1000;
      if (stored.savedAt && (Date.now() - stored.savedAt) < oneDay) {
        updateQuoteUI(stored.text);
        shouldRefresh = false;
      }
    } catch (e) {}
  }

  if (shouldRefresh) fetchRandomQuote();
}

newQuoteBtn.addEventListener('click', fetchRandomQuote);

initQuote();