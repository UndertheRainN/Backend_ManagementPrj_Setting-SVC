import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { ACCESS, Roles } from '../entities/role.entity';

@InputType('RoleMenuInput')
class MenuInput {
  @Field(() => String, { description: ' menu' })
  menuId: string;
  @Field(() => [String], { description: 'Danh sách quyền' })
  access: ACCESS[];
}

@InputType()
export class CreateRoleInput extends OmitType(PartialType(Roles, InputType), [
  '_id',
  'createdAt',
  'updatedAt',
  'menus',
] as const) {
  @Field(() => [MenuInput], { description: 'Danh sách menu' })
  menus: MenuInput[];
}
