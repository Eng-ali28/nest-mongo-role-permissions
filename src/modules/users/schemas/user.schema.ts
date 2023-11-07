import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
    timestamps: true,
})
export class User extends Document {
    @Prop({ type: String })
    firstName: string;

    @Prop({ type: String })
    lastName: string;

    @Prop({ type: String })
    companyName: string;

    @Prop({ type: String })
    country: string;

    @Prop({ type: String, unique: true, index: true })
    email: string;

    @Prop({ type: String })
    password: string;

    @Prop({ type: String })
    phoneNumber: string;

    @Prop({ type: String, default: null })
    image: string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ required: false })
    deviceToken: string;

    @Prop({ default: false })
    isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
