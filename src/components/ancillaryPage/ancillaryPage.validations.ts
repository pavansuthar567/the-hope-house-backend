import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const AncillaryPageValidations = {
  createAncillaryPage: (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      title: Joi.string().min(3).max(100).required(),
      content: Joi.string().required(),
      lastUpdated: Joi.date().optional(),
      createdBy: Joi.string().optional(),
      status: Joi.string().valid('active', 'inactive', 'draft').optional(),
      version: Joi.string().optional(),
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

  updateAncillaryPage: (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      title: Joi.string().min(3).max(100),
      content: Joi.string(),
      lastUpdated: Joi.date(),
      createdBy: Joi.string(),
      status: Joi.string().valid('active', 'inactive', 'draft'),
      version: Joi.string(),
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

export default AncillaryPageValidations;
