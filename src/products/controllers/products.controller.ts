import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from '../dtos/products.dtos';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Get all products' })
  @Get()
  getProducts(@Query() params: FilterProductDto) {
    return this.productsService.findAll(params);
  }

  @Get(':productId')
  getProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
  }

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  createProduct(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':productId')
  update(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(productId, payload);
  }

  @Put(':productId/category/:categoryId')
  addCategory(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.addCategoryToProduct(productId, categoryId);
  }

  @Delete(':productId')
  delete(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.delete(productId);
  }

  @Delete(':productId/category/:categoryId')
  removeCategory(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.removeCategoryByProduct(productId, categoryId);
  }
}
