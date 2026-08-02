<p align="center">
  <img src="./apps/web/public/banner.svg" alt="VerseCV Banner" />
</p>

> **Transform your standard PDF resume into legendary lore.** Whether you want to see your career as a Cyberpunk netrunner, a 19th-century pirate, or a Starfleet engineer, VerseCV weaves your skills across the multiverse.

<br/>

<img src="./apps/web/public/heading-experience.svg" alt="The VerseCV Experience" />

VerseCV is not just a resume parser—it's an **AI-powered cinematic engine**. We take your mundane professional history and project it into infinite alternate realities using state-of-the-art Large Language Models. 

The application is built for maximum visual impact, utilizing a custom dark-mode glassmorphism aesthetic, advanced Framer Motion animations, and custom typography to make the experience feel truly otherworldly.

<details>
  <summary><strong>✨ Click to see the Features in detail!</strong></summary>
  <br/>
  
  - 🎥 **Cinematic UI:** A stunning, animated, responsive interface built with Next.js 16, Framer Motion, and Tailwind CSS v4.
  - 🧬 **Universal Origin Upload:** Upload your standard PDF resume. The Python FastAPI engine automatically parses your core identity and extracts your structured history without any manual data entry.
  - 🌀 **Infinite Realities:** Type in any universe (e.g., "Star Wars", "Cyberpunk 2077", "Victorian London") and watch as your skills are completely transformed to fit the lore, while keeping the core meaning of your achievements intact!
  - 💾 **Timeline History:** Every generated reality is securely saved to your personal Dashboard via a robust Neon PostgreSQL database, allowing you to revisit and favorite past generations.
  - 🔗 **Public Share Links:** Instantly generate a public, distraction-free gallery link to share your cinematic resume with recruiters, friends, or the internet.
  - 🖨️ **High-Res PDF Export:** Export your generated reality as a pixel-perfect, beautifully themed PDF document.
  - 🔒 **Secure Auth:** Frictionless login using Better Auth via Neon.
</details>

<details>
  <summary><strong>🛠️ Click to reveal the Tech Stack</strong></summary>
  <br/>

  VerseCV is built as a highly modular modern full-stack web application.

  **Frontend (Next.js 16):**
  - Next.js (App Router) + Turbopack
  - React 19
  - Tailwind CSS (v4)
  - Framer Motion (Cinematic Animations)
  - HTML2Canvas-Pro & jsPDF (Client-side Export)

  **Backend (FastAPI & Next.js APIs):**
  - Python FastAPI (Advanced ML/AI heavy lifting)
  - OpenRouter API (Gemini / Claude / GPT)
  - Prisma ORM
  - Neon Serverless PostgreSQL

  **Tooling & Architecture:**
  - pnpm workspaces & Turborepo
  - TypeScript & Python
  - Dockerized Backend Deployment
</details>

<br/>

## 🏗️ Architecture & Project Structure

This project uses a highly modular **Turborepo** setup, separating the frontend from the core utility libraries and Python AI backend.

```text
MultiVerse-Resume/
├── apps/
│   ├── web/               # The main Next.js 16 Frontend, Auth, and APIs
│   │   ├── src/app/       # App Router (Pages, Layouts, Prisma APIs)
│   │   ├── src/components/# Reusable UI (Cinematic, Dashboard, Upload)
│   │   └── prisma/        # Database Schema & Migrations
│   └── api/               # The Python FastAPI backend (AI pipeline, PDF Extraction)
├── packages/
│   ├── ai/                # Shared AI wrapper interfaces
│   ├── database/          # Shared database schemas and ORMs
│   ├── types/             # Shared TypeScript interfaces
│   └── ui/                # Shared UI component library
└── turbo.json             # Monorepo build pipeline configuration
```

<br/>

## 🧠 How the AI Pipeline Works

1. **Extraction**: When you upload a resume on the Dashboard, the Python backend (`apps/api`) extracts raw text from the PDF robustly.
2. **Contextualization**: The raw text is wrapped in a heavily engineered system prompt instructing the AI to identify core skills, work history, and achievements using OpenRouter models.
3. **Reality Distortion**: The user inputs a target "Universe" (e.g. *The Matrix*). The AI translates the extracted data into the specific lore of that universe, generating structured JSON.
4. **Cinematic Render & Save**: The frontend receives the JSON, seamlessly saves it to the Neon Postgres database (`ResumeHistory` table) via Prisma, and dynamically animates the new resume into view using Framer Motion.

<br/>

<img src="./apps/web/public/heading-init.svg" alt="Initialize Your Reality" />

Ready to boot up the engine? Follow these steps to spin up the local development environment.

### 1️⃣ Clone the Matrix
```bash
git clone https://github.com/Adi3595/VerseCV.git
cd VerseCV
```

### 2️⃣ Install Dependencies
*We strictly use `pnpm` for managing the monorepo.*
```bash
pnpm install
```

### 3️⃣ Configure the Dimensions (Environment)
Create a `.env` file in the root directory and in `apps/web/`. You will need your API keys to power the engine:

```env
# AI Provider (Backend)
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_TEXT_MODEL=google/gemini-2.5-flash

# Database (Prisma / Neon)
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require

# Authentication (Better Auth via Neon)
NEON_AUTH_BASE_URL=your_neon_auth_url
NEON_AUTH_COOKIE_SECRET=your_random_secret
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_NEON_AUTH_URL=your_neon_auth_url
NEXT_PUBLIC_API_URL=http://localhost:8000 # Local Python API URL
```

### 4️⃣ Generate the Database Client
```bash
pnpm run postinstall
```

### 5️⃣ Ignite the Engines
Start the entire monorepo (both Next.js and FastAPI) using Turbo:
```bash
pnpm dev
```
Navigate to [http://localhost:3000](http://localhost:3000) and step into the multiverse.

<br/>

## 🤝 Contributing
Want to add a new universe theme template? Optimize the AI prompt? Contributions are welcome! Please open an issue or submit a Pull Request.

---
<p align="center">
  <em>Built across space and time by Adi3595.</em>
</p>
