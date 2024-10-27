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
        street: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        zipCode: Joi.string().required(),
      }).required(),
      dateOfBirth: Joi.date().required(),
      gender: Joi.string().valid('Male', 'Female', 'Other').required(),
      skills: Joi.array().items(Joi.string()).required(),
      availability: Joi.string().valid('Full-time', 'Part-time', 'Weekends').required(),
      joinedDate: Joi.date().required(),
      experience: Joi.string().optional(),
      emergencyContact: Joi.object({
        name: Joi.string().required(),
        phoneNumber: Joi.string().min(10).max(15).required(),
        relation: Joi.string().required(),
      }).required(),
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
        street: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        zipCode: Joi.string(),
        _id: Joi.string().optional(),
      }),
      dateOfBirth: Joi.date(),
      gender: Joi.string().valid('Male', 'Female', 'Other'),
      skills: Joi.array().items(Joi.string()),
      availability: Joi.string().valid('Full-time', 'Part-time', 'Weekends'),
      joinedDate: Joi.date(),
      experience: Joi.string(),
      emergencyContact: Joi.object({
        name: Joi.string(),
        phoneNumber: Joi.string().min(10).max(15),
        relation: Joi.string(),
        _id: Joi.string().optional(),
      }),
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
