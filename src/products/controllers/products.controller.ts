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
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getUsers(
    @Query('limit', ParseIntPipe) limit = 10,
    @Query('offset', ParseIntPipe) offset = 0,
  ) {
    return {
      data: this.productsService.findAll(),
      limit: limit,
      offset: offset,
    };
  }

  @Get(':userId')
  getUser(@Param('userId', ParseIntPipe) userId: number) {
    return {
      data: this.productsService.findOne(userId),
    };
  }

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  createUser(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':userId')
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(userId, payload);
  }

  @Delete(':userId')
  delete(@Param('userId', ParseIntPipe) userId: number) {
    return this.productsService.delete(userId);
  }
}
