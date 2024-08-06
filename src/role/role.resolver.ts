import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveReference,
} from '@nestjs/graphql';
import { RoleService } from './role.service';
import { PaginatedRole, Roles } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { FilterRoleInput } from './dto/filter-role.input';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Roles)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation(() => Roles, { name: 'createRole' })
  @UseGuards(GqlAuthGuard)
  createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    return this.roleService.create(createRoleInput);
  }

  @Query(() => PaginatedRole, { name: 'listRole' })
  @UseGuards(GqlAuthGuard)
  findAll(
    @Args('filterRoleInput') filterRoleInput: FilterRoleInput,
  ): Promise<PaginatedRole> {
    return this.roleService.findAll(filterRoleInput);
  }

  @Query(() => Roles, { name: 'role' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('_id', { type: () => String }) _id: string) {
    return this.roleService.findOne(_id);
  }

  @Query(() => Roles, { name: 'roleById' })
  @UseGuards(GqlAuthGuard)
  findById(@Args('_id', { type: () => String }) _id: string) {
    return this.roleService.findById(_id);
  }

  @Mutation(() => Roles)
  @UseGuards(GqlAuthGuard)
  updateRole(@Args('updateRoleInput') updateRoleInput: UpdateRoleInput) {
    return this.roleService.update(updateRoleInput._id, updateRoleInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  removeRole(
    @Args('_id', { type: () => String }) _id: string,
  ): Promise<Boolean> {
    return this.roleService.remove(_id);
  }
  @Query(() => Roles)
  findRole(@Args('code', { type: () => String }) code: string) {
    return this.roleService.findOne(code);
  }

  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    code: string;
  }): Promise<Roles> {
    return this.roleService.findOne(reference.code);
  }
}
