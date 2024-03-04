// create-restaurant.dto.ts
import { IsNotEmpty, IsArray, IsString, IsUrl, IsPhoneNumber } from 'class-validator';

export class CreateRestaurantDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  features: string[];

  @IsNotEmpty()
  @IsArray()
  menuItems: {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  }[];

  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;

  @IsNotEmpty()
  @IsString()
  pricing: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  bookTablePhone: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  callForOrderPhone: string;
}

// update-restaurant.dto.ts
import { PartialType } from '@nestjs/mapped-types';
export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {}