import { FileServiceInterface } from 'src/modules/global/file-service/file-service.interface';

export class FileService implements FileServiceInterface {
  uploadFile(
    targetDir: Readonly<string>,
    file: Readonly<Express.Multer.File>,
    filename?: Readonly<string>,
  ): Promise<string> {
    throw new Error('Method not implemented.');
  }
  deleteFile(
    targetDir: Readonly<string>,
    filename: Readonly<string>,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getAbsoluteFilePath(
    targetDir: Readonly<string>,
    filename: Readonly<string>,
  ): string {
    throw new Error('Method not implemented.');
  }
}
