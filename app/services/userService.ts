import UserModel from "models/user";

export default class UserService {
  static async getUsers(): Promise<any> {
    // Logic to fetch users from the database
    try {
      const users = await UserModel.find();
      return users;
    } catch (error) {
      throw new Error('Error fetching users');
    }
  }

  static async createUser(userData: any): Promise<any> {
    // Logic to create a new user in the database
    try {
      const newUser = new UserModel(userData);
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new Error('Error creating user');
    }
  }

  static async deleteUser(userId: string): Promise<any> {
    // Logic to delete a user from the database
    try {
      const deletedUser = await UserModel.findByIdAndDelete(userId);
      if (!deletedUser) {
        throw new Error('User not found');
      }
      return deletedUser;
    } catch (error) {
      throw new Error('Error deleting user');
    }
  }

  static async updateUser(userId: string, updateData: any): Promise<any> {
    // Logic to update user information in the database
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
      if (!updatedUser) {
        throw new Error('User not found');
      }
      return updatedUser;
    } catch (error) {
      throw new Error('Error updating user');
    }
  }
}
