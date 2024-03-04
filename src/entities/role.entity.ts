import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

//Role Entity
@Schema()
export class Role extends Document {
    @Prop({ required: true})
    name: string;

    @Prop({type: Object})
    access: {}; 
}

export const RoleSchema = SchemaFactory.createForClass(Role);