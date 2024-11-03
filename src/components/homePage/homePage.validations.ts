import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const HomePageValidations = {
  createHomePage: (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      logo: Joi.string().uri().required(),
      quote: Joi.string().min(5).max(255).required(),
      heroSectionVideo: Joi.string().uri().required(),
      whoWeAre: Joi.string().min(10).required(),
      whatWeDo: Joi.string().min(10).required(),
      termsOfUse: Joi.string().min(10).required(),
      privacyPolicy: Joi.string().min(10).required(),
      isActive: Joi.boolean().required(),
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

  updateHomePage: (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      _id: Joi.string().optional(),
      logo: Joi.string().uri().optional(),
      quote: Joi.string().min(5).max(255).optional(),
      heroSectionVideo: Joi.string().uri().optional(),
      whoWeAre: Joi.string().min(10).optional(),
      whatWeDo: Joi.string().min(10).optional(),
      termsOfUse: Joi.string().min(10).optional(),
      privacyPolicy: Joi.string().min(10).optional(),
      isActive: Joi.boolean().required(),
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

export default HomePageValidations;
