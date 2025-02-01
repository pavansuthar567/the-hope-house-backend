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

/**
 * @route POST /api/webhooks/tradingview
 * @description Receive TradingView alerts via webhook
 * @returns JSON
 * @access Public (but secure with a secret key)
 */
router.post('/webhooks/tradingview', (req: Request, res: Response) => {
  DashboardController.processWebhook(req, res);
});

const dashboardRoutes = router;
export default dashboardRoutes;
