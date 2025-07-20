# NOVACORE

> A Futuristic Command Interface built with React, TypeScript, Vite, D3, and Gemini AI

---

## Table of Contents
- [NOVACORE](#novacore)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Architecture](#architecture)
  - [Setup \& Installation](#setup--installation)
  - [Environment Variables](#environment-variables)
  - [Scripts](#scripts)
  - [Folder Structure](#folder-structure)
  - [Tech Stack](#tech-stack)
  - [License](#license)

---

## Overview

NOVACORE is a high-tech, cyberpunk-inspired command interface. It features:
- Real-time AI command responses via Gemini API
- Interactive globe visualization (D3 + TopoJSON)
- Futuristic HUD panels and SVG effects
- Modular React components and Tailwind CSS styling

---

## Features
- **AI Command Console:** Type commands and receive concise, in-character responses from NOVACORE (Gemini AI).
- **Globe Visualization:** Animated, interactive globe rendered with D3 and TopoJSON.
- **HUD Panels:** Custom panels for news, memory, daemons, and more.
- **SVG Effects:** Radar, waveform, and signal SVGs for a sci-fi look.
- **Typewriter Animation:** Realistic AI response typing effect.
- **Responsive Layout:** Optimized for desktop and large screens.

---

## Architecture
- **React + TypeScript:** Component-based UI, strict typing.
- **Vite:** Fast development/build tooling.
- **D3 & TopoJSON:** Globe and map rendering.
- **Gemini AI:** API integration for command responses.
- **Tailwind CSS:** Utility-first styling, custom neon/glow effects.

---

## Setup & Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/kika1s1/novacore.git
   cd novacore
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Configure environment variables:**
   - Copy `.env` and set your Gemini API key:
     ```env
     VITE_GEMINI_API_KEY=YOUR_API_KEY_HERE
     ```
4. **Start the development server:**
   ```sh
   npm run dev
   ```
5. **Build for production:**
   ```sh
   npm run build
   ```

---

## Environment Variables
- `VITE_GEMINI_API_KEY`: Your Gemini API key for AI command responses. Required.

---

## Scripts
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run lint` — Run ESLint
- `npm run preview` — Preview production build

---

## Folder Structure
```
NovaCore/
├── public/                # Static assets
├── src/
│   ├── components/        # UI components (Panel, Globe, Command, SVGs, etc.)
│   ├── services/          # API services (geminiService)
│   ├── App.tsx            # Main app layout
│   ├── main.tsx           # React entry point
│   ├── types.ts           # Shared TypeScript types
│   ├── index.css          # Global styles (Tailwind, custom)
│   └── vite-env.d.ts      # Vite type definitions
├── package.json           # Project metadata & scripts
├── vite.config.ts         # Vite configuration
├── tsconfig*.json         # TypeScript configs
├── .env                   # Environment variables
└── README.md              # Project documentation
```

---

## Tech Stack
- **React 19**
- **TypeScript 5**
- **Vite 7**
- **D3.js**
- **TopoJSON Client**
- **Gemini AI SDK**
- **Tailwind CSS**
- **ESLint**

---

## License

This project is licensed under the MIT License.
