// weather.js — Fetches real weather via Open-Meteo (free, no API key needed)
// Uses WMO weather codes to map to icons + descriptions

const WMO_CODES = {
  0:  { icon: '☀️',  desc: 'Clear sky' },
  1:  { icon: '🌤️', desc: 'Mainly clear' },
  2:  { icon: '⛅',  desc: 'Partly cloudy' },
  3:  { icon: '☁️',  desc: 'Overcast' },
  45: { icon: '🌫️', desc: 'Foggy' },
  48: { icon: '🌫️', desc: 'Icy fog' },
  51: { icon: '🌦️', desc: 'Light drizzle' },
  61: { icon: '🌧️', desc: 'Slight rain' },
  63: { icon: '🌧️', desc: 'Moderate rain' },
  65: { icon: '🌧️', desc: 'Heavy rain' },
  80: { icon: '🌦️', desc: 'Rain showers' },
  95: { icon: '⛈️',  desc: 'Thunderstorm' },
};

const LAT  = -1.2921;
const LON  = 36.8219;
const CITY = 'Nairobi';

async function fetchWeather() {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true&hourly=relativehumidity_2m,windspeed_10m&timezone=auto`;
    const res  = await fetch(url);
    const data = await res.json();

    const { temperature, weathercode, windspeed } = data.current_weather;
    const info = WMO_CODES[weathercode] || { icon: '🌡️', desc: 'Unknown' };

    // Get current hour index to pull matching humidity value
    const now         = new Date();
    const currentHour = now.getHours();
    const humidity    = data.hourly.relativehumidity_2m[currentHour];

    document.getElementById('weather-icon').textContent = info.icon;
    document.getElementById('weather-city').textContent = CITY;
    document.getElementById('weather-temp').textContent = `${Math.round(temperature)}°C`;
    document.getElementById('weather-desc').textContent = info.desc;
    document.getElementById('weather-humidity').textContent = `💧 ${humidity}%`;
    document.getElementById('weather-wind').textContent = `💨 ${Math.round(windspeed)} km/h`;

  } catch (err) {
    document.getElementById('weather-desc').textContent = 'Could not load weather';
    console.error('Weather fetch failed:', err);
  }
}

fetchWeather();
setInterval(fetchWeather, 10 * 60 * 1000);
