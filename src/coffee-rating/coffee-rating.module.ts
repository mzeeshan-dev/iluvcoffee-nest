import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';
import { CoffeeModule } from 'src/coffee/coffee.module';
// import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    // DatabaseModule.register(
    //   //👇🏻 passing in options
    //   {
    //     type: 'postgres',
    //     host: 'localhost',
    //     username: 'postgres',
    //     password: 'pass123',
    //     database: 'postgres',
    //   },
    // ),
    CoffeeModule,
  ],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
