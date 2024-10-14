import eventRoutes from 'components/event/event.route';
import faqRoutes from 'components/faq/faq.route';
import userRoutes from 'components/user/user.route';
import volunteerRoutes from 'components/volunteer/volunteer.route';
import { Application } from 'express';

/**
 * Init All routes here
 */
const initRoutes = (app: Application): void => {
  app.use('/api/user', userRoutes);
  app.use('/api/volunteer', volunteerRoutes);
  app.use('/api/event', eventRoutes);
  app.use('/api/event', faqRoutes);
};

export default initRoutes;
