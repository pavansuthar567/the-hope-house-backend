import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const FaqValidations = {
  createFaq: (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      question: Joi.string().min(5).max(255).required(),
      answer: Joi.string().min(10).required(),
      category: Joi.string().optional(), // Optional: Could be 'General', 'Donations', etc.
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

  updateFaq: (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      question: Joi.string().min(5).max(255).optional(),
      answer: Joi.string().min(10).optional(),
      category: Joi.string().optional(),
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

export default FaqValidations;