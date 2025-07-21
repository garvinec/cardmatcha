import { Request, Response } from "express";
import { CardService } from "@/services/cardService";

export class CardController {
  /**
   * Get all credit cards with pagination and filtering
   */
  static async getCards(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query["page"] as string) || 1;
      const limit = parseInt(req.query["limit"] as string) || 10;
      const category = req.query["category"] as string;
      const issuer = req.query["issuer"] as string;

      const result = await CardService.getCards(page, limit, category, issuer);

      if (!result.success) {
        res.status(400).json(result);
        return;
      }

      res.json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  }

  /**
   * Get a single credit card by ID
   */
  static async getCardById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          error: "Card ID is required",
        });
        return;
      }

      const result = await CardService.getCardById(id);

      if (!result.success) {
        res.status(404).json(result);
        return;
      }

      res.json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  }

  /**
   * Search credit cards
   */
  static async searchCards(req: Request, res: Response): Promise<void> {
    try {
      const { q } = req.query;

      if (!q || typeof q !== "string") {
        res.status(400).json({
          success: false,
          error: "Search query is required",
        });
        return;
      }

      const result = await CardService.searchCards(q);

      if (!result.success) {
        res.status(400).json(result);
        return;
      }

      res.json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  }

  /**
   * Get top rated credit cards
   */
  static async getTopCards(req: Request, res: Response): Promise<void> {
    try {
      const limit = parseInt(req.query["limit"] as string) || 10;

      const result = await CardService.getTopCards(limit);

      if (!result.success) {
        res.status(400).json(result);
        return;
      }

      res.json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  }
}
