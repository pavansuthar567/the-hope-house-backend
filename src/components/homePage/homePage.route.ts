import express, { Request, Response } from 'express';
import HomePageController from './homePage.controller';
import HomePageValidations from './homePage.validations';

const router = express.Router();

/**
 * @route GET /api/home
 * @description Get all home page data
 * @returns JSON
 * @access public
 */
router.get('/', (req: Request, res: Response) => {
  HomePageController.getHomePages(req, res);
});

/**
 * @route POST /api/home
 * @description Create a new home page entry
 * @returns JSON
 * @access public
 */
router.post('/', HomePageValidations.createHomePage, (req: Request, res: Response) => {
  HomePageController.createHomePage(req, res);
});

/**
 * @route GET /api/home/:id
 * @description Get home page data by ID
 * @returns JSON
 * @access public
 */
router.get('/:id', (req: Request, res: Response) => {
  HomePageController.getHomePageById(req, res);
});

/**
 * @route PUT /api/home/:id
 * @description Update home page data by ID
 * @returns JSON
 * @access public
 */
router.put('/:id', HomePageValidations.updateHomePage, (req: Request, res: Response) => {
  HomePageController.updateHomePage(req, res);
});

/**
 * @route DELETE /api/home/:id
 * @description Delete home page data by ID
 * @returns JSON
 * @access public
 */
router.delete('/:id', (req: Request, res: Response) => {
  HomePageController.deleteHomePage(req, res);
});

const homeRoutes = router;
export default homeRoutes;
