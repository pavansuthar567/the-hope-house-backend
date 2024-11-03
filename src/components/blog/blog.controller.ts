import { Request, Response } from 'express';
import BlogService from '../../services/blogService';
import { createError, createResponse } from '../../utils/helpers';
import mongoose from 'mongoose';

export default class BlogController {
  static async getBlogs(req: Request, res: Response) {
    try {
      const blogs = await BlogService.getBlogs();
      return createResponse(res, 'ok', 'Blogs retrieved successfully.', blogs);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async createBlog(req: Request, res: Response) {
    try {
      const user = new mongoose.Types.ObjectId('672335cb8b57a8954d79d1c2');
      const payload = { ...req.body, createdBy: user, updatedBy: user };

      const blog = await BlogService.createBlog(payload);
      return createResponse(res, 'ok', 'Blog created successfully.', blog, {}, 201);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async getBlogById(req: Request, res: Response) {
    try {
      const blog = await BlogService.getBlogById(req.params.id);
      return blog
        ? createResponse(res, 'ok', 'Blog retrieved successfully.', blog)
        : createError(res, 'Blog not found', {}, 404);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async updateBlog(req: Request, res: Response) {
    try {
      const blog = await BlogService.updateBlog(req.params.id, req.body);
      if (!blog) {
        return createError(res, 'Blog not found', {}, 404);
      }
      return createResponse(res, 'ok', 'Blog updated successfully.', blog);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async deleteBlog(req: Request, res: Response) {
    try {
      await BlogService.deleteBlog(req.params.id);
      return createResponse(res, 'ok', 'Blog deleted successfully.', {});
    } catch (error) {
      return createError(res, error);
    }
  }
}
