import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const MessageValidations = {
  createMessage: (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      firstName: Joi.string().min(1).required(),
      lastName: Joi.string().min(1).required(),
      email: Joi.string().email().required(),
      phoneNumber: Joi.string().length(10).required(),
      message: Joi.string().min(1).required(),
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

  updateMessage: (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      firstName: Joi.string().min(1).required(),
      lastName: Joi.string().min(1).required(),
      email: Joi.string().email().required(),
      phoneNumber: Joi.string().length(10).required(),
      message: Joi.string().min(1).required(),
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

export default MessageValidations;
