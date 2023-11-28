import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
})
export class Permissions extends Document {
    @Prop({ type: String, index: true, unique: true })
    action: string;

    @Prop({ type: String })
    function: string;

    @Prop({ type: String })
    subject: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permissions);
