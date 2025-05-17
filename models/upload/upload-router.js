import { Router } from 'express'
import { UploadController } from './upload-controller.js';
import { UPLOAD } from '../../global.js';

const uploadRouter = Router()

uploadRouter
  .post('/file', UPLOAD.single('file'), UploadController.uploadSingle)
  .post('/files', UPLOAD.array('files', 5), UploadController.uploadMultiple);


export default uploadRouter