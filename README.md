# Computershare Employee Portal Clone

A React-based employee portal interface built with Vite, TypeScript, and Tailwind CSS.

## Features

- Employee login system with security questions
- Admin dashboard with login tracking
- Responsive design
- Security question verification
- Login attempt monitoring
- CSV export functionality

## Prerequisites

- Node.js 16+ 
- npm 7+

## Installation

1. Clone or download this repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. For production build:
```bash
npm run build
```

## Project Structure

```
src/
├── components/      # Reusable UI components
├── pages/          # Page components
├── services/       # Business logic and data handling
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## Admin Access

Default admin credentials:
- PIN: 199594

## Security Note

This is a demonstration project. In a production environment, implement proper security measures:
- Secure password hashing
- Rate limiting
- HTTPS
- Session management
- Input validation