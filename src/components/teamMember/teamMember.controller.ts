import { Request, Response } from 'express';
import TeamMemberService from '../../services/teamMemberService';
import { createError, createResponse } from '../../utils/helpers';

export default class TeamMemberController {
  static async getTeamMembers(req: Request, res: Response) {
    try {
      const teamMembers = await TeamMemberService.getTeamMembers();
      return createResponse(res, 'ok', 'Team members retrieved successfully.', teamMembers);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async createTeamMember(req: Request, res: Response) {
    try {
      const teamMember = await TeamMemberService.createTeamMember(req.body);
      return createResponse(res, 'ok', 'Team member created successfully.', teamMember, {}, 201);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async getTeamMemberById(req: Request, res: Response) {
    try {
      const teamMember = await TeamMemberService.getTeamMemberById(req.params.id);
      return teamMember
        ? createResponse(res, 'ok', 'Team member retrieved successfully.', teamMember)
        : createError(res, 'Team member not found', {}, 404);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async updateTeamMember(req: Request, res: Response) {
    try {
      const teamMember = await TeamMemberService.updateTeamMember(req.params.id, req.body);
      if (!teamMember) {
        return createError(res, new Error('Team member not found'), {}, 404);
      }
      return createResponse(res, 'ok', 'Team member updated successfully.', teamMember);
    } catch (error) {
      return createError(res, error);
    }
  }

  static async deleteTeamMember(req: Request, res: Response) {
    try {
      await TeamMemberService.deleteTeamMember(req.params.id);
      return createResponse(res, 'ok', 'Team member deleted successfully.', {});
    } catch (error) {
      return createError(res, error);
    }
  }
}
