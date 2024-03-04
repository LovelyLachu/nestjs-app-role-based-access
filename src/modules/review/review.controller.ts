import { Controller, Get, Post, Body, Param, Put, Delete, Request, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto, UpdateReviewDto } from './dto/review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async create(@Request() req, @Body() CreateReviewDto: CreateReviewDto) {
    try{
      await this.checkPermission(req.role, "review", "CREATE")
      const createdRestaurant = await this.reviewService.create(CreateReviewDto);
      return createdRestaurant;
    }catch(error){
      throw new InternalServerErrorException(error);
    }
  }

  @Put(':id')
  async update(@Request() req, @Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto ){
    try{
      await this.checkPermission(req.role, "review", "UPDATE")
      const updateReview = await this.reviewService.update(id, updateReviewDto);
      return updateReview;
    }catch(error){
      throw new InternalServerErrorException(error);
    }
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    try{
      await this.checkPermission(req.role, "review", "DELETE")
      const removeReview = await this.reviewService.remove(id);
      return removeReview;
    }catch(error){
      throw new InternalServerErrorException(error);
    }
   
  }

  async checkPermission(role, page, access){
    if(!role.access[page].includes(access)){
      throw new UnauthorizedException("Access Denied")
    }
  }
}
