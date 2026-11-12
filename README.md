# Suraksha Pass (demo prototype)

Front-end only simulation. There is NO real WhatsApp, UPI, insurer, doctor or database behind it.
All data lives in browser memory and disappears on refresh.

## Run locally
npm install && npm run dev

## Deploy to GitHub Pages
Push to `main`, then repo Settings > Pages > Source: **GitHub Actions**.

## Placeholders to replace before any real use
- `[Partner Insurer Name]` and `[+91-XXXXXXXXXX]` in src/App.js (consent notice)
- Legal entity name "Suraksha Tech Pvt. Ltd."

## Do not
- Put real worker data, Aadhaar numbers or API keys in this repo (GitHub Pages is public).
