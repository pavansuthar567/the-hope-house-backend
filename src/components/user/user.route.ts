import express, { Request, Response } from 'express';
// import passport from 'passport';
// import PassportErrorHandler from '../../middleware/passportErrorResponse';
import UserValidations from './user.validations';
import UserController from './user.controller';
// import UserValidations from './user.validations';

const router = express.Router();

/**
 * @route GET /api/users
 * @description Get list of users
 * @returns JSON
 * @access public
 */
router.get('/', (req: Request, res: Response) => {
  UserController.getUsers(req, res);
});

/**
 * @route POST /api/users
 * @description Create a new user
 * @returns JSON
 * @access public
 */
router.post('/', UserValidations.createUser, (req: Request, res: Response) => {
  UserController.createUser(req, res);
});

// /**
//  * @route GET /api/users/secure
//  * @description Get secure user information
//  * @returns JSON
//  * @access private
//  */
// router.get(
//   '/secure',
//   [
//     // passport.authenticate('jwt', { session: false, failWithError: true }),
//     // PassportErrorHandler.success,
//     // PassportErrorHandler.error,
//   ],
//   (req: Request, res: Response) => {
//     return res.status(200).json({
//       status: 'ok',
//       message: 'Success',
//       data: {},
//     });
//   }
// );

/**
 * @route POST /api/users/forgot-password
 * @description Request a password reset
 * @returns JSON
 * @access public
 */
// router.post('/forgot-password', UserValidations.forgotPassword, (req: Request, res: Response) => {
//   UserController.forgotPassword(req, res);
// });

/**
 * @route POST /api/users/reset-password
 * @description Reset user password
 * @returns JSON
 * @access public
 */
// router.post('/reset-password', UserValidations.resetPassword, (req: Request, res: Response) => {
//   UserController.resetPassword(req, res);
// });

const userRoutes = router;
export default userRoutes;
