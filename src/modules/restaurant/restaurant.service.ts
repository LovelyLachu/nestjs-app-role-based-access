import { Injectable, NotFoundException } from '@nestjs/common';
import { RestaurantRepository } from '../../repositories/restaurant.repository';
import { CreateRestaurantDto, UpdateRestaurantDto } from '../../modules/restaurant/dto/restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(private readonly restaurantRepository: RestaurantRepository) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
      let createdRestaurant = await this.restaurantRepository.create(createRestaurantDto);
      return createdRestaurant
  }

  async findAll() {
      let allRestaurant = await this.restaurantRepository.findAll();
      return allRestaurant;
  }

  async findOne(id: string) {
      const restaurant = await this.restaurantRepository.findOne(id);
      return restaurant
  }

  async update(id: string, updateRestaurantDto: UpdateRestaurantDto) {
      const updatedRestaurant = await this.restaurantRepository.update(id, updateRestaurantDto);
      return updatedRestaurant;
  
  }

  async remove(id: string) {
      const deletedRestaurant = await this.restaurantRepository.remove(id);
      return deletedRestaurant;
  }
}
