import { Request, Response } from 'express';
import TestimonialService from '../../services/testimonialService';
import { createError, createResponse } from '../../utils/helpers';
import mongoose from 'mongoose';

export default class TestimonialController {
  static async getTestimonials(req: Request, res: Response) {
    try {
      const testimonials = await TestimonialService.getTestimonials();
      return createResponse(res, 'ok', 'Testimonials retrieved successfully.', testimonials);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async createTestimonial(req: Request, res: Response) {
    try {
      const user = new mongoose.Types.ObjectId('672335cb8b57a8954d79d1c2');
      const payload = { ...req.body, createdBy: user, updatedBy: user };
      const testimonial = await TestimonialService.createTestimonial(payload);
      return createResponse(res, 'ok', 'Testimonial created successfully.', testimonial, {}, 201);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async getTestimonialById(req: Request, res: Response) {
    try {
      const testimonial = await TestimonialService.getTestimonialById(req.params.id);
      return testimonial
        ? createResponse(res, 'ok', 'Testimonial retrieved successfully.', testimonial)
        : createError(res, 'Testimonial not found', {}, 404);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async updateTestimonial(req: Request, res: Response) {
    try {
      const testimonial = await TestimonialService.updateTestimonial(req.params.id, req.body);
      if (!testimonial) {
        return createError(res, new Error('Testimonial not found'), {}, 404);
      }
      return createResponse(res, 'ok', 'Testimonial updated successfully.', testimonial);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async deleteTestimonial(req: Request, res: Response) {
    try {
      await TestimonialService.deleteTestimonial(req.params.id);
      return createResponse(res, 'ok', 'Testimonial deleted successfully.', {});
    } catch (error) {
      return createError(res, error);
    }
  }
}
