import { InputType, PartialType, OmitType, Field } from '@nestjs/graphql';
import { ACCESS, Roles } from '../entities/role.entity';

@InputType('RoleMenuObject')
class RoleMenu {
  @Field(() => [String], { description: ' menu' })
  menuId: string[];
  @Field(() => [String], { description: 'Danh sách quyền' })
  access: ACCESS[];
}

@InputType()
export class UpdateRoleInput extends OmitType(PartialType(Roles, InputType), [
  'createdAt',
  'updatedAt',
  'menus',
] as const) {
  @Field(() => [RoleMenu], { nullable: true })
  menus?: RoleMenu[];
}
