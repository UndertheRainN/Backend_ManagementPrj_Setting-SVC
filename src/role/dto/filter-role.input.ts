import { Field, InputType, PickType } from '@nestjs/graphql';
import { UpdateRoleInput } from './update-role.input';
import { FilterInput } from 'src/common/filter.input';
@InputType()
export class FilterRole {
  @Field({ nullable: true })
  code?: string;
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  status?: string;
}

@InputType()
export class FilterRoleInput extends FilterInput(FilterRole) {}
