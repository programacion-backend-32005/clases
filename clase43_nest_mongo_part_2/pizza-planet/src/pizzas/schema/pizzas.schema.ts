import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PizzaDocument = HydratedDocument<Pizza>;

@Schema()
export class Pizza {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  price: number;

  @Prop()
  size: string;
}
export const PizzaSchema = SchemaFactory.createForClass(Pizza);
