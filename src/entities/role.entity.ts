import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

//Role Entity
@Schema()
export class Role extends Document {
    @Prop({ required: true})
    name: string;

    @Prop({ required: true, index: true })
    access: Array<object>;
}

export const RoleSchema = SchemaFactory.createForClass(Role);