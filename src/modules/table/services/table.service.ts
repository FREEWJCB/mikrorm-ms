import { Injectable } from '@nestjs/common';
import { Tables } from '@/modules/table/schemas/table.schema';
import { TableRepository } from '@/modules/table/repositories/table.repository';
import { TableListDto } from '@/modules/table/dtos/table.lists.dto';
import { PaginatedResponse } from '@/modules/_global/responses/pagination';
import {RequiredEntityData} from '@mikro-orm/core';

@Injectable()
export class TableService {
  constructor(private tableRepository: TableRepository) {}

  public async paginate(
    query: TableListDto,
  ): Promise<PaginatedResponse<Tables>> {
    return this.tableRepository.paginate(
      query.toQuery(),
      query.paginate?.page ?? 1,
      query.limit ?? 10,
    );
  }

  public async lists(query: TableListDto): Promise<Tables[]> {
    return this.tableRepository.lists(query.toQuery(), query.toQueryOptions());
  }

  public async create(body: RequiredEntityData<Tables>): Promise<Tables> {
    console.log('body', JSON.stringify(body));
    return this.tableRepository.create(body);
  }

  public async update(
    id: string,
    body: Partial<Tables>,
  ): Promise<Tables> {
    return this.tableRepository.update({ id }, body);
  }

  public async read(id: string): Promise<Tables> {
    return this.tableRepository.findOrFail({ id });
  }

  public async delete(id: string, force: boolean = false): Promise<void> {
    if (force) {
      return this.tableRepository.delete(id);
    }
    return this.tableRepository.softDelete(id);
  }
}
