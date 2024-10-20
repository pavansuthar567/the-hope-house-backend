import express, { Request, Response } from 'express';
import FileUploadController from './upload.controller';
import upload from '../../config/multer';

const router = express.Router();

/**
 * @route POST /api/upload
 * @description Upload Media files
 * @returns Files
 * @access public
 */
router.post('/', upload.array('file'), (req: Request, res: Response<any, Record<string, any>>) => {
  FileUploadController.uploadFile(req, res);
});

const fileUploadRoutes = router;
export default fileUploadRoutes;
