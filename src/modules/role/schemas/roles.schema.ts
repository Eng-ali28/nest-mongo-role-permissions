import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Permissions } from 'src/modules/permissions/schemas/permission.schema';

@Schema({
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
})
export class Role extends Document {
    @Prop({ type: String, unique: true, index: true })
    name: string;

    @Prop([{ type: String, ref: Permissions.name, unique: true }])
    permissions: Permissions[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
