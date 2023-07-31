import { Module } from '@nestjs/common';
import { BrandsController } from './controllers/brands.controller';
import { CategoriesController } from './controllers/categories.controller';
import { OrdersController } from './controllers/orders.controller';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';

@Module({
  controllers: [
    BrandsController,
    CategoriesController,
    OrdersController,
    ProductsController,
  ],
  providers: [ProductsService],
})
export class ProductsModule {}
