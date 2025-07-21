import { Router } from "express";
import { CardController } from "@/controllers/cardController";

const router = Router();

// GET /api/cards - Get all credit cards with pagination and filtering
router.get("/", CardController.getCards);

// GET /api/cards/search - Search credit cards
router.get("/search", CardController.searchCards);

// GET /api/cards/top - Get top rated credit cards
router.get("/top", CardController.getTopCards);

// GET /api/cards/:id - Get a single credit card by ID
router.get("/:id", CardController.getCardById);

export default router;
