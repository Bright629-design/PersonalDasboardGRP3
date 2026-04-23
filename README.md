# Personal Dashboard

A dark-themed personal dashboard built with pure HTML, CSS, and JavaScript — no frameworks, no build tools, just one file.

## Features

- **Live Clock** — Real-time clock with date and greeting
- **Weather** — Auto-detects location, powered by Open-Meteo (no API key needed)
- **Quotes** — Cycling motivational quotes with fade animation
- **To-Do List** — Add, check, and delete tasks
- **Persistent** — Everything saves across refreshes via `localStorage`

## Usage

Just open `dashboard.html` in any browser. No install, no server.

```bash
git clone https://github.com/your-username/personal-dashboard.git
cd personal-dashboard
open dashboard.html
```

## Customization
- **Quotes** — Edit the `QUOTES` array in the script
- **Fallback city** — Change the coordinates in `fetchWeather(-1.2864, 36.8172, 'Nairobi, KE')`
- **Colors** — Edit the CSS variables in `:root`

## Tech
HTML · CSS · Vanilla JS · [Open-Meteo API](https://open-meteo.com/) · [Nominatim](https://nominatim.org/)

## License
MIT
