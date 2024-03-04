// restaurant.repository.ts
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant } from 'src/entities/restaurant.entity';
import { CreateRestaurantDto, UpdateRestaurantDto } from '../modules/restaurant/dto/restaurant.dto';

@Injectable()
export class RestaurantRepository {
  constructor(@InjectModel(Restaurant.name) private readonly restaurantModel: Model<Restaurant>) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    let restaurant = await this.getRestaurantByName(createRestaurantDto.name)
    if(restaurant){
      throw new ConflictException('Restaurant already exists with this name');
    }
    let createdRestaurant = new this.restaurantModel(createRestaurantDto);
      try {
        createdRestaurant = await createdRestaurant.save();
    } catch (error) {
        throw new InternalServerErrorException(error);
    }
    if (!createdRestaurant) {
      throw new ConflictException('Restaurant not created');
    }
    return createdRestaurant;
    
  }

  async findAll() {
    try{
     const allRestaurant = await this.restaurantModel.aggregate([{
      '$lookup':{
        from: "reviews",
        localField: "_id",
        foreignField: "restaurantId",
        as: "reviews",
      }
     },{
      '$project':{
        name: 1,
        address: 1,
        features: 1,
        menuItems: 1,
        imageUrl: 1,
        pricing: 1,
        bookTablePhone: 1,
        callForOrderPhone: 1,
        createdAt :1,
        reviews : 1
      }
     }]).exec();
     return allRestaurant
    }catch(error){
      throw new InternalServerErrorException(error);
    } 
  }

  async findOne(id: string) {
    try {
      const restaurant = await this.restaurantModel.findById(id).exec();
      if (!restaurant) {
        throw new NotFoundException('Restaurant not found');
      }
      return restaurant;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

  }

  async update(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    try {
      const updatedRestaurant = await this.restaurantModel.findByIdAndUpdate(id, updateRestaurantDto, { new: true }).exec();
      if (!updatedRestaurant) {
        throw new NotFoundException('Restaurant not found');
      }
      return updatedRestaurant;
    } catch (error) {
      throw new Error('Could not update restaurant');
    }
  }

  async remove(id: string) {
    try {
      const deletedRestaurant = await this.restaurantModel.findByIdAndDelete(id).exec();
      if (!deletedRestaurant) {
        throw new NotFoundException('Restaurant not found');
      }
      return deletedRestaurant;
    } catch (error) {
      throw new Error('Could not delete restaurant');
    }
  }

  async getRestaurantByName(name: string) {
    let restaurant;
    try {
        restaurant = await this.restaurantModel.findOne({ name }).exec();
    } catch (error) {
        throw new InternalServerErrorException(error);
    }

    return restaurant;
  }
}
