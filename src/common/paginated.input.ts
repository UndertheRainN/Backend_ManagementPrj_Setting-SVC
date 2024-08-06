import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export interface IPaginatedType<T> {
  nodes: T[];
  totalCount: number;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType(`${classRef.name}Edge`)
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    // @Field((type) => [EdgeType], { nullable: true })
    // edges: EdgeType[];

    @Field((type) => [classRef], { nullable: true })
    nodes: T[];
    @Field((type) => Int)
    totalCount: number;
  }
  return PaginatedType as Type<IPaginatedType<T>>;
}
