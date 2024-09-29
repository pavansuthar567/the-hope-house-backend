import { Request, Response } from 'express';
import UserService from '../../services/userService';
import { createError, createResponse } from '../../utils/helpers';

export default class UserController {
  static async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getUsers();
      createResponse(res, 'ok', 'Users retrieved successfully', users);
    } catch (error) {
      createError(res, error, { message: 'Failed to retrieve users' });
    }
  }

  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.createUser(req.body);
      createResponse(res, 'ok', 'User created successfully', user);
    } catch (error) {
      createError(res, error, { message: 'Failed to create user' });
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const updatedUser = await UserService.updateUser(req.params.id, req.body);
      createResponse(res, 'ok', 'User updated successfully', updatedUser);
    } catch (error) {
      createError(res, error, { message: 'Failed to update user' });
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      await UserService.deleteUser(req.params.id);
      createResponse(res, 'ok', 'User deleted successfully', {});
    } catch (error) {
      createError(res, error, { message: 'Failed to delete user' });
    }
  }
}