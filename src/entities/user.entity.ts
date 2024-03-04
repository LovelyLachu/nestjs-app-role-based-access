import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Role } from './role.entity';

//User Entity
@Schema()
export class User extends Document {
    @Prop({ required: true})
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: Role.name, index: true })
    role: MongooseSchema.Types.ObjectId;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);