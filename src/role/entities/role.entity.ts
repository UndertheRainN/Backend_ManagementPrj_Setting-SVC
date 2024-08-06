import { ObjectType, InputType, Field, Directive } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Paginated } from 'src/common/paginated.input';
import { BaseEntity } from 'src/entites/base.entity';
import { Menu } from 'src/menu/entities/menu.entity';

export enum ACCESS {
  'CREATE' = 'CREATE',
  'UPDATE' = 'UPDATE',
  'DELETE' = 'DELETE',
  'QUERY' = 'QUERY',
}

@ObjectType('RoleMenu')
// @InputType('RoleMenuObject')
class RoleMenu {
  @Field(() => Menu, { description: ' menu' })
  menuId: Menu[];
  @Field(() => [String], { description: 'Danh sách quyền' })
  access: ACCESS[];
}

@ObjectType('Roles')
// @InputType('RoleInput')
@Directive('@key(fields: "code")')
@Schema({ timestamps: true, _id: true, autoIndex: true })
export class Roles extends BaseEntity {
  @Field(() => [RoleMenu])
  @Prop([
    raw({
      menuId: { type: mongoose.Types.ObjectId, ref: 'Menu' },
      access: { type: [String] },
    }),
  ])
  menus: RoleMenu[];
}
export type RoleDocument = HydratedDocument<Roles>;
export const RoleSchema = SchemaFactory.createForClass(Roles);
@ObjectType()
export class PaginatedRole extends Paginated(Roles) {}
