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
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers(@Query('limit') limit = 10, @Query('offset') offset = 0) {
    return `All users with limit = ${limit}, offset = ${offset}`;
  }

  @Get(':userId')
  getUser(@Param('userId') userId: string) {
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
