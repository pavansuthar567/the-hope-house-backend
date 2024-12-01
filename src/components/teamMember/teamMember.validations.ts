import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const TeamMemberValidations = {
  createTeamMember: (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      firstName: Joi.string().min(2).required(),
      lastName: Joi.string().min(2).required(),
      email: Joi.string().email().allow('').optional(),
      phoneNumber: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required(),
      address: Joi.object({
        street: Joi.string().allow('').optional(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        zipCode: Joi.string()
          .pattern(/^[0-9]{6}$/)
          .allow('')
          .optional(),
      }).required(),
      role: Joi.string().allow('').optional(),
      bio: Joi.string().allow('').optional(),
      dateOfJoining: Joi.date().optional(),
      socialMediaLinks: Joi.object({
        linkedIn: Joi.string().uri().allow('').optional(),
        twitter: Joi.string().uri().allow('').optional(),
        instagram: Joi.string().uri().allow('').optional(),
      }).optional(),
      profilePictureUrl: Joi.string().uri().optional(),
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

  updateTeamMember: (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      firstName: Joi.string().min(2).optional(),
      lastName: Joi.string().min(2).optional(),
      email: Joi.string().email().allow('').optional(),
      phoneNumber: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .optional(),
      address: Joi.object({
        street: Joi.string().allow('').optional(),
        city: Joi.string().optional(),
        state: Joi.string().optional(),
        zipCode: Joi.string()
          .pattern(/^[0-9]{6}$/)
          .allow('')
          .optional(),
      }).optional(),
      role: Joi.string().allow('').optional(),
      bio: Joi.string().allow('').optional(),
      dateOfJoining: Joi.date().optional(),
      socialMediaLinks: Joi.object({
        linkedIn: Joi.string().uri().allow('').optional(),
        twitter: Joi.string().uri().allow('').optional(),
        instagram: Joi.string().uri().allow('').optional(),
      }).optional(),
      profilePictureUrl: Joi.string().uri().optional(),
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

export default TeamMemberValidations;
