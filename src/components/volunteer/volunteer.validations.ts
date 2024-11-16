import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const VolunteerValidations = {
  createVolunteer: (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      firstName: Joi.string().min(3).max(30).required(),
      lastName: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      phoneNumber: Joi.string().min(10).max(15).required(),
      address: Joi.object({
        city: Joi.string().required(),
        state: Joi.string().required(),
      }).required(),
      gender: Joi.string().valid('Male', 'Female', 'Other').required(),
      skills: Joi.array().items(Joi.string()).required(),
      availability: Joi.string().valid('Full-time', 'Part-time', 'Weekends').required(),
      experience: Joi.string().optional(),
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

  updateVolunteer: (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      _id: Joi.string().optional(),
      firstName: Joi.string().min(3).max(30),
      lastName: Joi.string().min(3).max(30),
      email: Joi.string().email(),
      phoneNumber: Joi.string().min(10).max(15),
      address: Joi.object({
        city: Joi.string(),
        state: Joi.string(),
        _id: Joi.string().optional(),
      }),
      gender: Joi.string().valid('Male', 'Female', 'Other'),
      skills: Joi.array().items(Joi.string()),
      availability: Joi.string().valid('Full-time', 'Part-time', 'Weekends'),
      experience: Joi.string(),
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

export default VolunteerValidations;
