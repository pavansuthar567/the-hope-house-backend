import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const QuoteValidations = {
  createQuote: (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      text: Joi.string().min(5).required(),
      author: Joi.string().min(3).required(),
      source: Joi.string().optional(),
      category: Joi.string().optional(),
      createdAt: Joi.date().optional(),
      createdBy: Joi.string().optional(),
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

  updateQuote: (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      text: Joi.string().min(5),
      author: Joi.string().min(3),
      source: Joi.string(),
      category: Joi.string(),
      createdAt: Joi.date(),
      createdBy: Joi.string(),
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

export default QuoteValidations;
