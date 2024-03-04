import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto, UpdateRestaurantDto } from '../../modules/restaurant/dto/restaurant.dto';
import { ReviewRepository } from 'src/repositories/review.repository';
import { CreateReviewDto, UpdateReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async create(createReviewDto: CreateReviewDto) {
      let createdRestaurant = await this.reviewRepository.create(createReviewDto);
      return createdRestaurant
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
      const updatedReview = await this.reviewRepository.update(id, updateReviewDto);
      return updatedReview;
  
  }

  async remove(id: string) {
      const deletedReview = await this.reviewRepository.remove(id);
      return deletedReview;
  }
}
