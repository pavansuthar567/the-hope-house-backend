import { Request, Response } from 'express';
import VolunteerService from 'services/volunteerService';
import { createError, createResponse } from 'utils/helpers';

export default class VolunteerController {
  static async getVolunteers(req: Request, res: Response) {
    try {
      const volunteers = await VolunteerService.getVolunteers();
      return createResponse(res, 'ok', 'Volunteers retrieved successfully.', volunteers);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async createVolunteer(req: Request, res: Response) {
    try {
      const volunteer = await VolunteerService.createVolunteer(req.body);
      return createResponse(res, 'ok', 'Volunteer created successfully.', volunteer, {}, 201);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async getVolunteerById(req: Request, res: Response) {
    try {
      const volunteer = await VolunteerService.getVolunteerById(req.params.id);
      return volunteer
        ? createResponse(res, 'ok', 'Volunteer retrieved successfully.', volunteer)
        : createError(res, 'Volunteer not found', {}, 404);
    } catch (error) {
      return createError(res, error);
    }
  }
  static async updateVolunteer(req: Request, res: Response) {
    try {
      const volunteer = await VolunteerService.updateVolunteer(req.params.id, req.body);
      if (!volunteer) {
        return createError(res, new Error('Volunteer not found'), {}, 404); // Pass 404 as status code
      }
      return createResponse(res, 'ok', 'Volunteer updated successfully.', volunteer);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async deleteVolunteer(req: Request, res: Response) {
    try {
      await VolunteerService.deleteVolunteer(req.params.id);
      return createResponse(res, 'ok', 'Volunteer deleted successfully.', {}); // Pass an empty object instead of null
    } catch (error) {
      return createError(res, error);
    }
  }
}
