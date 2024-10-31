import bcrypt from 'bcrypt';
import UserModel from '../models/user';

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

  static async getUserById(userId: string): Promise<any> {
    // Logic to get a single user by ID
    try {
      const user = await UserModel.findById(userId).select('-password');
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Error fetching user');
    }
  }

  static async createUser(userData: any): Promise<any> {
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Create a new user instance with the hashed password
      const newUser = new UserModel({ ...userData, password: hashedPassword });
      await newUser.save();
      return newUser;
    } catch (error: any) {
      if (error.code === 11000) {
        // 11000 is the error code for duplicate key error
        if (error?.keyValue?.name) {
          // Handle duplicate name error
          console.error('Name must be unique:', error.keyValue.name);
        } else if (error?.keyValue?.email) {
          // Handle duplicate email error
          console.error('Email must be unique:', error.keyValue.email);
        }
      } else {
        // Handle other errors
        console.error('Error creating user:', error.message);
      }
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
    } catch (error: any) {
      if (error.code === 11000) {
        throw new Error('Duplicate key error: ' + JSON.stringify(error.keyValue));
      }
      throw new Error('Error updating user: ' + error.message);
    }
  }
}
