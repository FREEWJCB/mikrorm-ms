import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import {TableModule} from './modules/table/table.module';
import {Tables} from './modules/table/schemas/table.schema';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      host: '192.168.0.8',
      port: 5432,
      user: 'admin',
      password: 'local123',
      dbName: 'nb_hub_local',
      driver: PostgreSqlDriver,
      entities: [Tables], // Ajusta la ruta según tu estructura de proyecto
      // entitiesTs: ['./src/entities'], // Ajusta la ruta según tu estructura de proyecto
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TableModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}