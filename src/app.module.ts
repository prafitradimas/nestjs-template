import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { GlobalModule } from './modules/global/global.module';
import { RoleModule } from './modules/internal/role/role.module';
import { UserModule } from './modules/internal/user/user.module';
import { PublicModule } from './modules/public/public.module';

@Module({
  imports: [PublicModule, GlobalModule, AuthModule, UserModule, RoleModule],
})
export class AppModule {}
