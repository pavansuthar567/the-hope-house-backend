import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const BlogValidations = {
  createBlog: (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      title: Joi.string().min(5).max(200).required(),
      content: Joi.string().min(20).required(),
      author: Joi.string().required(),
      category: Joi.string().required(),
      likes: Joi.number().required(),
      views: Joi.number().required(),
      comments: Joi.array().items(Joi.string()).optional(),
      tags: Joi.array().items(Joi.string()).required(),
      publishedDate: Joi.date().allow("").allow(null).optional(),
      status: Joi.string().valid('Draft', 'Published').required(),
      featuredImage: Joi.string().uri().allow("").optional(),
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
      _id: Joi.string().optional(),
      title: Joi.string().min(5).max(200).optional(),
      content: Joi.string().min(20).optional(),
      author: Joi.string().optional(),
      category: Joi.string().optional(),
      likes: Joi.number().required(),
      views: Joi.number().required(),
      comments: Joi.array().items(Joi.string()).optional(),
      tags: Joi.array().items(Joi.string()).optional(),
      publishedDate: Joi.date().allow("").allow(null).optional(),
      status: Joi.string().valid('Draft', 'Published').optional(),
      featuredImage: Joi.string().uri().allow("").optional(),
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

export default BlogValidations;
