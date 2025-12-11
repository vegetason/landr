# Landr 🧠

An AI-powered job interview preparation platform designed to help candidates practice, learn, and excel in technical and behavioral interviews.

> **⚠️ Status: Early Development** - This project is currently in active development. Some premium features and payment functionality require additional service subscriptions that are not yet enabled.

## Features

### 🎤 AI Mock Interviews
- Real-time voice-based interviews powered by Hume AI
- Realistic conversation flow with adaptive interviewer responses
- Performance feedback based on communication clarity, confidence, and technical knowledge
- Interview history and analytics

### 📝 Resume Analysis
- AI-powered resume review tailored to job descriptions
- ATS (Applicant Tracking System) compatibility scoring
- Keyword coverage analysis
- Specific, actionable improvement suggestions
- Job match analysis

### 💡 Technical Question Practice
- AI-generated coding and technical questions matched to job requirements
- Difficulty levels: Easy, Medium, Hard
- Real-time feedback on answers
- Complete solution references
- Question bank organized by difficulty and topic

### 📋 Job Description Management
- Store and manage job descriptions you're targeting
- AI uses job context to personalize all preparation materials
- Support for multiple job targets

## Tech Stack

### Frontend
- **Framework**: Next.js (App Router, TypeScript)
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui with Radix UI primitives
- **State Management**: React Hooks
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js with Next.js API Routes
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Clerk
- **AI Services**:
  - **Voice Interviews**: Hume AI Empathetic Voice
  - **Content Generation**: Google Gemini 2.5 Flash
- **Security**: Arcjet (rate limiting, bot detection, DDoS protection)
- **Real-time Voice**: @humeai/voice-react

### DevOps & Tools
- **ORM**: Drizzle Kit (migrations, introspection)
- **Code Quality**: ESLint, Prettier
- **Type Safety**: TypeScript, Zod
- **Caching**: Next.js Data Cache with cache tags

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Accounts and API keys for:
  - Clerk (authentication)
  - Hume AI (voice interviews)
  - Google Generative AI (content generation)
  - Arcjet (security)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd landr
npm install
```

2. **Set up environment variables**

Create a `.env.local` file with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/app
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/app

# Hume AI
NEXT_PUBLIC_HUME_CONFIG_ID=your_hume_config_id
HUME_API_KEY=your_hume_api_key
HUME_SECRET_KEY=your_hume_secret_key

# Google Generative AI
GEMNI_API_KEY=your_google_gemini_api_key

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_db_password
DB_NAME=landr

# Security
ARCJET_KEY=your_arcjet_key
```

3. **Start PostgreSQL**
```bash
docker-compose up -d
```

4. **Set up database**
```bash
npm run db:migrate
```

5. **Run development server**
```bash
npm run dev
```

6. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

```bash
# Development
npm run dev              # Start development server with Turbopack

# Building
npm run build            # Build for production
npm start                # Start production server

# Database
npm run db:push          # Push schema to database
npm run db:generate      # Generate migrations
npm run db:migrate       # Run migrations
npm run db:studio        # Open Drizzle Studio

# Code Quality
npm run lint             # Run ESLint
```

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── app/                      # Authenticated app pages
│   │   ├── job-infos/           # Job description management
│   │   │   └── [jobInfoId]/
│   │   │       ├── interviews/  # Mock interview feature
│   │   │       ├── questions/   # Technical questions
│   │   │       ├── resume/      # Resume analysis
│   │   │       └── edit/        # Job info editing
│   │   ├── layout.tsx           # App layout with navigation
│   │   └── page.tsx             # Dashboard
│   ├── api/                      # API routes
│   │   ├── ai/                  # AI generation endpoints
│   │   └── webhooks/            # Webhook handlers
│   ├── sign-in/                 # Clerk sign-in page
│   ├── onboarding/              # User onboarding
│   ├── globals.css              # Global styles
│   └── layout.tsx               # Root layout
├── components/                   # Reusable UI components
│   └── ui/                      # shadcn/ui components
├── features/                     # Feature modules
│   ├── interviews/              # Interview logic
│   ├── questions/               # Question generation
│   ├── jobInfos/                # Job management
│   ├── resumeAnalysis/          # Resume analysis
│   └── users/                   # User management
├── services/                     # External service integrations
│   ├── ai/                      # AI service (Gemini, Hume)
│   ├── clerk/                   # Clerk integration
│   └── hume/                    # Hume Voice integration
├── drizzle/                      # Database schema and migrations
│   └── schemas/                 # Table definitions
├── data/                         # Environment and config
│   └── env/                     # Environment variable schemas
└── lib/                          # Utility functions
```

## Key Features in Development

### Currently Limited (Requires Premium Subscriptions)
- **Clerk Premium**: Payment processing and subscription management
  - Currently: Free tier limits apply
  - Needed for: Pricing tiers, billing, subscription features
  
- **Hume Premium**: Advanced voice AI features
  - Currently: Limited API access
  - Needed for: Unlimited interview sessions, advanced emotion analysis
  
- **Arcjet Premium**: Advanced security features
  - Currently: Basic rate limiting and bot detection
  - Needed for: Advanced DDoS protection, priority support

### Fully Functional Features
✅ Job description management  
✅ AI interview practice with voice  
✅ Resume analysis and feedback  
✅ Technical question generation  
✅ User authentication and profiles  
✅ Interview history and tracking  
✅ Basic rate limiting and security  

## Development Roadmap

- [ ] Enable Clerk premium for subscription management
- [ ] Implement tiered pricing plans (Free, Pro, Premium)
- [ ] Full Hume AI integration for advanced voice features
- [ ] Arcjet premium security features
- [ ] Mobile app (React Native)
- [ ] Interview analytics dashboard
- [ ] Peer comparison and leaderboards
- [ ] Custom question creation
- [ ] Export interview transcripts and feedback
- [ ] Integration with job listing APIs

## Contributing

This project is in early development. Contributions are welcome! Please feel free to:
1. Report bugs
2. Suggest features
3. Submit pull requests

## License

MIT License - feel free to use this project for learning and development.

## Support

For issues, questions, or suggestions, please open an issue in the repository.

## Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Clerk](https://clerk.com/) - Authentication
- [Hume AI](https://www.humanlevel.ai/) - Voice AI
- [Google Generative AI](https://ai.google.dev/) - Content generation
- [Arcjet](https://arcjet.com/) - Security
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Drizzle ORM](https://orm.drizzle.team/) - Database ORM

---

**Built with ❤️ to help people ace their job interviews**