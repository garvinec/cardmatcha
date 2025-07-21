# API Integration Guide

This guide shows you how to call the backend API endpoints from your Next.js frontend.

## Setup

### 1. Environment Configuration

Create a `.env.local` file in your `client` directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### 2. Backend Server

Make sure your backend server is running:

```bash
cd server
npm run dev
```

The server will be available at `http://localhost:8080`.

## Available API Endpoints

Your backend provides these endpoints:

- `GET /api/cards` - Get all credit cards with pagination
- `GET /api/cards/:id` - Get a specific credit card
- `GET /api/cards/search?q=query` - Search credit cards
- `GET /api/cards/top` - Get top rated credit cards
- `GET /health` - Health check

## Usage Methods

### Method 1: Using Custom Hooks (Recommended)

The easiest way to use the API is with the custom React hooks:

```tsx
import {
  useCards,
  useCard,
  useSearchCards,
  useTopCards,
} from "@/hooks/use-api";

function MyComponent() {
  // Get paginated cards
  const {
    data: cardsData,
    loading: cardsLoading,
    error: cardsError,
  } = useCards(1, 10);

  // Get a specific card
  const { data: cardData, loading: cardLoading } = useCard("card-id-here");

  // Search cards
  const { data: searchData, loading: searchLoading } = useSearchCards("chase");

  // Get top cards
  const { data: topCardsData, loading: topCardsLoading } = useTopCards();

  if (cardsLoading) return <div>Loading...</div>;
  if (cardsError) return <div>Error: {cardsError}</div>;

  return (
    <div>
      {cardsData?.data.map((card) => (
        <div key={card.id}>{card.name}</div>
      ))}
    </div>
  );
}
```

### Method 2: Direct API Calls

For manual API calls (forms, buttons, etc.):

```tsx
import { cardApi } from "@/lib/api";

function MyComponent() {
  const handleSearch = async () => {
    try {
      const result = await cardApi.searchCards("travel");
      console.log(result.data);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const handleGetCard = async (id: string) => {
    try {
      const result = await cardApi.getCardById(id);
      console.log(result.data);
    } catch (error) {
      console.error("Failed to get card:", error);
    }
  };

  return <button onClick={handleSearch}>Search Cards</button>;
}
```

### Method 3: Using the Manual Hook

For more control over loading states:

```tsx
import { useApiCall } from "@/hooks/use-api";
import { cardApi } from "@/lib/api";

function MyComponent() {
  const { execute, loading, error } = useApiCall();

  const handleSubmit = async () => {
    const result = await execute(() => cardApi.searchCards("cashback"));
    if (result) {
      console.log("Search successful:", result);
    }
  };

  return (
    <div>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
```

## Data Types

The API returns typed data. Here are the main interfaces:

```typescript
interface CreditCard {
  id: string;
  name: string;
  issuer: string;
  annual_fee: number;
  apr_range: {
    min: number;
    max: number;
  };
  rewards_rate: number;
  rewards_type: string;
  signup_bonus?: {
    amount: number;
    requirement: string;
  };
  categories: string[];
  credit_score_required: string;
  foreign_transaction_fee: number;
  balance_transfer_fee: number;
  created_at: string;
  updated_at: string;
}

interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  error?: string;
}
```

## Query Parameters

### Pagination

```tsx
// Get first page with 10 items
const { data } = useCards(1, 10);

// Get second page with 20 items
const { data } = useCards(2, 20);
```

### Filtering

```tsx
// Filter by category
const { data } = useCards(1, 10, "Travel");

// Filter by issuer
const { data } = useCards(1, 10, undefined, "Chase");

// Filter by both
const { data } = useCards(1, 10, "Travel", "Chase");
```

## Error Handling

All hooks and API functions include error handling:

```tsx
const { data, loading, error, refetch } = useCards();

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;

// You can also retry failed requests
if (error) {
  return (
    <div>
      <p>Error: {error}</p>
      <button onClick={refetch}>Try Again</button>
    </div>
  );
}
```

## Example Component

See `components/api-example.tsx` for a complete example showing all the different ways to use the API.

## Troubleshooting

### CORS Issues

Make sure your backend CORS configuration includes your frontend URL:

```typescript
// In server/src/index.ts
const allowedOrigins = process.env["ALLOWED_ORIGINS"]?.split(",") || [
  "http://localhost:3000", // Your Next.js dev server
];
```

### Environment Variables

- Make sure `NEXT_PUBLIC_API_URL` is set correctly
- Restart your Next.js dev server after changing environment variables
- The variable must start with `NEXT_PUBLIC_` to be available in the browser

### Network Issues

- Ensure your backend server is running on the correct port
- Check that the API URL in your environment variables matches your backend
- Use browser dev tools to check for network errors

## Production Deployment

For production, update your environment variables:

```env
# Production
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

Make sure your backend is deployed and accessible at the specified URL.
