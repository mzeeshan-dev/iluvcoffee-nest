import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeeService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    const coffee = this.coffees.find((item) => item.id === +id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(payload: any) {
    this.coffees.push(payload);
    return {
      message: 'Coffee successfully created',
      payload,
    };
  }

  update(id: string, payload: any) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
      const updatedCoffee = (this.coffees[coffeeIndex] = {
        ...existingCoffee,
        ...payload,
      });
      return {
        message: 'Coffee successfully updated',
        payload: updatedCoffee,
      };
    }
  }

  replace(id: string, payload: any) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      this.remove(id);
      this.coffees.push(payload);
      return {
        message: 'Coffee successfully updated',
        payload,
      };
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }

  removeAll() {
    this.coffees = [];
    return {
      message: 'All coffees successfully deleted',
    };
  }
}
