// quotes.js — Quotes with author displayed
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote-btn');

const fallbackQuotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "Get busy living or get busy dying.", author: "Stephen King" },
  { text: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Act as if what you do makes a difference. It does.", author: "William James" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
  { text: "Success is not final, failure is not fatal — it is the courage to continue that counts.", author: "Winston Churchill" },
];

async function fetchRandomQuote() {
  try {
    const response = await fetch('https://api.quotable.io/random');
    if (response.ok) {
      const data = await response.json();
      updateQuoteUI(data.content, data.author);
      saveQuote(data.content, data.author);
      return;
    }
    throw new Error('API failed');
  } catch (error) {
    console.warn('Quote API unavailable, using fallback');
    const pick = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    updateQuoteUI(pick.text, pick.author);
    saveQuote(pick.text, pick.author);
  }
}

function updateQuoteUI(text, author) {
  quoteText.innerText = text;
  if (quoteAuthor) quoteAuthor.innerText = `— ${author}`;
}

function saveQuote(text, author) {
  localStorage.setItem('dashboardQuote', JSON.stringify({
    text,
    author,
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
        updateQuoteUI(stored.text, stored.author || '');
        shouldRefresh = false;
      }
    } catch (e) {}
  }
  if (shouldRefresh) fetchRandomQuote();
}

newQuoteBtn.addEventListener('click', fetchRandomQuote);
initQuote();
