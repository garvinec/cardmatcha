# Credexa - Credit Card Comparison Platform

A modern web application for comparing credit cards, built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Credit Card Comparison**: Browse and compare different credit cards
- **Category-based Browsing**: Filter cards by categories (travel, cashback, rewards, etc.)
- **Interactive Chat Interface**: AI-powered chatbot for card recommendations
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Beautiful, intuitive interface built with shadcn/ui components
- **Real-time Search**: Fast and responsive search functionality
- **User Profiles**: Personalized experience with user accounts
- **Rankings**: View top-rated and popular credit cards

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Package Manager**: pnpm
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Chat Interface**: Custom modern chat UI

## 📁 Project Structure

```
credexa/
├── frontend/
│   ├── app/                    # Next.js app directory
│   │   ├── api/               # API routes
│   │   ├── card/              # Credit card pages
│   │   ├── category/          # Category pages
│   │   ├── chat/              # Chat interface
│   │   ├── profile/           # User profile
│   │   └── rankings/          # Card rankings
│   ├── components/            # Reusable components
│   │   ├── ui/               # shadcn/ui components
│   │   └── ...               # Custom components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions
│   └── public/               # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd credexa
   ```

2. **Install dependencies**

   ```bash
   cd frontend
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration.

4. **Run the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking

## 🎨 UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) for consistent, accessible components. All components are located in `frontend/components/ui/`.
