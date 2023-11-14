import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { GetProductsJob } from 'src/jobs/getProductsJob';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, GetProductsJob],
})
export class AppModule { }
