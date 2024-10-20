import EventModel, { IEvent } from '../models/event';

export default class EventService {
  static async getEvents(): Promise<IEvent[]> {
    try {
      return await EventModel.find();
    } catch (error) {
      throw new Error('Error fetching events');
    }
  }

  static async createEvent(data: IEvent): Promise<IEvent> {
    try {
      const event = new EventModel(data);
      await event.save();
      return event;
    } catch (error) {
      throw new Error('Error creating event');
    }
  }

  static async getEventById(id: string): Promise<IEvent | null> {
    try {
      return await EventModel.findById(id).populate('organizer');
    } catch (error) {
      throw new Error('Error fetching event');
    }
  }

  static async updateEvent(id: string, data: Partial<IEvent>): Promise<IEvent | null> {
    try {
      const updatedEvent = await EventModel.findByIdAndUpdate(id, data, { new: true });
      if (!updatedEvent) {
        throw new Error('Event not found');
      }
      return updatedEvent;
    } catch (error) {
      throw new Error('Error updating event');
    }
  }

  static async deleteEvent(id: string): Promise<void> {
    try {
      await EventModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Error deleting event');
    }
  }
}
