# Sizzer | Independent Music Agency

## Project Overview
A high-end landing page clone for Sizzer, an independent music agency. Features a 3D rotating artist carousel and cinematic scroll-sequence animations.

## Tech Stack
- **Build Tool**: Vite 5
- **Languages**: HTML5, CSS3, Vanilla JavaScript (ES Modules)
- **Package Manager**: npm
- **Fonts**: Google Fonts (Poppins)

## Project Structure
```
/
├── index.html       # Main entry point
├── main.js          # 3D carousel logic and scroll animations
├── style.css        # All styles including 3D transforms
├── vite.config.js   # Vite config (host: 0.0.0.0, port: 5000)
├── package.json     # npm config and scripts
└── images/          # Local image assets (card1.jpg, card2.jpg, card3.jpg)
```

## Development
- **Dev server**: `npm run dev` → runs on port 5000
- **Build**: `npm run build` → outputs to `dist/`
- **Preview**: `npm run preview`

## Key Features
- 3D rotating cylinder carousel of artist cards (generated dynamically in JS)
- Scroll-triggered cinematic text reveal with IntersectionObserver
- Dynamic blurred background on event card hover
- Responsive design with mobile hamburger menu

## Deployment
- Configured as a **static** site deployment
- Build command: `npm run build`
- Public directory: `dist`
