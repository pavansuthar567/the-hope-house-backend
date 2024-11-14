import express, { Request, Response } from 'express';
import DashboardController from './dashboard.controller';
const router = express.Router();

/**
 * @route GET /api/dashboard/statistics
 * @description Get dashboard statistics
 * @returns JSON
 * @access public
 */
router.get('/statistics', (req: Request, res: Response) => {
  DashboardController.getStatistics(req, res);
});

const dashboardRoutes = router;
export default dashboardRoutes;
