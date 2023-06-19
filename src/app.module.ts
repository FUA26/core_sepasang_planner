import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import appConfig from './configs/app.config';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ['.env'],
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
