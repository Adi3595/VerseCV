<p align="center">
  <img src="./apps/web/public/banner.svg" alt="VerseCV Banner" />
</p>

> **Transform your standard PDF resume into legendary lore.** Whether you want to see your career as a Cyberpunk netrunner, a 19th-century pirate, or a Starfleet engineer, VerseCV weaves your skills across the multiverse.

<br/>

## 🌌 The VerseCV Experience

VerseCV is not just a resume parser—it's an **AI-powered cinematic engine**. We take your mundane professional history and project it into infinite alternate realities using OpenRouter AI.

<details>
  <summary><strong>✨ Click to see the Features!</strong></summary>
  <br/>
  
  - 🎥 **Cinematic UI:** A stunning, animated, responsive interface built with Framer Motion and Tailwind CSS.
  - 🧬 **Universal Origin Upload:** Upload your standard PDF resume. The system automatically parses your core identity and extracts your structured history.
  - 🌀 **Infinite Realities:** Type in any universe (e.g., "Star Wars", "Cyberpunk 2077", "Victorian London") and watch as your skills are completely transformed to fit the lore!
  - 🤖 **AI-Powered Engine:** Utilizes OpenRouter to perform complex structured data extraction and creative transformation.
</details>

<details>
  <summary><strong>🛠️ Click to reveal the Tech Stack</strong></summary>
  <br/>

  VerseCV is built as a modern full-stack web application using a Turborepo architecture.
  - **Framework:** Next.js 16 (App Router) + Turbopack
  - **Styling:** Tailwind CSS (v4) & Framer Motion
  - **AI Processing:** OpenRouter API (`pdf-parse`)
  - **Auth:** Better Auth (with Passkeys)
  - **Monorepo:** pnpm workspaces
</details>

<br/>

## 🚀 Initialize Your Reality (Getting Started)

Ready to boot up the engine? Follow these steps to spin up the local development environment.

### 1️⃣ Clone the Matrix
```bash
git clone https://github.com/Adi3595/VerseCV.git
cd VerseCV
```

### 2️⃣ Install Dependencies
```bash
pnpm install
```

### 3️⃣ Configure the Dimensions (Environment)
Create a `.env` file in the root directory. You will need your OpenRouter API keys to power the reality generator:
```env
OPENROUTER_API_KEY=your_api_key_here
OPENROUTER_TEXT_MODEL=google/gemini-2.5-flash-api
```

### 4️⃣ Ignite the Engine
```bash
pnpm dev
```
Navigate to [http://localhost:3000](http://localhost:3000) and step into the multiverse.

---
<p align="center">
  <em>Built across space and time by Adi3595.</em>
</p>
