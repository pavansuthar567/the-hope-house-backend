import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const RecognitionValidations = {
  createRecognition: (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      title: Joi.string().min(3).max(100).required(),
      type: Joi.string().required(),
      description: Joi.string().min(50).max(100).required(),
      date: Joi.date().required(),
      imageUrl: Joi.string().optional(),
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

  updateRecognition: (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      title: Joi.string().min(3).max(100),
      type: Joi.string(),
      description: Joi.string().min(50).max(100),
      date: Joi.date(),
      imageUrl: Joi.string(),
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

export default RecognitionValidations;
