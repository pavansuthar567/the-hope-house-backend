import { Request, Response } from 'express';
import FaqService from 'services/faqService';
import { createError, createResponse } from 'utils/helpers';

export default class FaqController {
  static async getFaqs(req: Request, res: Response) {
    try {
      const faqs = await FaqService.getFaqs();
      return createResponse(res, 'ok', 'FAQs retrieved successfully.', faqs);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async createFaq(req: Request, res: Response) {
    try {
      const faq = await FaqService.createFaq(req.body);
      return createResponse(res, 'ok', 'FAQ created successfully.', faq, {}, 201);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async getFaqById(req: Request, res: Response) {
    try {
      const faq = await FaqService.getFaqById(req.params.id);
      return faq
        ? createResponse(res, 'ok', 'FAQ retrieved successfully.', faq)
        : createError(res, 'FAQ not found', {}, 404);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async updateFaq(req: Request, res: Response) {
    try {
      const faq = await FaqService.updateFaq(req.params.id, req.body);
      if (!faq) {
        return createError(res, new Error('FAQ not found'), {}, 404);
      }
      return createResponse(res, 'ok', 'FAQ updated successfully.', faq);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async deleteFaq(req: Request, res: Response) {
    try {
      await FaqService.deleteFaq(req.params.id);
      return createResponse(res, 'ok', 'FAQ deleted successfully.', {});
    } catch (error) {
      return createError(res, error);
    }
  }
}
