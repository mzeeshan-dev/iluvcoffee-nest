import {
  // Inject,
  Injectable,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Flavor } from './entities/flavor.entity';
import { Event } from 'src/events/entities/event.entity';
import { ConfigService } from '@nestjs/config';
// import { COFFEE_BRANDS } from './coffee.constants';

@Injectable({ scope: Scope.REQUEST })
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private dataSource: DataSource,
    // @Inject(COFFEE_BRANDS) coffeeBrands: string[],
    private readonly configService: ConfigService,
  ) {
    // console.warn(coffeeBrands);
    // console.log('CoffeeService Instantiated');
    const databaseHost = this.configService.get('DATABASE_HOST', 'localhost'); // 👈 no type conversion will happen here, you have to do it manually. The string type mentioned here is just for the compiler.
    console.log(databaseHost);
  }

  async findByQuery(paginationQueryDto) {
    const { limit, offset } = paginationQueryDto;
    return this.coffeeRepository.find({
      relations: ['flavors'],
      skip: offset,
      take: limit,
    });
  }

  async findAll() {
    return await this.coffeeRepository.find({
      relations: ['flavors'],
    });
  }

  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOne({
      where: { id },
      relations: ['flavors'],
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  async create(payload: CreateCoffeeDto) {
    const flavors = await Promise.all(
      payload.flavors.map((name) => this.preloadFlavorByName(name)),
    );
    const newCoffee = this.coffeeRepository.create({
      ...payload,
      flavors,
    });
    return this.coffeeRepository.save(newCoffee);
  }

  async update(id: number, payload: UpdateCoffeeDto) {
    const flavors =
      payload.flavors &&
      (await Promise.all(
        payload.flavors.map((name) => this.preloadFlavorByName(name)),
      ));

    const coffee = await this.coffeeRepository.preload({
      id,
      ...payload,
      flavors,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: number) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }

  async recommendCoffee(coffee: Coffee) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      coffee.recommendations++;
      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }
}
