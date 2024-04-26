import {
  BadRequestException,
  Global,
  HttpStatus,
  Module,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { ApiResponse } from 'src/common/types/api-response.type';
import { EmailService } from './email-service/email.service';
import { FileService } from './file-service/file.service';
import { AwsS3CloudFileService } from './file-service/s3-cloud-file.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRE_TIME,
      },
    }),
  ],
  providers: [
    EmailService,
    {
      provide: FileService,
      useClass: AwsS3CloudFileService,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        exceptionFactory: (errors: ValidationError[]) => {
          const details: any[] = [];
          for (const error of errors) {
            for (const constraint in error.constraints) {
              details.push({
                property: error.property,
                constraint,
              });
            }
          }

          return new BadRequestException(
            ApiResponse.error({
              code: HttpStatus.BAD_REQUEST,
              error: {
                title: 'Validation Error',
                message: '',
                details: details,
              },
            }),
          );
        },
      }),
    },
  ],
  exports: [FileService, EmailService],
})
export class GlobalModule {}
