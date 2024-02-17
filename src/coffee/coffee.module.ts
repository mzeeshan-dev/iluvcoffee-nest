import {
  // Injectable,
  Module,
} from '@nestjs/common';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';
import { Coffee } from './entities/coffee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flavor } from './entities/flavor.entity';
import { Event } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from './coffee.constants';
import { DataSource } from 'typeorm';

// class ConfigService {}
// class DevelopmentConfigService {}
// class ProductionConfigService {}

// @Injectable()
// export class CoffeeBrandsFactory {
//   create() {
//     return ['buddy brew', 'nescafe'];
//   }
// }

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])], // 👈 Registering Repository in the current module
  controllers: [CoffeeController],
  providers: [
    CoffeeService,
    // {
    //   provide: COFFEE_BRANDS, // 👈 token
    //   useValue: ['buddy brew', 'nescafe'],
    // },
    // {
    //   provide: ConfigService,
    //   useClass:
    //     process.env.NODE_ENV === 'development'
    //       ? DevelopmentConfigService
    //       : ProductionConfigService,
    // },
    // {
    //   provide: COFFEE_BRANDS, // 👈 token
    //   useFactory: () => ['buddy brew', 'nescafe'],
    // },
    // {
    //   provide: COFFEE_BRANDS, // 👈 token
    //   useFactory: (brandsFactory: CoffeeBrandsFactory) =>
    //     brandsFactory.create(),
    //   inject: [CoffeeBrandsFactory],
    // },
    {
      provide: COFFEE_BRANDS, // 👈 token
      // async factory
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      useFactory: async (dataSource: DataSource): Promise<string[]> => {
        // const coffeeBrands = await dataSource.query('SELECT * ...');
        const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
        console.log('[!] Async factory');
        return coffeeBrands;
      },
    },
  ],
  exports: [CoffeeService], // 👈 Exporting the service
})
export class CoffeeModule {}
