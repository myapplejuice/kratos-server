export class UploadController {
    static async uploadSingle(req, res) {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        return res.status(200).json({ message: 'File uploaded successfully', file: req.file });
    }
    static async uploadMultiple(req, res) {
        if (!req.files) {
            return res.status(400).json({ message: 'No files uploaded' });
        }
        return res.status(200).json({ message: 'Files uploaded successfully', files: req.files });
    }
}