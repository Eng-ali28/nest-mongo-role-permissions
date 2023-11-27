import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Permission } from 'src/modules/permissions/schemas/permission.schema';

@Schema({
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
})
export class Role extends Document {
    @Prop({ type: String, unique: true })
    name: string;

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: Permission.name, unique: true })
    permissions: Permission[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
