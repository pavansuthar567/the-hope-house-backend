import express, { Request, Response } from 'express';
import EventController from './event.controller';
import EventValidations from './event.validations';
const router = express.Router();

/**
 * @route GET /api/events
 * @description Get all events
 * @returns JSON
 * @access public
 */
router.get('/events', (req: Request, res: Response) => {
  EventController.getEvents(req, res);
});

/**
 * @route POST /api/events
 * @description Create a new event
 * @returns JSON
 * @access public
 */
router.post('/events', EventValidations.createEvent, (req: Request, res: Response) => {
  EventController.createEvent(req, res);
});

/**
 * @route GET /api/events/:id
 * @description Get an event by ID
 * @returns JSON
 * @access public
 */
router.get('/events/:id', (req: Request, res: Response) => {
  EventController.getEventById(req, res);
});

/**
 * @route PUT /api/events/:id
 * @description Update an event by ID
 * @returns JSON
 * @access public
 */
router.put('/events/:id', EventValidations.updateEvent, (req: Request, res: Response) => {
  EventController.updateEvent(req, res);
});

/**
 * @route DELETE /api/events/:id
 * @description Delete an event by ID
 * @returns JSON
 * @access public
 */
router.delete('/events/:id', (req: Request, res: Response) => {
  EventController.deleteEvent(req, res);
});

const eventRoutes = router;
export default eventRoutes;
