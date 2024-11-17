import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const GalleryValidations = {
  createGalleryItem: (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      imageUrl: Joi.string().uri().required(),
      caption: Joi.string().optional(),
      eventId: Joi.string().optional(),
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

  updateGalleryItem: (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      imageUrl: Joi.string().uri(),
      caption: Joi.string(),
      eventId: Joi.string().optional(),
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

export default GalleryValidations;
