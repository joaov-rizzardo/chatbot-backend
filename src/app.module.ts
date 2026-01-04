import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './infra/database/database.module';
import { UserModule } from './infra/modules/user.module';
import { ConfigModule } from "@nestjs/config"
import { AuthModule } from './infra/modules/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
