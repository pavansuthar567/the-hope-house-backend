import MessageModel, { IMessage } from '../models/message';

export default class MessageService {
  static async getMessages(): Promise<IMessage[]> {
    try {
      return await MessageModel.find();
    } catch (error) {
      throw new Error('Error fetching messages');
    }
  }

  static async createMessage(data: IMessage): Promise<IMessage> {
    try {
      const message = new MessageModel(data);
      await message.save();
      return message;
    } catch (error: any) {
      throw new Error('Error creating message: ' + error.message);
    }
  }

  static async getMessageById(id: string): Promise<IMessage | null> {
    try {
      return await MessageModel.findById(id);
    } catch (error) {
      throw new Error('Error fetching message');
    }
  }

  static async updateMessage(id: string, data: Partial<IMessage>): Promise<IMessage | null> {
    try {
      const updatedMessage = await MessageModel.findByIdAndUpdate(id, data, { new: true });
      if (!updatedMessage) {
        throw new Error('Message not found');
      }
      return updatedMessage;
    } catch (error: any) {
      throw new Error('Error updating message: ' + error.message);
    }
  }

  static async deleteMessage(id: string): Promise<void> {
    try {
      await MessageModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Error deleting message');
    }
  }
}
