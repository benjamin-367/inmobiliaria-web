# ParaguayWebsite Landing Page

A modern, minimalist landing page for ParaguayWebsite - a service offering affordable websites for small businesses.

## Features

- 🎨 Clean, modern design inspired by Stripe, Apple, and Webflow
- 🟢 Light theme with green accents
- 📱 Fully responsive design
- ✨ Smooth animations and hover effects
- 🚀 Built with React and Tailwind CSS
- ⚡ Optimized for lead generation

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── Hero.jsx          # Hero section with main CTA
│   ├── HowItWorks.jsx    # 3-step process explanation
│   ├── Features.jsx      # Feature cards
│   ├── FAQ.jsx           # Frequently asked questions
│   └── FinalCTA.jsx      # Final call-to-action section
├── App.jsx               # Main app component
├── main.jsx              # React entry point
└── index.css             # Global styles with Tailwind
```

## Customization

- Colors: Edit `tailwind.config.js` to change the green accent colors
- Content: Update text in individual component files
- Styling: Modify Tailwind classes in components or extend the theme

## License

MIT
