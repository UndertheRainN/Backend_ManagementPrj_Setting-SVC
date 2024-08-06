import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Menu } from '../entities/menu.entity';

@InputType()
export class CreateMenuInput extends OmitType(PartialType(Menu, InputType), [
  '_id',
  'createdAt',
  'updatedAt',
  'services',
] as const) {
  @Field(() => [String], { description: 'Danh sách services', nullable: true })
  servicesId?: string[];
}
