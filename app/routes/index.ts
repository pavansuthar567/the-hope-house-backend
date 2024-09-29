import { Application } from 'express';
import userRoutes from '../components/user/user.route';

/**
 * Init All routes here
 */
const initRoutes = (app: Application): void => {
  app.use('/api/user', userRoutes);
};

export default initRoutes;