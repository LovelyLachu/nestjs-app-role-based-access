import { IsNotEmpty, IsNumber, IsString, IsArray, ValidateNested } from 'class-validator';

export class CreateReviewDto {

  @IsNotEmpty()
  restaurantId: string;

  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsArray()
  review: [];

}

export class UpdateReviewDto {
  @IsNotEmpty()
  @IsString()
  replies: string;
}
