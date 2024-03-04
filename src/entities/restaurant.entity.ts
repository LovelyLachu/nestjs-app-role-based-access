import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

//Restaurant Entity
@Schema()
export class Restaurant extends Document {
    @Prop({ required: true, unique:true })
    name: string;

    @Prop({ required: true })
    address: string;

    @Prop({ type: [String], required: true })
    features: string[];

    @Prop({ 
        type: [{
            name: String,
            description: String,
            price: Number,
            imageUrl: String,
            createdAt: { type: Date, default: Date.now }
        }],
        default: []
    })
    menuItems: {
        name: string;
        description: string;
        price: number;
        imageUrl: string;
        createdAt?: Date;
    }[];

    @Prop({ required: true })
    imageUrl: string;

    @Prop({ required: true, index: true })
    pricing: string;

    @Prop({ required: true })
    bookTablePhone: string;

    @Prop({ required: true })
    callForOrderPhone: string;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);