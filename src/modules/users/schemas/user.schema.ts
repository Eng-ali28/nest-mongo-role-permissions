import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Role } from 'src/modules/role/schemas/roles.schema';

@Schema({
    timestamps: true,
})
export class User extends Document {
    @Prop({ type: String })
    firstName: string;

    @Prop({ type: String })
    lastName: string;

    @Prop({ type: Date })
    birthDay: Date;

    @Prop({ type: String, default: null })
    email: string;

    @Prop({ type: String })
    password: string;

    @Prop({ type: String, unique: true, index: true })
    phoneNumber: string;

    @Prop({ type: String, default: null })
    image: string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ type: [String], ref: Role.name, default: [] })
    roles: Role[];

    @Prop({ default: false })
    isAdmin: boolean;

    @Prop({ required: false })
    deviceToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
