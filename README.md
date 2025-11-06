# CardMatcha - Credit Card Comparison Platform

A modern full-stack web application for finding the right credit cards for you, built with Next.js 15 and Supabase.

## 🚀 Features

- **Credit Card Comparison**: Browse and compare different credit cards
- **Category-based Browsing**: Filter cards by categories (travel, cashback, rewards, etc.)
- **Issuer-based Browsing**: Browse cards by issuer (Chase, Amex, Capital One, etc.)
- **Interactive Chat Interface**: AI-powered chatbot for card recommendations (Coming Soon 👀)
- **Rankings**: View top-rated and popular credit cards
- **User Profiles**: Manage your cards and track rewards

## 🛠️ Tech Stack

### Frontend & Backend

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom matcha theme
- **UI Components**: shadcn/ui
- **Package Manager**: npm
- **Icons**: Lucide React
- **State Management**: React Hooks and Server Actions
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI Integration**: TBD
- **Payments**: TBD
- **Analytics**: Vercel Analytics and Speed Insights

## 📁 Project Structure

```
cardmatcha/
├── app/                      # Next.js app directory (App Router)
│   ├── api/                 # API routes
│   │   ├── cards/          # Card search endpoints
│   │   └── chat/           # Chat API endpoint
│   ├── auth/               # Authentication callbacks
│   ├── card/               # Individual credit card pages
│   │   └── [id]/
│   ├── cards/              # Credit cards listing page
│   ├── category/           # Category-based card pages
│   │   └── [slug]/
│   ├── chat/               # AI chat interface
│   ├── issuer/             # Issuer-based card pages
│   │   └── [slug]/
│   ├── login/              # Login/signup pages
│   ├── profile/            # User profile management
│   ├── rankings/           # Credit card rankings
│   ├── feedback/           # Feedback form
│   ├── submit-missing-card/ # Missing card submission
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout component
│   ├── loading.tsx         # Loading component
│   ├── error.tsx           # Error boundary
│   └── page.tsx            # Homepage
├── components/              # Reusable React components
│   ├── ui/                 # shadcn/ui component library
│   └── profile/            # Profile-specific components
├── lib/                    # Utility libraries and configurations
│   ├── actions/            # Server actions for data fetching
│   │   ├── card.actions.ts
│   │   ├── cards.actions.ts
│   │   ├── feedback.actions.ts
│   │   ├── missing-card.actions.ts
│   │   └── profile.actions.ts
│   └── utils.ts            # General utility functions
├── utils/                   # Utility functions
│   └── supabase/           # Supabase client utilities
│       ├── client.ts       # Browser client
│       ├── server.ts       # Server client
│       └── middleware.ts   # Middleware client
├── types/                   # TypeScript type definitions
│   └── index.d.ts          # Database schema types and interfaces
├── public/                  # Static assets and images
├── styles/                  # Additional styling files
├── middleware.ts            # Next.js middleware configuration
├── next.config.mjs          # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## Key Technologies

- **Frontend**: Next.js 15 with App Router, React 19
- **Styling**: Tailwind CSS with shadcn/ui components and custom matcha color theme
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (email/password and Google OAuth)
- **AI Integration**: Vercel AI SDK with OpenAI for chat functionality
- **Type Safety**: TypeScript with comprehensive type definitions
- **State Management**: React hooks and Next.js server actions
- **Image Optimization**: Next.js Image component with remote pattern support

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm (package manager)
- Supabase account (for database)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd cardmatcha
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create `.env.local` in the root directory:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   ```

   You can find your Supabase credentials in your Supabase project settings.

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues

## 🎨 UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) for consistent, accessible components. All components are located in `components/ui/`.

## 📝 Additional Notes

- The project uses Supabase Auth for authentication with email/password and Google OAuth support
- Middleware is configured to handle Supabase session management
- Image optimization is configured for various credit card issuer domains
- The app includes mobile detection and blocking (see `components/mobile-block.tsx`)
- Server actions are used for data fetching and mutations (located in `lib/actions/`)
