import express, { Request, Response } from 'express';
import HomePageController from './homePage.controller';
import HomePageValidations from './homePage.validations';

const router = express.Router();

/**
 * @route GET /api/home
 * @description Get home page data
 * @returns JSON
 * @access public
 */
router.get('/', (req: Request, res: Response) => {
  HomePageController.getHomePage(req, res);
});

/**
 * @route POST /api/home
 * @description Create home page data
 * @returns JSON
 * @access public
 */
router.post('/', HomePageValidations.createHomePage, (req: Request, res: Response) => {
  HomePageController.createHomePage(req, res);
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

const homeRoutes = router;
export default homeRoutes;
