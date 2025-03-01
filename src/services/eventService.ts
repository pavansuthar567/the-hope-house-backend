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
    } catch (error: any) {
      if (error.code === 11000) {
        throw new Error('Duplicate key error: ' + JSON.stringify(error.keyValue));
      }
      throw new Error('Error creating event: ' + error.message);
    }
  }

  // static async getEventById(id: string): Promise<IEvent | null> {
  //   try {
  //     return await EventModel.findById(id).populate('organizer');
  //   } catch (error) {
  //     throw new Error('Error fetching event');
  //   }
  // }

  static async getEventById(eventId: string): Promise<any> {
    try {
      const event = await EventModel.findById(eventId);
      if (!event) {
        throw new Error(`Event with ID ${eventId} not found`);
      }
      return event;
    } catch (error: any) {
      console.error(`Error fetching event with ID ${eventId}:`, error.message);
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
    } catch (error: any) {
      if (error.code === 11000) {
        throw new Error('Duplicate key error: ' + JSON.stringify(error.keyValue));
      }
      throw new Error('Error updating event: ' + error.message);
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
