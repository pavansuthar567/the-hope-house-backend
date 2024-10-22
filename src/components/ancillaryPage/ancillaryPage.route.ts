import express, { Request, Response } from 'express';
import AncillaryPageController from './ancillaryPage.controller';
import AncillaryPageValidations from './ancillaryPage.validations';

const router = express.Router();

/**
 * @route GET /api/ancillary-pages
 * @description Get all ancillary pages
 * @returns JSON
 * @access public
 */
router.get('/', (req: Request, res: Response) => {
  AncillaryPageController.getAncillaryPages(req, res);
});

/**
 * @route POST /api/ancillary-pages
 * @description Create a new ancillary page
 * @returns JSON
 * @access public
 */
router.post('/', AncillaryPageValidations.createAncillaryPage, (req: Request, res: Response) => {
  AncillaryPageController.createAncillaryPage(req, res);
});

/**
 * @route GET /api/ancillary-pages/:id
 * @description Get an ancillary page by ID
 * @returns JSON
 * @access public
 */
router.get('/:id', (req: Request, res: Response) => {
  AncillaryPageController.getAncillaryPageById(req, res);
});

/**
 * @route PUT /api/ancillary-pages/:id
 * @description Update an ancillary page by ID
 * @returns JSON
 * @access public
 */
router.put('/:id', AncillaryPageValidations.updateAncillaryPage, (req: Request, res: Response) => {
  AncillaryPageController.updateAncillaryPage(req, res);
});

/**
 * @route DELETE /api/ancillary-pages/:id
 * @description Delete an ancillary page by ID
 * @returns JSON
 * @access public
 */
router.delete('/:id', (req: Request, res: Response) => {
  AncillaryPageController.deleteAncillaryPage(req, res);
});

const ancillaryPageRoutes = router;
export default ancillaryPageRoutes;
