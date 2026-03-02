# Happy Birthday Suhani - 23rd Birthday Website

A fun, Gen-Z birthday website with brown/gold aesthetic, interactive features, and inside jokes.

## Features
- Birthday confetti animation
- Photo gallery with lightbox
- Flip cards with fun facts
- Among Us emergency meeting section
- Plain Jane by A$AP Ferg music player
- Mobile responsive

## Deploy to GitHub Pages

### Option 1: Quick Setup

1. Create a new GitHub repository (e.g., `suhani-birthday`)

2. Download the code from Emergent (click "Download Code" button)

3. Extract the files and copy everything from the `frontend` folder

4. Initialize git and push:
```bash
cd frontend
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/suhani-birthday.git
git push -u origin main
```

5. Go to your repo → Settings → Pages
   - Source: GitHub Actions
   - The workflow will automatically build and deploy

6. Your site will be live at: `https://YOUR_USERNAME.github.io/suhani-birthday/`

### Option 2: Manual Build

1. Install dependencies:
```bash
yarn install
```

2. Build the project:
```bash
yarn build
```

3. The `build` folder contains the static files - upload these to any static hosting (Netlify, Vercel, etc.)

## Local Development

```bash
yarn install
yarn start
```

## Tech Stack
- React 19
- Tailwind CSS
- Framer Motion
- Canvas Confetti
- Shadcn/UI Components

## Customization

- Photos: Edit the `ALL_PHOTOS` array in `src/App.js`
- Colors: Edit CSS variables in `src/index.css`
- Content: Modify text directly in `src/App.js`
