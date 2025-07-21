import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env["PORT"] || 8080;

// Security middleware
app.use(helmet());

// CORS configuration
const allowedOrigins = process.env["ALLOWED_ORIGINS"]?.split(",") || [
  "http://localhost:3000",
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env["RATE_LIMIT_WINDOW_MS"] || "900000"), // 15 minutes
  max: parseInt(process.env["RATE_LIMIT_MAX_REQUESTS"] || "100"), // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Import routes
import cardRoutes from "@/routes/cardRoutes";

// API routes
app.use("/api/cards", cardRoutes);
// app.use('/api/categories', categoryRoutes);
// app.use('/api/chat', chatRoutes);

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  }
);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
