import express, { Request, Response } from 'express';
import MessageController from './message.controller';
import MessageValidations from './message.validations';

const router = express.Router();

/**
 * @route GET /api/messages
 * @description Get all messages
 * @returns JSON
 * @access public
 */
router.get('/', (req: Request, res: Response) => {
  MessageController.getMessages(req, res);
});

/**
 * @route POST /api/messages
 * @description Create a new message
 * @returns JSON
 * @access public
 */
router.post('/', MessageValidations.createMessage, (req: Request, res: Response) => {
  MessageController.createMessage(req, res);
});

/**
 * @route GET /api/messages/:id
 * @description Get a message by ID
 * @returns JSON
 * @access public
 */
router.get('/:id', (req: Request, res: Response) => {
  MessageController.getMessageById(req, res);
});

/**
 * @route PUT /api/messages/:id
 * @description Update a message by ID
 * @returns JSON
 * @access public
 */
router.put('/:id', MessageValidations.updateMessage, (req: Request, res: Response) => {
  MessageController.updateMessage(req, res);
});

/**
 * @route DELETE /api/messages/:id
 * @description Delete a message by ID
 * @returns JSON
 * @access public
 */
router.delete('/:id', (req: Request, res: Response) => {
  MessageController.deleteMessage(req, res);
});

const messageRoutes = router;
export default messageRoutes;
