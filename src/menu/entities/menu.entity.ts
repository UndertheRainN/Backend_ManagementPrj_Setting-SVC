import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MaxLength } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseEntity } from 'src/entites/base.entity';
import { Service } from 'src/service/entities/service.entity';

@ObjectType('Menu')
@InputType('MenuInput')
// @Entity('menu')
// @Directive('@key(fields: "id")')
@Schema({ timestamps: true, _id: true, autoIndex: true })
export class Menu extends BaseEntity {
  @Field(() => [Service])
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  })
  services: Service[];

  @Prop()
  @MaxLength(50, { message: 'Độ dài không quá 50 ký tự' })
  @Field({ description: 'Đường link', nullable: true })
  path?: string;

  @Prop({ nullable: true, default: '0', type: mongoose.Types.ObjectId })
  @Field({
    description: 'Đường link',
    nullable: true,
  })
  parent_id?: string;
  @Prop({ nullable: true, default: 0 })
  @Field({
    description: 'Cấp độ',
    nullable: true,
  })
  level?: number;

  @Prop({ nullable: true, default: 0 })
  @Field({
    nullable: true,
  })
  priority?: number;
}

export type MenuDocument = HydratedDocument<Menu>;
export const MenuSchema = SchemaFactory.createForClass(Menu);
