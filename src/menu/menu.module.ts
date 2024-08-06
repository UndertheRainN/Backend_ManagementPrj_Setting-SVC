import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuResolver } from './menu.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu, MenuSchema } from './entities/menu.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
@Module({
  imports: [
    // TypeOrmModule.forFeature([Menu]),
    MongooseModule.forFeatureAsync([
      {
        name: Menu.name,
        useFactory: () => {
          const schema = MenuSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
  ],
  providers: [
    MenuResolver,
    MenuService,
    { provide: APP_GUARD, useClass: GqlAuthGuard },
  ],
})
export class MenuModule {}
