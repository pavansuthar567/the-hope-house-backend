import express, { Request, Response } from 'express';
import TestimonialController from './testimonial.controller';
import TestimonialValidations from './testimonial.validations';

const router = express.Router();

/**
 * @route GET /api/testimonials
 * @description Get all testimonials
 * @returns JSON
 * @access public
 */
router.get('/', (req: Request, res: Response) => {
  TestimonialController.getTestimonials(req, res);
});

/**
 * @route POST /api/testimonials
 * @description Create a new testimonial
 * @returns JSON
 * @access public
 */
router.post('/', TestimonialValidations.createTestimonial, (req: Request, res: Response) => {
  TestimonialController.createTestimonial(req, res);
});

/**
 * @route GET /api/testimonials/:id
 * @description Get a testimonial by ID
 * @returns JSON
 * @access public
 */
router.get('/:id', (req: Request, res: Response) => {
  TestimonialController.getTestimonialById(req, res);
});

/**
 * @route PUT /api/testimonials/:id
 * @description Update a testimonial by ID
 * @returns JSON
 * @access public
 */
router.put('/:id', TestimonialValidations.updateTestimonial, (req: Request, res: Response) => {
  TestimonialController.updateTestimonial(req, res);
});

/**
 * @route DELETE /api/testimonials/:id
 * @description Delete a testimonial by ID
 * @returns JSON
 * @access public
 */
router.delete('/:id', (req: Request, res: Response) => {
  TestimonialController.deleteTestimonial(req, res);
});

const testimonialRoutes = router;
export default testimonialRoutes;
