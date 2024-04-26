import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'public',
        module: PublicModule,
        children: [],
      },
    ]),
    AuthModule,
  ],
})
export class PublicModule {}
