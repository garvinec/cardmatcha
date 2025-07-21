# Credexa Backend API

A TypeScript backend API for the Credexa credit card comparison platform, built with Express.js and Supabase.

## 🚀 Features

- **RESTful API**: Clean, RESTful endpoints for credit card data
- **TypeScript**: Full TypeScript support with strict type checking
- **Supabase Integration**: Database operations using Supabase
- **Security**: Helmet, CORS, and rate limiting
- **Validation**: Request validation with Zod
- **Error Handling**: Comprehensive error handling and logging

## 🛠️ Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Validation**: Zod
- **Security**: Helmet, CORS, Rate Limiting
- **Development**: tsx for hot reloading

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files (Supabase, etc.)
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Data models and schemas
│   ├── routes/          # API route definitions
│   ├── services/        # Business logic layer
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   └── index.ts         # Main application entry point
├── tests/               # Test files
├── docs/                # Documentation
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── env.example          # Environment variables template
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Supabase account and project

### Installation

1. **Install dependencies**

   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables**

   ```bash
   cp env.example .env
   ```

   Edit `.env` with your Supabase credentials:

   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Access the API**
   - Health check: `http://localhost:8080/health`
   - API base: `http://localhost:8080/api`

## 📝 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🔌 API Endpoints

### Credit Cards

- `GET /api/cards` - Get all credit cards with pagination
- `GET /api/cards/:id` - Get a specific credit card
- `GET /api/cards/search?q=query` - Search credit cards
- `GET /api/cards/top` - Get top rated credit cards

### Query Parameters

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `category` - Filter by category
- `issuer` - Filter by issuer

## 🗄️ Database Schema

The backend expects the following Supabase tables:

### credit_cards

- `id` (uuid, primary key)
- `name` (text)
- `issuer` (text)
- `annual_fee` (numeric)
- `apr_range` (jsonb)
- `rewards_rate` (numeric)
- `rewards_type` (text)
- `signup_bonus` (jsonb, nullable)
- `categories` (text[])
- `credit_score_required` (text)
- `foreign_transaction_fee` (numeric)
- `balance_transfer_fee` (numeric)
- `created_at` (timestamp)
- `updated_at` (timestamp)

## 🔒 Security

- **CORS**: Configured for frontend origins
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Helmet**: Security headers
- **Input Validation**: Request validation with Zod
- **Error Handling**: No sensitive information in error responses

## 🧪 Testing

```bash
npm run test
```

## 📚 Documentation

API documentation and examples can be found in the `docs/` directory.
