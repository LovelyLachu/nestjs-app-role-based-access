import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.entity';
import { Restaurant } from './restaurant.entity';

//Review Entity 
@Schema()
export class Review extends Document {

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: Restaurant.name, index: true, required: true })
    restaurantId: MongooseSchema.Types.ObjectId;

    @Prop({ required: true })
    rating: number;

    @Prop({ 
        type: {
            comment: String,
            replies: [],
            createdAt: { type: Date, default: Date.now }
        },
        default: {}
    })
    review: {
        comment: String,
        replies?: [],
        createdAt?: Date
    };
    @Prop({ default: Date.now })
    createdAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
