export class FileUploadService {
    constructor() {}

    private checkFolder(folderPath: string) {
        throw new Error('Not implemented');
    }

    uploadSingle(
        file: unknown,
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
    ) {}

    uploadMultiple(
        file: unknown[],
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
    ) {}
}
