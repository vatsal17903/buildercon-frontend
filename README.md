# Coca Pearl Estate UI

A modern real estate management application built with React, Vite, and TypeScript.

## Features

- Building management
- Floor planning
- Plot tracking
- Unit management
- Seller information
- Responsive design
- Dark mode support

## Deployment to GitHub Pages

This project is configured for deployment to GitHub Pages. Follow these steps:

1. Ensure you have the `gh-pages` package installed:
   ```bash
   npm install gh-pages --save-dev
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

The site will be available at: `https://[your-username].github.io/coca-pearl-estate-ui/`

## Development

To run the project locally:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
├── App.tsx         # Main application component
└── main.tsx        # Entry point
```

## Technologies Used

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Shadcn UI components