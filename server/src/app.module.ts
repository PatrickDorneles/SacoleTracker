import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GlobalModule } from './global/global.module';
import { OrganizationModule } from './organization/organization.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, GlobalModule, OrganizationModule, AuthModule],
})
export class AppModule {}
