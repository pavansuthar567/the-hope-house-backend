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
}
