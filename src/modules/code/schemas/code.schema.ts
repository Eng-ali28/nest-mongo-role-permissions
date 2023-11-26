import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Code extends Document {
    @Prop()
    phoneNumber: string;

    @Prop({ default: false })
    active: boolean;

    @Prop()
    otp: number;

    createdAt: string;
    updatedAt: string;
}

export const CodeSchema = SchemaFactory.createForClass(Code);
