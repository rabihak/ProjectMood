# Project Mood 🧠✨

Project Mood is an intelligent journaling companion designed to help you understand your emotional well-being. By leveraging the power of AI, it analyzes your journal entries to provide deep insights into your moods, sentiments, and recurring themes over time.

## 🚀 Key Features

- **AI-Powered Analysis**: Every journal entry is automatically analyzed using advanced LLMs (via LangChain and Gemini) to extract:
  - **Mood & Sentiment**: Understand the emotional tone of your writing on a scale from -10 to 10.
  - **Auto-Summarization**: Get a concise summary of your thoughts.
  - **Subject Tracking**: Identify the main topics you're writing about.
  - **Color Coding**: Visual representation of your mood for each entry.
- **Interactive History**: Visualize your emotional journey with dynamic charts that track your sentiment scores over time.
- **AI Journal Assistant (Q&A)**: Ask questions about your past entries (e.g., "What was my mood like last week?") and receive empathetic, context-aware answers based on your own writing.
- **Wellness Reports**: Generate comprehensive reports that summarize your emotional state, highlight recurring themes, and provide personalized advice.
- **Secure & Private**: Your personal thoughts are protected with secure authentication powered by Clerk.
- **Modern UI**: A clean, responsive interface built with Next.js and Material UI (Joy UI), featuring both light and dark modes.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Authentication**: [Clerk](https://clerk.com/)
- **Database & ORM**: [PostgreSQL](https://www.postgresql.org/) with [Prisma](https://www.prisma.io/)
- **AI Engine**: [LangChain](https://js.langchain.com/) with [Google Gemini](https://deepmind.google/technologies/gemini/) (via [OpenRouter](https://openrouter.ai/))
- **UI Components**: [MUI Joy UI](https://mui.com/joy-ui/getting-started/) & [Tailwind CSS](https://tailwindcss.com/)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Form Handling & Validation**: [Zod](https://zod.dev/)

## 🏁 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- A PostgreSQL database (e.g., Supabase, Railway, or local)
- API Keys for:
  - Clerk (Authentication)
  - OpenRouter/OpenAI (AI Analysis)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/mood.git
   cd mood
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL="your-postgresql-url"
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-pub-key"
   CLERK_SECRET_KEY="your-clerk-secret-key"
   OPENAI_API_KEY="your-openrouter-or-openai-key"
   ```

4. **Initialize the database:**
   ```bash
   npx prisma db push
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see your application in action.

## 🧪 Testing

The project uses [Vitest](https://vitest.dev/) for unit and integration testing.

```bash
npm run test
```

## 📜 License

This project is licensed under the MIT License.
