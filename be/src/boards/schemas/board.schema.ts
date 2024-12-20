import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Board extends Document {
  @Prop()
  name: string;

  @Prop({ type: Array })
  elements: any[];
}

export const BoardSchema = SchemaFactory.createForClass(Board); 