import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.entity';
import { Restaurant } from './restaurant.entity';

//Review Entity 
@Schema()
export class Review extends Document {
  
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, index: true })
    userId: MongooseSchema.Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: Restaurant.name, index: true })
    restaurantId: MongooseSchema.Types.ObjectId;

    @Prop({ required: true })
    rating: number;

    @Prop({ required: true })
    comment: string;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
