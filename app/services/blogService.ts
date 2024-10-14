import BlogModel, { IBlog } from 'models/blog';

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
      const blog = new BlogModel(data);
      await blog.save();
      return blog;
    } catch (error) {
      throw new Error('Error creating blog');
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
      const updatedBlog = await BlogModel.findByIdAndUpdate(id, data, { new: true });
      if (!updatedBlog) {
        throw new Error('Blog not found');
      }
      return updatedBlog;
    } catch (error) {
      throw new Error('Error updating blog');
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
