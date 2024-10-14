import express, { Request, Response } from 'express';
import BlogController from './blog.controller';
import BlogValidations from './blog.validations';

const router = express.Router();

/**
 * @route GET /api/blogs
 * @description Get all blogs
 * @returns JSON
 * @access public
 */
router.get('/blogs', (req: Request, res: Response) => {
  BlogController.getBlogs(req, res);
});

/**
 * @route POST /api/blogs
 * @description Create a new blog
 * @returns JSON
 * @access public
 */
router.post('/blogs', BlogValidations.createBlog, (req: Request, res: Response) => {
  BlogController.createBlog(req, res);
});

/**
 * @route GET /api/blogs/:id
 * @description Get a blog by ID
 * @returns JSON
 * @access public
 */
router.get('/blogs/:id', (req: Request, res: Response) => {
  BlogController.getBlogById(req, res);
});

/**
 * @route PUT /api/blogs/:id
 * @description Update a blog by ID
 * @returns JSON
 * @access public
 */
router.put('/blogs/:id', BlogValidations.updateBlog, (req: Request, res: Response) => {
  BlogController.updateBlog(req, res);
});

/**
 * @route DELETE /api/blogs/:id
 * @description Delete a blog by ID
 * @returns JSON
 * @access public
 */
router.delete('/blogs/:id', (req: Request, res: Response) => {
  BlogController.deleteBlog(req, res);
});

const blogRoutes = router;
export default blogRoutes;
