import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const TestimonialValidations = {
  createTestimonial: (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(100).required(),
      designation: Joi.string().optional(),
      message: Joi.string().min(10).required(),
      image: Joi.string().uri().optional(),
      rating: Joi.number().min(1).max(5).required(),
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

  updateTestimonial: (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(100).optional(),
      designation: Joi.string().optional(),
      message: Joi.string().min(10).optional(),
      image: Joi.string().uri().optional(),
      rating: Joi.number().min(1).max(5).optional(),
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

export default TestimonialValidations;
