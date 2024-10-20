import TeamMemberModel, { ITeamMember } from '../models/teamMember';

export default class TeamMemberService {
  static async getTeamMembers(): Promise<ITeamMember[]> {
    try {
      return await TeamMemberModel.find();
    } catch (error) {
      throw new Error('Error fetching team members');
    }
  }

  static async createTeamMember(data: ITeamMember): Promise<ITeamMember> {
    try {
      const teamMember = new TeamMemberModel(data);
      await teamMember.save();
      return teamMember;
    } catch (error) {
      throw new Error('Error creating team member');
    }
  }

  static async getTeamMemberById(id: string): Promise<ITeamMember | null> {
    try {
      return await TeamMemberModel.findById(id);
    } catch (error) {
      throw new Error('Error fetching team member');
    }
  }

  static async updateTeamMember(id: string, data: Partial<ITeamMember>): Promise<ITeamMember | null> {
    try {
      const updatedTeamMember = await TeamMemberModel.findByIdAndUpdate(id, data, { new: true });
      if (!updatedTeamMember) {
        throw new Error('Team member not found');
      }
      return updatedTeamMember;
    } catch (error) {
      throw new Error('Error updating team member');
    }
  }

  static async deleteTeamMember(id: string): Promise<void> {
    try {
      await TeamMemberModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Error deleting team member');
    }
  }
}
