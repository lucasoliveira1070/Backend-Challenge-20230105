import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductsService } from '../services/products.service';

@Module({
    imports: [ScheduleModule.forRoot()],
    providers: [ProductsService],
    exports: [ProductsService]
})
export class ProductsModule { }
