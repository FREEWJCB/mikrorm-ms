import { Module } from '@nestjs/common';
import { TableController } from '@/modules/table/controllers/table.controller';
import { TableService } from '@/modules/table/services/table.service';
import { TableRepository } from '@/modules/table/repositories/table.repository';
import { Tables } from './schemas/table.schema';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature([Tables])],
  controllers: [TableController],
  providers: [TableService, TableRepository],
  exports: [TableService],
})
export class TableModule {}
