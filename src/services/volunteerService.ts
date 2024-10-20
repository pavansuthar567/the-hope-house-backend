import VolunteerModel, { IVolunteer } from '../models/volunteer';

export default class VolunteerService {
  static async getVolunteers(): Promise<IVolunteer[]> {
    try {
      return await VolunteerModel.find();
    } catch (error) {
      throw new Error('Error fetching volunteers');
    }
  }

  static async createVolunteer(data: IVolunteer): Promise<IVolunteer> {
    try {
      const volunteer = new VolunteerModel(data);
      await volunteer.save();
      return volunteer;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new Error('Duplicate key error: ' + JSON.stringify(error.keyValue));
      }
      throw new Error('Error creating volunteer: ' + error.message);
    }
  }

  static async getVolunteerById(id: string): Promise<IVolunteer | null> {
    try {
      return await VolunteerModel.findById(id);
    } catch (error) {
      throw new Error('Error fetching volunteer');
    }
  }

  static async updateVolunteer(id: string, data: Partial<IVolunteer>): Promise<IVolunteer | null> {
    try {
      const updatedVolunteer = await VolunteerModel.findByIdAndUpdate(id, data, { new: true });
      if (!updatedVolunteer) {
        throw new Error('Volunteer not found');
      }
      return updatedVolunteer;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new Error('Duplicate key error: ' + JSON.stringify(error.keyValue));
      }
      throw new Error('Error updating volunteer: ' + error.message);
    }
  }

  static async deleteVolunteer(id: string): Promise<void> {
    try {
      await VolunteerModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Error deleting volunteer');
    }
  }
}
