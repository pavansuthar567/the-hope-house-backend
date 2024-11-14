import VolunteerModel from '../models/volunteer';
import EventModel from '../models/event';
import TestimonialModel from '../models/testimonial';

export default class DashboardService {
  static async getStatistics() {
    try {
      const totalVolunteers = await VolunteerModel.countDocuments();
      const totalEvents = await EventModel.countDocuments();
      // const totalDonations = await DonationModel.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }]);
      const totalTestimonials = await TestimonialModel.countDocuments();

      return {
        totalVolunteers,
        totalEvents,
        // totalDonations: totalDonations[0]?.total || 0,
        totalDonations: 0,
        totalTestimonials,
      };
    } catch (error: any) {
      throw new Error('Error fetching statistics: ' + error.message);
    }
  }
}
