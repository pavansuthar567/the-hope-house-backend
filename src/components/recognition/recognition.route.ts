import express, { Request, Response } from 'express';
import RecognitionController from './recognition.controller';
import RecognitionValidations from './recognition.validations';

const router = express.Router();

/**
 * @route GET /api/recognitions
 * @description Get all recognitions
 * @returns JSON
 * @access public
 */
router.get('/', (req: Request, res: Response) => {
  RecognitionController.getRecognitions(req, res);
});

/**
 * @route POST /api/recognitions
 * @description Create a new recognition
 * @returns JSON
 * @access public
 */
router.post('/', RecognitionValidations.createRecognition, (req: Request, res: Response) => {
  RecognitionController.createRecognition(req, res);
});

/**
 * @route GET /api/recognitions/:id
 * @description Get a recognition by ID
 * @returns JSON
 * @access public
 */
router.get('/:id', (req: Request, res: Response) => {
  RecognitionController.getRecognitionById(req, res);
});

/**
 * @route PUT /api/recognitions/:id
 * @description Update a recognition by ID
 * @returns JSON
 * @access public
 */
router.put('/:id', RecognitionValidations.updateRecognition, (req: Request, res: Response) => {
  RecognitionController.updateRecognition(req, res);
});

/**
 * @route DELETE /api/recognitions/:id
 * @description Delete a recognition by ID
 * @returns JSON
 * @access public
 */
router.delete('/:id', (req: Request, res: Response) => {
  RecognitionController.deleteRecognition(req, res);
});

const recognitionRoutes = router;
export default recognitionRoutes;
