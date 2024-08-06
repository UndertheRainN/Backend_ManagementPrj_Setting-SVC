import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Service } from '../entities/service.entity';

@InputType()
export class CreateServiceInput extends OmitType(
  PartialType(Service, InputType),
  ['_id', 'createdAt', 'updatedAt'] as const,
) {}
