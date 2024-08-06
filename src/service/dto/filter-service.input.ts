import { Field, InputType, PickType } from '@nestjs/graphql';
import { UpdateServiceInput } from './update-service.input';
import { FilterInput } from 'src/common/filter.input';
@InputType()
export class FilterService {
  @Field({ nullable: true })
  code?: string;
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  status?: string;
}

@InputType()
export class FilterServiceInput extends FilterInput(FilterService) {}
