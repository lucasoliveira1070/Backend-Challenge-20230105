import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { GetProductsJob } from 'src/jobs/getProductsJob';
import { ConfigModule } from '@nestjs/config';
import MongoConnection from 'src/config/database/mongo-connection';
import envConfig from 'src/config/env-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
    }),
    ScheduleModule.forRoot(),
    MongoConnection.getModule(
      process.env.DATABASE_URI,
      process.env.DATABASE_NAME,
      process.env.TLS_CERTIFICATE_KEY_FILE,
    )],
  controllers: [AppController],
  providers: [AppService, GetProductsJob],
})
export class AppModule { }
