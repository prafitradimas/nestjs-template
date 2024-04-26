import { InternalServerErrorException } from '@nestjs/common';

export interface FileServiceInterface {
  /**
   * Returns uploaded file name
   *
   * @param targetDir the directory where file is stored
   * @param file File object to be stored
   * @param filename optional file name to overwrite the original file name
   *
   * @throws { InternalServerErrorException } if error
   *
   * @returns uploaded file name (excluding the directory)
   */
  uploadFile(
    targetDir: Readonly<string>,
    file: Readonly<Express.Multer.File>,
    filename?: Readonly<string>,
  ): Promise<string>;

  /**
   * Deleting file permanently
   *
   * @param targetDir the directory where file is stored
   * @param filename file name
   *
   * @throws { InternalServerErrorException } if error
   */
  deleteFile(
    targetDir: Readonly<string>,
    filename: Readonly<string>,
  ): Promise<void>;

  /**
   * Returns absolute file path
   *
   * @param targetDir the directory where file is stored
   * @param filename file name
   *
   * @returns absolute file path
   */
  getAbsoluteFilePath(
    targetDir: Readonly<string>,
    filename: Readonly<string>,
  ): string;
}
