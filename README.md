# WPS Office Clone - React TypeScript App

This is a modern React application built with Vite and TypeScript, converted from a static HTML website that was mirrored using HTTrack.

## Features

- **Modern React Architecture**: Built with React 18, TypeScript, and Vite
- **Responsive Design**: Mobile-first approach with responsive layouts
- **React Router**: Client-side routing for seamless navigation
- **Component-Based**: Modular components for maintainability
- **TypeScript**: Full type safety throughout the application

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   └── Layout.tsx      # Main layout wrapper
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── About.tsx       # About page
│   ├── Download.tsx    # Download page
│   └── Support.tsx     # Support page
├── assets/             # Static assets
├── App.tsx             # Main app component
├── App.css             # Global styles
└── main.tsx            # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint

## Pages

- **Home** (`/`) - Main landing page with WPS Office branding
- **About** (`/about`) - Information about WPS Office
- **Download** (`/download`) - Download options for different platforms
- **Support** (`/support`) - FAQ and contact information

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **CSS3** - Styling with modern features

## Conversion Notes

This application was converted from a static HTML website that was mirrored using HTTrack. The conversion process included:

1. **Project Setup**: Created new Vite + React + TypeScript project
2. **Asset Migration**: Copied static assets to the public folder
3. **Component Creation**: Converted HTML pages to React components
4. **Routing Setup**: Implemented React Router for navigation
5. **Layout Extraction**: Created reusable Header and Footer components
6. **Styling**: Converted CSS to modern, responsive styles
7. **TypeScript Integration**: Added proper type definitions

## Development Guidelines

- Follow the existing component structure
- Use TypeScript for all new code
- Maintain responsive design principles
- Keep components under 900-1000 lines (as per project rules)
- Use functional components with hooks
- Follow React best practices

## Future Enhancements

- Add more pages from the original site
- Implement dynamic content loading
- Add animations and transitions
- Integrate with backend APIs
- Add internationalization support
- Implement user authentication