import express, { Request, Response } from 'express';
import TeamMemberController from './teamMember.controller';
import TeamMemberValidations from './teamMember.validations';

const router = express.Router();

/**
 * @route GET /api/team-members
 * @description Get all team members
 * @returns JSON
 * @access public
 */
router.get('/team-members', (req: Request, res: Response) => {
  TeamMemberController.getTeamMembers(req, res);
});

/**
 * @route POST /api/team-members
 * @description Create a new team member
 * @returns JSON
 * @access public
 */
router.post('/team-members', TeamMemberValidations.createTeamMember, (req: Request, res: Response) => {
  TeamMemberController.createTeamMember(req, res);
});

/**
 * @route GET /api/team-members/:id
 * @description Get a team member by ID
 * @returns JSON
 * @access public
 */
router.get('/team-members/:id', (req: Request, res: Response) => {
  TeamMemberController.getTeamMemberById(req, res);
});

/**
 * @route PUT /api/team-members/:id
 * @description Update a team member by ID
 * @returns JSON
 * @access public
 */
router.put('/team-members/:id', TeamMemberValidations.updateTeamMember, (req: Request, res: Response) => {
  TeamMemberController.updateTeamMember(req, res);
});

/**
 * @route DELETE /api/team-members/:id
 * @description Delete a team member by ID
 * @returns JSON
 * @access public
 */
router.delete('/team-members/:id', (req: Request, res: Response) => {
  TeamMemberController.deleteTeamMember(req, res);
});

const teamMemberRoutes = router;
export default teamMemberRoutes;
