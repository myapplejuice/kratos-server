import { Router } from 'express'
import { UploadController } from './upload-controller.js';
import { DISK_UPLOAD } from '../../global.js';
import { disableTimeout } from '../../middleware/disable-timeout.js';

const UPLOAD_ROUTER = Router()

UPLOAD_ROUTER
  .post('/file', disableTimeout, DISK_UPLOAD.single('file'), UploadController.uploadSingle)
  .post('/files', disableTimeout, DISK_UPLOAD.array('files', 5), UploadController.uploadMultiple);

export default UPLOAD_ROUTER