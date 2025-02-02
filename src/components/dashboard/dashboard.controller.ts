import { Request, Response } from 'express';
import DashboardService from '../../services/dashboardService';
import { createError, createResponse } from '../../utils/helpers';

export default class DashboardController {
  static async getStatistics(req: Request, res: Response) {
    try {
      const statistics = await DashboardService.getStatistics();
      return createResponse(res, 'ok', 'Statistics retrieved successfully.', statistics);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async processWebhook(req: Request, res: Response) {
    try {
      const webhookData = req.body; // Raw JSON data from TradingView - // Raw text from TradingView
      const webhookData1 = JSON.parse(webhookData); // Parse to JSON
      console.log('webhookData', webhookData)
      console.log('webhookData1', webhookData1)
      console.log('req.headers[content-type]', req.headers['content-type'])

      await DashboardService.saveWebhookData(webhookData); // Save to MongoDB
      return createResponse(res, 'ok', 'Webhook data processed successfully.', webhookData1);
    } catch (error) {
      return createError(res, error);
    }
  }
}
