import { Request, Response } from 'express';
import QuoteService from '../../services/quoteService';
import { createError, createResponse } from '../../utils/helpers';

export default class QuoteController {
  static async getQuotes(req: Request, res: Response) {
    try {
      const quotes = await QuoteService.getQuotes();
      return createResponse(res, 'ok', 'Quotes retrieved successfully.', quotes);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async createQuote(req: Request, res: Response) {
    try {
      const quote = await QuoteService.createQuote(req.body);
      return createResponse(res, 'ok', 'Quote created successfully.', quote, {}, 201);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async getQuoteById(req: Request, res: Response) {
    try {
      const quote = await QuoteService.getQuoteById(req.params.id);
      return quote
        ? createResponse(res, 'ok', 'Quote retrieved successfully.', quote)
        : createError(res, 'Quote not found', {}, 404);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async updateQuote(req: Request, res: Response) {
    try {
      const quote = await QuoteService.updateQuote(req.params.id, req.body);
      if (!quote) {
        return createError(res, new Error('Quote not found'), {}, 404);
      }
      return createResponse(res, 'ok', 'Quote updated successfully.', quote);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async deleteQuote(req: Request, res: Response) {
    try {
      await QuoteService.deleteQuote(req.params.id);
      return createResponse(res, 'ok', 'Quote deleted successfully.', {});
    } catch (error) {
      return createError(res, error);
    }
  }
}
