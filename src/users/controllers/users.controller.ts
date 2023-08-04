import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(
    @Query('limit', ParseIntPipe) limit = 10,
    @Query('offset', ParseIntPipe) offset = 0,
  ) {
    return {
      data: this.usersService.findAll(),
      limit,
      offset,
    };
  }

  @Get(':userId')
  getUser(@Param('userId', ParseIntPipe) userId: number) {
    return `this user is ${userId}`;
  }

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  createUser(@Body() payload: any) {
    return {
      message: 'User created',
      payload,
    };
  }

  @Put(':userId')
  update(@Param('userId') userId: string, @Body() payload: any) {
    return {
      userId,
      payload,
    };
  }

  @Delete(':userId')
  delete(@Param('userId') userId: string) {
    return userId;
  }
}
