import express, { Request, Response } from 'express';
import FaqController from './faq.controller';
import FaqValidations from './faq.validations';
const router = express.Router();

/**
 * @route GET /api/faqs
 * @description Get all FAQs
 * @returns JSON
 * @access public
 */
router.get('/faqs', (req: Request, res: Response) => {
  FaqController.getFaqs(req, res);
});

/**
 * @route POST /api/faqs
 * @description Create a new FAQ
 * @returns JSON
 * @access public
 */
router.post('/faqs', FaqValidations.createFaq, (req: Request, res: Response) => {
  FaqController.createFaq(req, res);
});

/**
 * @route GET /api/faqs/:id
 * @description Get an FAQ by ID
 * @returns JSON
 * @access public
 */
router.get('/faqs/:id', (req: Request, res: Response) => {
  FaqController.getFaqById(req, res);
});

/**
 * @route PUT /api/faqs/:id
 * @description Update an FAQ by ID
 * @returns JSON
 * @access public
 */
router.put('/faqs/:id', FaqValidations.updateFaq, (req: Request, res: Response) => {
  FaqController.updateFaq(req, res);
});

/**
 * @route DELETE /api/faqs/:id
 * @description Delete an FAQ by ID
 * @returns JSON
 * @access public
 */
router.delete('/faqs/:id', (req: Request, res: Response) => {
  FaqController.deleteFaq(req, res);
});

const faqRoutes = router;
export default faqRoutes;
