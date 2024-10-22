import express, { Request, Response } from 'express';
import GalleryController from './gallery.controller';
import GalleryValidations from './gallery.validations';
const router = express.Router();

/**
 * @route GET /api/gallery
 * @description Get all gallery items
 * @returns JSON
 * @access public
 */
router.get('/', (req: Request, res: Response) => {
  GalleryController.getGallery(req, res);
});

/**
 * @route POST /api/gallery
 * @description Create a new gallery item
 * @returns JSON
 * @access public
 */
router.post('/', GalleryValidations.createGalleryItem, (req: Request, res: Response) => {
  GalleryController.createGalleryItem(req, res);
});

/**
 * @route GET /api/gallery/:id
 * @description Get a gallery item by ID
 * @returns JSON
 * @access public
 */
router.get('/:id', (req: Request, res: Response) => {
  GalleryController.getGalleryItemById(req, res);
});

/**
 * @route PUT /api/gallery/:id
 * @description Update a gallery item by ID
 * @returns JSON
 * @access public
 */
router.put('/:id', GalleryValidations.updateGalleryItem, (req: Request, res: Response) => {
  GalleryController.updateGalleryItem(req, res);
});

/**
 * @route DELETE /api/gallery/:id
 * @description Delete a gallery item by ID
 * @returns JSON
 * @access public
 */
router.delete('/:id', (req: Request, res: Response) => {
  GalleryController.deleteGalleryItem(req, res);
});

const galleryRoutes = router;
export default galleryRoutes;
