import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const TestimonialValidations = {
  createTestimonial: (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(100).required(),
      designation: Joi.string().optional(),
      message: Joi.string().min(10).required(),
      image: Joi.string().uri().optional(),
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
      _id: Joi.string().optional(),
      name: Joi.string().min(3).max(100).optional(),
      designation: Joi.string().optional(),
      message: Joi.string().min(10).optional(),
      image: Joi.string().uri().optional(),
      createdBy: Joi.string().required(),
      updatedBy: Joi.string().required(),
      createdAt: Joi.date().optional(),
      updatedAt: Joi.date().optional(),
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
