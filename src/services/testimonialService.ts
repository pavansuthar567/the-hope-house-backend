import TestimonialModel, { ITestimonial } from '../models/testimonial';

export default class TestimonialService {
  static async getTestimonials(): Promise<ITestimonial[]> {
    try {
      return await TestimonialModel.find();
    } catch (error) {
      throw new Error('Error fetching testimonials');
    }
  }

  static async createTestimonial(data: ITestimonial): Promise<ITestimonial> {
    try {
      const testimonial = new TestimonialModel(data);
      await testimonial.save();
      return testimonial;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new Error('Duplicate key error: ' + JSON.stringify(error.keyValue));
      }
      throw new Error('Error creating testimonial: ' + error.message);
    }
  }

  static async getTestimonialById(id: string): Promise<ITestimonial | null> {
    try {
      return await TestimonialModel.findById(id);
    } catch (error) {
      throw new Error('Error fetching testimonial');
    }
  }

  static async updateTestimonial(id: string, data: Partial<ITestimonial>): Promise<ITestimonial | null> {
    try {
      const updatedTestimonial = await TestimonialModel.findByIdAndUpdate(id, data, { new: true });
      if (!updatedTestimonial) {
        throw new Error('Testimonial not found');
      }
      return updatedTestimonial;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new Error('Duplicate key error: ' + JSON.stringify(error.keyValue));
      }
      throw new Error('Error updating testimonial: ' + error.message);
    }
  }

  static async deleteTestimonial(id: string): Promise<void> {
    try {
      await TestimonialModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Error deleting testimonial');
    }
  }
}
