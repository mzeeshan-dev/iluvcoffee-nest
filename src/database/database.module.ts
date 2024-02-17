import { DynamicModule, Module } from '@nestjs/common';
import { DataSourceOptions, createConnection } from 'typeorm';

@Module({})
export class DatabaseModule {
  constructor() {
    console.log('DatabaseModule loaded');
  }

  static register(options: DataSourceOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'CONNECTION',
          useValue: createConnection(options),
        },
      ],
    };
  }
}

// To check the dynamic module, i have implemented the following code in the coffee-rating.module.ts file
