import BlogModel, { IBlog } from '../models/blog';

export default class BlogService {
  static async getBlogs(): Promise<IBlog[]> {
    try {
      return await BlogModel.find();
    } catch (error) {
      throw new Error('Error fetching blogs');
    }
  }

  static async createBlog(data: IBlog): Promise<IBlog> {
    try {
      if (!data.publishedDate && data?.status === 'Published') data.publishedDate = new Date();

      const blog = new BlogModel(data);
      await blog.save();
      return blog;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new Error('Duplicate key error: ' + JSON.stringify(error.keyValue));
      }
      throw new Error('Error creasting blog: ' + error.message);
    }
  }

  static async getBlogById(id: string): Promise<IBlog | null> {
    try {
      return await BlogModel.findById(id);
    } catch (error) {
      throw new Error('Error fetching blog');
    }
  }

  static async updateBlog(id: string, data: Partial<IBlog>): Promise<IBlog | null> {
    try {
      if (!data.publishedDate && data?.status === 'Published') data.publishedDate = new Date();

      const updatedBlog = await BlogModel.findByIdAndUpdate(id, data, { new: true });
      if (!updatedBlog) {
        throw new Error('Blog not found');
      }
      return updatedBlog;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new Error('Duplicate key error: ' + JSON.stringify(error.keyValue));
      }
      throw new Error('Error updating blog: ' + error.message);
    }
  }

  static async deleteBlog(id: string): Promise<void> {
    try {
      await BlogModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Error deleting blog');
    }
  }
}
