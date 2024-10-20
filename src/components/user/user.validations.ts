import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const UserValidations = {
  createUser: (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      username: Joi.string().min(3).max(30).required(),
      password: Joi.string().min(6).max(50).required(),
      email: Joi.string().email().required(),
      // Add any other fields as needed
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

  forgotPassword: (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
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

  resetPassword: (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      password: Joi.string().min(6).max(50).required(),
      confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
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

export default UserValidations;