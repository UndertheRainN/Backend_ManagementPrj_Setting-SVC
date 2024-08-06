import { Menu } from '../entities/menu.entity';
import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMenuInput extends OmitType(PartialType(Menu, InputType), [
  'createdAt',
  'updatedAt',
  'services',
] as const) {
  @Field(() => [String], { nullable: true })
  services: string[];
}
