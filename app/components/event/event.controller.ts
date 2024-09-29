import { Request, Response } from 'express';
import EventService from 'services/eventService';
import { createError, createResponse } from 'utils/helpers';

export default class EventController {
  static async getEvents(req: Request, res: Response) {
    try {
      const events = await EventService.getEvents();
      return createResponse(res, 'ok', 'Events retrieved successfully.', events);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async createEvent(req: Request, res: Response) {
    try {
      const event = await EventService.createEvent(req.body);
      return createResponse(res, 'ok', 'Event created successfully.', event, {}, 201);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async getEventById(req: Request, res: Response) {
    try {
      const event = await EventService.getEventById(req.params.id);
      return event
        ? createResponse(res, 'ok', 'Event retrieved successfully.', event)
        : createError(res, 'Event not found', {}, 404);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async updateEvent(req: Request, res: Response) {
    try {
      const event = await EventService.updateEvent(req.params.id, req.body);
      if (!event) {
        return createError(res, new Error('Event not found'), {}, 404); // Pass 404 as status code
      }
      return createResponse(res, 'ok', 'Event updated successfully.', event);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async deleteEvent(req: Request, res: Response) {
    try {
      await EventService.deleteEvent(req.params.id);
      return createResponse(res, 'ok', 'Event deleted successfully.', {});
    } catch (error) {
      return createError(res, error);
    }
  }
}
