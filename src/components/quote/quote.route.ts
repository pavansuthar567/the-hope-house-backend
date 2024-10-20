import express, { Request, Response } from 'express';
import QuoteController from './quote.controller';
import QuoteValidations from './quote.validations';
const router = express.Router();

/**
 * @route GET /api/quotes
 * @description Get all quotes
 * @returns JSON
 * @access public
 */
router.get('/', (req: Request, res: Response) => {
  QuoteController.getQuotes(req, res);
});

/**
 * @route POST /api/quotes
 * @description Create a new quote
 * @returns JSON
 * @access public
 */
router.post('/', QuoteValidations.createQuote, (req: Request, res: Response) => {
  QuoteController.createQuote(req, res);
});

/**
 * @route GET /api/quotes/:id
 * @description Get a quote by ID
 * @returns JSON
 * @access public
 */
router.get('/:id', (req: Request, res: Response) => {
  QuoteController.getQuoteById(req, res);
});

/**
 * @route PUT /api/quotes/:id
 * @description Update a quote by ID
 * @returns JSON
 * @access public
 */
router.put('/:id', QuoteValidations.updateQuote, (req: Request, res: Response) => {
  QuoteController.updateQuote(req, res);
});

/**
 * @route DELETE /api/quotes/:id
 * @description Delete a quote by ID
 * @returns JSON
 * @access public
 */
router.delete('/:id', (req: Request, res: Response) => {
  QuoteController.deleteQuote(req, res);
});

const quoteRoutes = router;
export default quoteRoutes;
