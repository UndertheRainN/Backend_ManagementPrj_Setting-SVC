import { ObjectType, InputType } from '@nestjs/graphql';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Paginated } from 'src/common/paginated.input';
import { BaseEntity } from 'src/entites/base.entity';
@ObjectType('Service')
@InputType('ServiceInput')
@Schema({ timestamps: true, _id: true, autoIndex: true, minimize: false })
export class Service extends BaseEntity {}
export type ServiceDocument = HydratedDocument<Service>;
export const ServiceSchema = SchemaFactory.createForClass(Service);
@ObjectType()
export class PaginatedService extends Paginated(Service) {}
