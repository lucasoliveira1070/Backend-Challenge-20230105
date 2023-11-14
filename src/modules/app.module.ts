import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { ProductsModule } from './products.module';
import { ScheduleModule } from '@nestjs/schedule';
import { GetProductsJob } from 'src/jobs/getProductsJob';

@Module({
  imports: [ProductsModule, ScheduleModule],
  controllers: [AppController],
  providers: [AppService, GetProductsJob],
})
export class AppModule { }
