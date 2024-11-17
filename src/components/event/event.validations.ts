import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const EventValidations = {
  createEvent: (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      eventName: Joi.string().min(3).max(100).required(),
      description: Joi.string().optional(),
      organizer: Joi.string().required(), // Assuming this is a reference (ObjectId or user/org ID)
      location: Joi.object({
        venue: Joi.string().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
      }).required(),
      startDate: Joi.date().required(),
      endDate: Joi.date().required().min(Joi.ref('startDate')),
      capacity: Joi.number().min(1).required(),
      participantsRegistered: Joi.number().default(0),
      eventType: Joi.string().valid('In-Person', 'Virtual').required(),
      registrationLink: Joi.string().uri().optional(),
      featuredImage: Joi.array().items(Joi.string().uri()).optional(),
      status: Joi.string().valid('Upcoming', 'Completed', 'Cancelled').required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: 'error',
        message: error.details[0].message,
      });
    } else {
      next();
    }
  },

  updateEvent: (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      eventName: Joi.string().min(3).max(100).optional(),
      description: Joi.string().optional(),
      organizer: Joi.string().optional(),
      location: Joi.object({
        venue: Joi.string().optional(),
        address: Joi.string().optional(),
        city: Joi.string().optional(),
        state: Joi.string().optional(),
      }).optional(),
      startDate: Joi.date().optional(),
      endDate: Joi.date().optional().greater(Joi.ref('startDate')),
      capacity: Joi.number().min(1).optional(),
      participantsRegistered: Joi.number().optional(),
      eventType: Joi.string().valid('In-Person', 'Virtual').optional(),
      registrationLink: Joi.string().uri().optional(),
      featuredImage: Joi.array().items(Joi.string().uri()).optional(),
      status: Joi.string().valid('Upcoming', 'Completed', 'Cancelled').optional(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: 'error',
        message: error.details[0].message,
      });
    } else {
      next();
    }
  },
};

export default EventValidations;
