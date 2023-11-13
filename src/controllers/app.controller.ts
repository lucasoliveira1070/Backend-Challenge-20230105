import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { ProductsService } from 'src/services/products.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly productsService: ProductsService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  testMethod(): any {
    return this.productsService.downloadAndProcessProducts();
  }
}
