import { fileURLToPath } from 'url'
import path from 'path'
import multer from 'multer'
import fs from 'fs'

//DIRECTORY
export const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

//JWT
export const SECRET_KEY = '8455ce10-640d-4a66-845a-8ff187bb2b04'

//MULTER
const STORAGE = multer.diskStorage({
    destination: function (req, file, cb) {
        const UPLOAD_DIR = path.resolve('uploads');
        if (!fs.existsSync(UPLOAD_DIR)) {
            fs.mkdirSync(UPLOAD_DIR);
        }
        cb(null, UPLOAD_DIR);
    },
    filename: function (req, file, cb) {
        const FILE_NAME = file.originalname.replace(new RegExp(/\.[^/.]+$/), "");
        const UNIQUE_SUFFIX = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const FILE_EXTENSION = file.originalname.split('.').pop()
        cb(null, `${FILE_NAME}-${UNIQUE_SUFFIX}.${FILE_EXTENSION}`);
    }
})

export const DISK_UPLOAD = multer({
    storage: STORAGE, limits: {
        fileSize: 50 * 1024 * 1024 //50MB max per file (first num controls size in MB)
    }
})