import { Controller, Get, Post, Body, Param, Put, Delete, InternalServerErrorException, Request, UnauthorizedException  } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto, UpdateRestaurantDto } from './dto/restaurant.dto';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  async create(@Request() req, @Body() createRestaurantDto: CreateRestaurantDto) {
    try{
      await this.checkPermission(req.role, "restaurant", "CREATE")
      const createdRestaurant = await this.restaurantService.create(createRestaurantDto);
      return createdRestaurant;
    }catch(error){
      throw new InternalServerErrorException(error);
    }
   
  }

  @Get()
  async findAll(@Request() req) {
    try {
      await this.checkPermission(req.role, "restaurant", "READ")
      const restaurants = await this.restaurantService.findAll();
      return restaurants;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    try {
      await this.checkPermission(req.role, "restaurant", "READ")
    const restaurant = await this.restaurantService.findOne(id);
    return restaurant;
    }catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Put(':id')
  async update(@Request() req, @Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    try {
      await this.checkPermission(req.role, "restaurant", "UPDATE")
    const updateRestaurant = await this.restaurantService.update(id, updateRestaurantDto);
    return updateRestaurant;
    }catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
  try{
    await this.checkPermission(req.role, "restaurant", "DELETE")
    const removedRestaurant = await this.restaurantService.remove(id);
    return removedRestaurant;
  }catch (error) {
    throw new InternalServerErrorException(error);
  }
  }
  //Function for role access check
  async checkPermission(role, page, access){
    if(!role.access[page].includes(access)){
      throw new UnauthorizedException("Access Denied")
    }
  }
}
