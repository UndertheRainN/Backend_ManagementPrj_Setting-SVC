import { Type } from '@nestjs/common';
import { Field, InputType } from '@nestjs/graphql';

export interface IFilterType<T> {
  search?: T;
  pageSize?: number;
  pageNumber?: number;
}

export function FilterInput<T>(classRef: Type<T>): Type<IFilterType<T>> {
  @InputType({ isAbstract: true })
  abstract class FilterInputType implements IFilterType<T> {
    @Field((type) => classRef, { nullable: true })
    search?: T;
    @Field({
      nullable: true,
      defaultValue: 1,
      description: 'Mặc định là 1 với trang đầu tiên',
    })
    pageNumber?: number;
    @Field({ nullable: true, defaultValue: 10 })
    pageSize?: number;
  }
  return FilterInputType as Type<IFilterType<T>>;
}
