import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceResolver } from './service.resolver';
import { Service, ServiceSchema } from './entities/service.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Service])
    MongooseModule.forFeature([{ name: Service.name, schema: ServiceSchema }]),
  ],
  providers: [
    ServiceResolver,
    ServiceService,
    { provide: APP_GUARD, useClass: GqlAuthGuard },
  ],
})
export class ServiceModule {}
