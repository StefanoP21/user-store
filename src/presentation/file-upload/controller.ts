import { Request, Response } from 'express';
import { CustomError } from '../../domain';

export class FileUploadController {
    // constructor(private readonly categoryService: CategoryService) {}

    private handleError = (res: Response, error: unknown) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Internal server error' });
    };

    uploadFile = async (req: Request, res: Response) => {
        console.log({ files: req.files });
        res.json('upload file');
    };

    uploadMultipleFile = async (req: Request, res: Response) => {
        res.json('upload multiple files');
    };
}
