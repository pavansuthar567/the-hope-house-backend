import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

const EventValidations = {
  createEvent: (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      eventName: Joi.string().min(3).max(100).required(),
      description: Joi.string().optional(),
      organizer: Joi.string().allow(null).optional(),
      location: Joi.object({
        venue: Joi.string().required(),
        state: Joi.string().required(),
      }).required(),
      startDate: Joi.date().required(),
      endDate: Joi.date().required().min(Joi.ref('startDate')),
      capacity: Joi.number().min(1).required(),
      participantsRegistered: Joi.number().default(0),
      content: Joi.string().min(20).required(),
      eventType: Joi.string().required(),
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
      organizer: Joi.string().allow(null).optional(),
      location: Joi.object({
        venue: Joi.string().optional(),
        state: Joi.string().optional(),
      }).optional(),
      startDate: Joi.date().optional(),
      endDate: Joi.date().optional().greater(Joi.ref('startDate')),
      capacity: Joi.number().min(1).optional(),
      participantsRegistered: Joi.number().optional(),
      content: Joi.string().min(20).optional(),
      eventType: Joi.string().required(),
      registrationLink: Joi.string().uri().optional(),
      featuredImage: Joi.array().items(Joi.string().uri()).optional(),
      status: Joi.string().valid('Upcoming', 'Completed', 'Cancelled').optional(),
      createdAt: Joi.date().optional(),
      createdBy: Joi.string().optional(),
      updatedAt: Joi.date().optional(),
      updatedBy: Joi.string().optional(),
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
