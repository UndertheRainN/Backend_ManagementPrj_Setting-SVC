import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MenuModule } from './menu/menu.module';
import { ServiceModule } from './service/service.module';
import { RoleModule } from './role/role.module';

import { MongooseModule } from '@nestjs/mongoose';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloFederationDriverConfig>({
      inject: [ConfigService],
      driver: ApolloFederationDriver,
      useFactory: (config: ConfigService) => ({
        path: 'settings',
        autoSchemaFile: { federation: 2 },
        definitions: {
          path: join(process.cwd(), 'src/graphql.ts'),
          outputAs: 'interface',
        },
      }),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    AuthModule,
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => ({
    //     type: 'mysql',
    //     host: config.get<string>('DB_HOST'),
    //     port: config.get<number>('DB_PORT'),
    //     username: config.get<string>('DB_USERNAME'),
    //     password: config.get<string>('DB_PASSWORD'),
    //     database: config.get<string>('DB_SCHEMA'),
    //     entities: [Service, Menu],
    //     synchronize: true,
    //     cache: true,
    //   }),
    // }),
    MenuModule,
    ServiceModule,
    RoleModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: `${config.get<string>('MONGO_URL')}/${config.get<string>('MONGO_SCHEMA')}`,
        ignoreUndefined: true, // add this to the option
        connectionFactory: (connection) => {
          connection.plugin(require('mongoose-autopopulate'));
          return connection;
        },
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
