import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';

import { environments } from './environments';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] ?? '.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
