import { NextFunction, Request, Response } from 'express';
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

  static async processWebhook(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const webhookData = typeof body === 'string' && body.trim().startsWith('{') ? JSON.parse(body) : { message: body };
      // const webhookData = typeof body === 'string' ? JSON.parse(body) : body;
  
      console.log('webhookData', webhookData);
      console.log('req.headers[content-type]', req.headers['content-type']);
  
      await DashboardService.saveWebhookData(webhookData);
      return createResponse(res, 'ok', 'Webhook data processed successfully.', webhookData);
    } catch (error) {
      next(error); // Pass error to Next.js error handler
    }
  }  
}
