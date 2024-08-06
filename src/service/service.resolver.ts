import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveReference,
} from '@nestjs/graphql';
import { ServiceService } from './service.service';
import { PaginatedService, Service } from './entities/service.entity';
import { CreateServiceInput } from './dto/create-service.input';
import { UpdateServiceInput } from './dto/update-service.input';
import { FilterServiceInput } from './dto/filter-service.input';

@Resolver(() => Service)
export class ServiceResolver {
  constructor(private readonly serviceService: ServiceService) {}

  @Mutation(() => Service)
  createService(
    @Args('createServiceInput') createServiceInput: CreateServiceInput,
  ) {
    return this.serviceService.create(createServiceInput);
  }

  @Query(() => PaginatedService, { name: 'listServices' })
  findAll(
    @Args('filterServiceInput') filterServiceInput: FilterServiceInput,
  ): Promise<PaginatedService> {
    return this.serviceService.findAll(filterServiceInput);
  }

  @Query(() => Service, { name: 'service' })
  findOne(@Args('_id', { type: () => String }) _id: string) {
    return this.serviceService.findOne(_id);
  }

  @Mutation(() => Service, { name: 'updateService' })
  updateService(
    @Args('updateServiceInput') updateServiceInput: UpdateServiceInput,
  ) {
    return this.serviceService.update(
      updateServiceInput._id,
      updateServiceInput,
    );
  }

  @Mutation(() => Service, { name: 'removeService' })
  removeService(@Args('id', { type: () => String }) id: string) {
    return this.serviceService.remove(id);
  }
}
