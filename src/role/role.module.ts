import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleResolver } from './role.resolver';
import { Roles, RoleSchema } from './entities/role.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Role]),
    MongooseModule.forFeatureAsync([
      {
        name: Roles.name,
        useFactory: () => {
          const schema = RoleSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
  ],
  providers: [RoleResolver, RoleService],
})
export class RoleModule {}
