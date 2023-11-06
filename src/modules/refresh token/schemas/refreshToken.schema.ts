import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/modules/users/schemas/user.schema';

@Schema()
export class RefreshToken extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: string | User;

  @Prop()
  refreshToken: string;

  @Prop()
  deviceName: string;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
