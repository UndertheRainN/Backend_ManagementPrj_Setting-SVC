import { InputType, PickType } from '@nestjs/graphql';
import { UpdateMenuInput } from './update-menu.input';

@InputType()
export class FilterMenuInput extends PickType(UpdateMenuInput, [
  'code',
  'name',
  'status',
] as const) {}
