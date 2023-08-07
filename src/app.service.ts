import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  // constructor(private config: ConfigService) {}
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    // const apiKey = this.config.get<string>('API_KEY');
    // const name = this.config.get('DATABASE_NAME');
    const apiKey = this.configService.apiKey;
    const name = this.configService.database.name;
    return `apiKey: ${apiKey}, database: ${name}`;
  }
}
