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

- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Zod schema validation

## 📁 Project Structure

```
credexa/
├── client/                    # Next.js frontend
│   ├── app/                  # Next.js app directory
│   │   ├── api/             # API routes (chat)
│   │   ├── card/            # Credit card pages
│   │   ├── category/        # Category pages
│   │   ├── chat/            # Chat interface
│   │   ├── profile/         # User profile
│   │   └── rankings/        # Card rankings
│   ├── components/          # Reusable components
│   │   ├── ui/             # shadcn/ui components
│   │   └── ...             # Custom components
│   ├── hooks/              # Custom React hooks
│   │   └── use-api.ts      # API integration hooks
│   ├── lib/                # Utility functions
│   │   ├── api.ts          # API client and types
│   │   └── utils.ts        # General utilities
│   └── public/             # Static assets
├── server/                  # Express.js backend
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # Data models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Utility functions
│   ├── tests/              # Test files
│   └── docs/               # Documentation
└── README.md               # This file
```

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
