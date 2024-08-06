import { Service } from '../entities/service.entity';
import { CreateServiceInput } from './create-service.input';
import { InputType, Field, Int, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateServiceInput extends OmitType(
  PartialType(Service, InputType),
  ['createdAt', 'updatedAt'] as const,
) {}
