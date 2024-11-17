import GalleryModel, { IGallery } from '../models/gallery';

export default class GalleryService {
  static async getGallery(): Promise<any[]> {
    try {
      const galleries = await GalleryModel.find().lean();
      const updatedList = galleries.map((gallery: any) => {
        if (gallery?.eventId) {
          gallery.event = gallery.eventId;
          gallery.eventId = gallery?.event?._id;
        }
        return gallery;
      });
      return updatedList;
    } catch (error) {
      throw new Error('Error fetching gallery items');
    }
  }

  static async createGalleryItem(data: IGallery): Promise<IGallery> {
    try {
      const galleryItem = new GalleryModel(data);
      await galleryItem.save();
      return galleryItem;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new Error('Duplicate key error: ' + JSON.stringify(error.keyValue));
      }
      throw new Error('Error creating gallery item: ' + error.message);
    }
  }

  static async getGalleryItemById(id: string): Promise<IGallery | null> {
    try {
      return await GalleryModel.findById(id);
    } catch (error) {
      throw new Error('Error fetching gallery item');
    }
  }

  static async updateGalleryItem(id: string, data: Partial<IGallery>): Promise<IGallery | null> {
    try {
      const updatedGalleryItem = await GalleryModel.findByIdAndUpdate(id, data, { new: true });
      if (!updatedGalleryItem) {
        throw new Error('Gallery item not found');
      }
      return updatedGalleryItem;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new Error('Duplicate key error: ' + JSON.stringify(error.keyValue));
      }
      throw new Error('Error updating gallery item: ' + error.message);
    }
  }

  static async deleteGalleryItem(id: string): Promise<void> {
    try {
      await GalleryModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Error deleting gallery item');
    }
  }
}
