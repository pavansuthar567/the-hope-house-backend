import ancillaryPageRoutes from '../components/ancillaryPage/ancillaryPage.route';
import blogRoutes from '../components/blog/blog.route';
import eventRoutes from '../components/event/event.route';
import faqRoutes from '../components/faq/faq.route';
import galleryRoutes from '../components/gallery/gallery.route';
import homeRoutes from '../components/homePage/homePage.route';
import quoteRoutes from '../components/quote/quote.route';
import recognitionRoutes from '../components/recognition/recognition.route';
import teamMemberRoutes from '../components/teamMember/teamMember.route';
import testimonialRoutes from '../components/testimonial/testimonial.route';
import userRoutes from '../components/user/user.route';
import volunteerRoutes from '../components/volunteer/volunteer.route';
import { Application } from 'express';

/**
 * Init All routes here
 */
const initRoutes = (app: Application): void => {
  app.use('/api/user', userRoutes);
  app.use('/api/volunteer', volunteerRoutes);
  app.use('/api/team-members', teamMemberRoutes);
  app.use('/api/event', eventRoutes);
  app.use('/api/faq', faqRoutes);
  app.use('/api/testimonial', testimonialRoutes);
  app.use('/api/blog', blogRoutes);
  app.use('/api/quote', quoteRoutes);
  app.use('/api/gallery', galleryRoutes);
  app.use('/api/ancillary-page', ancillaryPageRoutes);
  app.use('/api/home-page', homeRoutes);
  app.use('/api/recognition', recognitionRoutes);
};

export default initRoutes;
