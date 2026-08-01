# VerseCV 🌌

**Your career across alternate realities.**

VerseCV is an AI-powered resume generator that takes your professional experience and reimagines it in entirely different universes. Whether you want to see your career as a Cyberpunk netrunner, a 19th-century pirate, or a Starfleet engineer, VerseCV weaves your legend across the multiverse.

## Features ✨

- **Cinematic UI:** A stunning, animated, responsive interface built with Framer Motion, Tailwind CSS, and Next.js.
- **Universal Origin Upload:** Upload your standard PDF resume. The system automatically parses your core identity and extracts your structured history.
- **Infinite Realities:** Type in any universe (e.g., "Star Wars", "Cyberpunk 2077", "Victorian London") and watch as your skills and experiences are completely transformed to fit the lore, while preserving the core meaning of your achievements.
- **AI-Powered Engine:** Utilizes OpenRouter (and models like Gemini/GPT) to perform complex structured data extraction and creative transformation.

## Tech Stack 🛠️

VerseCV is built as a modern full-stack web application using a monorepo architecture.

- **Framework:** Next.js 16 (App Router) with Turbopack
- **Styling:** Tailwind CSS (v4) & Framer Motion
- **AI Processing:** OpenRouter API (`@ai-sdk/openai`, `pdf-parse`)
- **Authentication:** Better Auth (with Passkey support)
- **Database:** Neon Database / PostgreSQL (via packages/database)
- **Package Manager:** pnpm workspaces / Turborepo

## Getting Started 🚀

### Prerequisites

- Node.js (v20+)
- pnpm
- OpenRouter API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Adi3595/VerseCV.git
   cd VerseCV
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` or `.env.local` file in the root directory. You will need at least:
   ```env
   OPENROUTER_API_KEY=your_api_key_here
   OPENROUTER_TEXT_MODEL=google/gemini-2.5-flash-api
   ```

4. **Run the Development Server:**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture

This project is a Turborepo monorepo containing:
- `apps/web`: The main Next.js frontend application and API routes.
- `apps/api`: A Python FastAPI backend (optional, for advanced background processing/celery tasks).
- `packages/*`: Shared internal packages for database, UI components, AI providers, and configurations.

---
*Developed by Adi3595.*
