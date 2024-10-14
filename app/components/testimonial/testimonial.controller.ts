import { Request, Response } from 'express';
import TestimonialService from 'services/testimonialService';
import { createError, createResponse } from 'utils/helpers';

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
      const testimonial = await TestimonialService.createTestimonial(req.body);
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
