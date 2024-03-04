// restaurant.repository.ts
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from 'src/entities/review.entity';
import { CreateReviewDto, UpdateReviewDto } from 'src/modules/review/dto/review.dto';

@Injectable()
export class ReviewRepository {
  constructor(@InjectModel(Review.name) private readonly reviewModel: Model<Review>) {}

  async create(createReviewDto: CreateReviewDto) {
    let createReview = new this.reviewModel(createReviewDto);
      try {
        createReview = await createReview.save();
    } catch (error) {
        throw new InternalServerErrorException(error);
    }
    if (!createReview) {
      throw new ConflictException('Review not created');
    }
    return createReview;
    
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    try {
      const updateReview = await this.reviewModel.findByIdAndUpdate(
        id,
        { $push: { "review.replies": updateReviewDto.replies } },
        { new: true }
      ).exec();
      if (!updateReview) {
        throw new NotFoundException('Review not found');
      }
      return updateReview;
    } catch (error) {
      throw new Error('Could not update review');
    }
  }

  async remove(id: string) {
    try {
      const deletedReview = await this.reviewModel.findByIdAndDelete(id).exec();
      if (!deletedReview) {
        throw new NotFoundException('Restaurant not found');
      }
      return deletedReview;
    } catch (error) {
      throw new Error('Could not delete restaurant');
    }
  }
}
