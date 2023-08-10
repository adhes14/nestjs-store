import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { environments } from './environments';
import { DatabaseModule } from './database/database.module';
import config from './config';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] ?? '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_HOST: Joi.string().required(),
      }),
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
