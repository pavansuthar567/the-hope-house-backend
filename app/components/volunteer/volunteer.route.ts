import express, { Request, Response } from 'express';
import VolunteerController from './volunteer.controller';
import VolunteerValidations from './volunteer.validations';
const router = express.Router();

/**
 * @route GET /api/volunteers
 * @description Get all volunteers
 * @returns JSON
 * @access public
 */
router.get('/volunteers', (req: Request, res: Response) => {
  VolunteerController.getVolunteers(req, res);
});

/**
 * @route POST /api/volunteers
 * @description Create a new volunteer
 * @returns JSON
 * @access public
 */
router.post('/volunteers', VolunteerValidations.createVolunteer, (req: Request, res: Response) => {
  VolunteerController.createVolunteer(req, res);
});

/**
 * @route GET /api/volunteers/:id
 * @description Get a volunteer by ID
 * @returns JSON
 * @access public
 */
router.get('/volunteers/:id', (req: Request, res: Response) => {
  VolunteerController.getVolunteerById(req, res);
});

/**
 * @route PUT /api/volunteers/:id
 * @description Update a volunteer by ID
 * @returns JSON
 * @access public
 */
router.put('/volunteers/:id', VolunteerValidations.updateVolunteer, (req: Request, res: Response) => {
  VolunteerController.updateVolunteer(req, res);
});

/**
 * @route DELETE /api/volunteers/:id
 * @description Delete a volunteer by ID
 * @returns JSON
 * @access public
 */
router.delete('/volunteers/:id', (req: Request, res: Response) => {
  VolunteerController.deleteVolunteer(req, res);
});

const volunteerRoutes = router;
export default volunteerRoutes;
