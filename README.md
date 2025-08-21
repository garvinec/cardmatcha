# Credexa - Credit Card Comparison Platform

A modern full-stack web application for finding the right credit cards for you, built with Next.js frontend and Express.js backend.

## 🚀 Features

- **Credit Card Comparison**: Browse and compare different credit cards
- **Category-based Browsing**: Filter cards by categories (travel, cashback, rewards, etc.)
- **Interactive Chat Interface**: AI-powered chatbot for card recommendations
- **Rankings**: View top-rated and popular credit cards

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Package Manager**: npm
- **Icons**: Lucide React
- **State Management**: React Hooks
- **API Integration**: Custom hooks and typed API client

### Backend

- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Clerk

## 📁 Project Structure

```
credexa/
├── app/                      # Next.js app directory (App Router)
│   ├── api/                 # API routes (chat functionality)
│   ├── card/                # Individual credit card pages
│   ├── cards/               # Credit cards listing page
│   ├── category/            # Category-based card pages
│   ├── chat/                # AI chat interface
│   ├── issuer/              # Issuer-based card pages
│   ├── profile/             # User profile management
│   ├── rankings/            # Credit card rankings
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout component
│   ├── loading.tsx          # Loading component
│   └── page.tsx             # Homepage
├── components/               # Reusable React components
│   └── ui/                  # shadcn/ui component library
├── lib/                     # Utility libraries and configurations
│   ├── actions/             # Server actions for data fetching
│   ├── supabase.ts          # Supabase client configuration
│   └── utils.ts             # General utility functions
├── types/                    # TypeScript type definitions
│   └── index.d.ts           # Database schema types and interfaces
├── public/                   # Static assets and images
├── styles/                   # Additional styling files
├── middleware.ts             # Next.js middleware configuration
├── next.config.mjs          # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## Key Technologies

- **Frontend**: Next.js 15 with App Router, React 19
- **Styling**: Tailwind CSS with shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Clerk
- **AI Integration**: Vercel AI SDK for chat functionality
- **Type Safety**: TypeScript with comprehensive type definitions
- **State Management**: React hooks and server actions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Supabase account (for database)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd credexa
   ```

2. **Set up the backend**

   ```bash
   cd server
   npm install
   cp .env.example .env
   ```

   Edit `.env` with your Supabase credentials:

   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Set up the frontend**

   ```bash
   cd ../client
   pnpm install
   ```

   Create `.env.local` for API configuration:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```

4. **Start the development servers**

   **Backend (Terminal 1):**

   ```bash
   cd server
   npm run dev
   ```

   **Frontend (Terminal 2):**

   ```bash
   cd client
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) for consistent, accessible components. All components are located in `client/components/ui/`.

## 🔒 Security

- **CORS**: Configured for frontend origins
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Helmet**: Security headers
- **Input Validation**: Request validation with Zod
- **Error Handling**: No sensitive information in error responses

## 🧪 Testing

```bash
cd server
npm run test
```

## 📚 Documentation

- [API Usage Guide](client/API_USAGE.md) - Complete frontend API integration guide
- [Backend API Documentation](server/README.md) - Backend setup and API details
