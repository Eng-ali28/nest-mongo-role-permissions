import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
})
export class Permission extends Document {
    @Prop({ type: String, unique: true })
    action: string;

    @Prop({ type: String })
    function: string;

    @Prop({ type: String })
    subject: string;

}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
