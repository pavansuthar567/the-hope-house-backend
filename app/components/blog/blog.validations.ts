import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const BlogValidations = {
  createBlog: (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      title: Joi.string().min(5).max(200).required(),
      content: Joi.string().min(20).required(),
      author: Joi.string().required(),
      category: Joi.string().required(),
      tags: Joi.array().items(Joi.string()).required(),
      publishedDate: Joi.date().required(),
      status: Joi.string().valid('Draft', 'Published').required(),
      featuredImage: Joi.string().uri().optional(),
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

  updateBlog: (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      title: Joi.string().min(5).max(200).optional(),
      content: Joi.string().min(20).optional(),
      author: Joi.string().optional(),
      category: Joi.string().optional(),
      tags: Joi.array().items(Joi.string()).optional(),
      publishedDate: Joi.date().optional(),
      status: Joi.string().valid('Draft', 'Published').optional(),
      featuredImage: Joi.string().uri().optional(),
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

export default BlogValidations;
