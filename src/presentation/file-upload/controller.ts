import { Request, Response } from 'express';
import { CustomError } from '../../domain';
import { FileUploadService } from '../services/file-upload.service';
import { UploadedFile } from 'express-fileupload';

export class FileUploadController {
    constructor(private readonly fileUploadService: FileUploadService) {}

    private handleError = (res: Response, error: unknown) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Internal server error' });
    };

    uploadFile = async (req: Request, res: Response) => {
        const files = req.files;
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: 'No files were selected' });
        }

        const file = req.files.file as UploadedFile;
        this.fileUploadService
            .uploadSingle(file)
            .then((uploaded) => res.json(uploaded))
            .catch((err) => this.handleError(err, res));
    };

    uploadMultipleFile = async (req: Request, res: Response) => {
        res.json('upload multiple files');
    };
}
