// clock.js — Updates time and date every second

function updateClock() {
  const now = new Date();

  // Time: HH:MM:SS
  const time = now.toLocaleTimeString('en-KE', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  // Date: e.g. Thursday, 16 April 2026
  const date = now.toLocaleDateString('en-KE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  document.getElementById('time').textContent = time;
  document.getElementById('date').textContent = date;
}

updateClock();
setInterval(updateClock, 1000);