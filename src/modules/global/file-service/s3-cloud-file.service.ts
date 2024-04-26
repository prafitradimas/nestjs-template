import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DateTime } from 'luxon';
import { ApiResponse } from 'src/common/types/api-response.type';
import { FileServiceInterface } from 'src/modules/global/file-service/file-service.interface';

@Injectable()
export class AwsS3CloudFileService implements FileServiceInterface {
  protected readonly s3: S3Client;
  protected readonly S3_ENDPOINT: string;
  protected readonly S3_ACCESS_KEY: string;
  protected readonly S3_SECRET_KEY: string;
  protected readonly S3_BUCKET: string;
  protected readonly S3_REGION: string;
  protected readonly S3_PUBLIC_URL: string;

  constructor() {
    this.S3_BUCKET ??= process.env.S3_BUCKET;
    this.S3_REGION ??= process.env.S3_REGION;
    this.S3_ENDPOINT ??= process.env.S3_ENDPOINT;
    this.S3_ACCESS_KEY ??= process.env.S3_ACCESS_KEY;
    this.S3_SECRET_KEY ??= process.env.S3_SECRET_KEY;
    this.S3_PUBLIC_URL ??= process.env.S3_PUBLIC_URL;

    this.s3 = new S3Client({
      endpoint: this.S3_ENDPOINT,
      credentials: {
        accessKeyId: this.S3_ACCESS_KEY,
        secretAccessKey: this.S3_SECRET_KEY,
      },
      region: this.S3_REGION,
    });
  }

  async uploadFile(
    targetDir: Readonly<string>,
    file: Readonly<Express.Multer.File>,
    filename?: Readonly<string>,
  ): Promise<string> {
    try {
      let fn: string;
      const time = DateTime.now().setZone('Asia/Jakarta').toMillis();
      const ext = file.originalname.split('.').pop();

      if (filename) {
        fn = `${time}_${filename}.${ext}`;
      } else {
        const randStr = Math.random().toString(36).substring(7);
        fn = `${time}_${randStr}.${ext}`;
      }

      await this.s3.send(
        new PutObjectCommand({
          Bucket: this.S3_BUCKET,
          Key: `${targetDir}/${fn}`,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: 'public-read',
        }),
      );

      return fn;
    } catch (err) {
      new InternalServerErrorException(
        ApiResponse.error({
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to upload file',
          error: {
            title: err.name,
            message: err.message,
          },
        }),
      );
    }
  }

  async deleteFile(
    targetDir: Readonly<string>,
    filename: Readonly<string>,
  ): Promise<void> {
    try {
      await this.s3.send(
        new DeleteObjectCommand({
          Bucket: this.S3_BUCKET,
          Key: `${targetDir}/${filename}`,
        }),
      );
    } catch (err) {
      new InternalServerErrorException(
        ApiResponse.error({
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to delete file',
          error: {
            title: err.name,
            message: err.message,
          },
        }),
      );
    }
  }

  getAbsoluteFilePath(
    targetDir: Readonly<string>,
    filename: Readonly<string>,
  ): string {
    return `${this.S3_PUBLIC_URL}/${targetDir}/${filename}`;
  }
}
