import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Tables } from '@/modules/table/schemas/table.schema';
import { ModelNotFoundException } from '@/modules/_global/exceptions/model.not.found.exception';
import { PaginatedResponse } from '@/modules/_global/responses/pagination';
import {RequiredEntityData, FindOptions, FilterQuery} from '@mikro-orm/core';

@Injectable()
export class TableRepository {
  constructor(private readonly table: EntityManager) {}

  public async paginate(
    where: FilterQuery<Tables>,
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResponse<Tables>> {
    const [rows, count] = await this.table.findAndCount(Tables, where, {
      limit,
      offset: (page - 1) * limit,
    });
    const lastPage = Math.ceil(count / limit);

    return {
      data: rows,
      meta: {
        total: count,
        page,
        lastPage,
        limit,
      },
    };
  }

  public async lists(where: FilterQuery<Tables>, options: FindOptions<Tables>): Promise<Tables[]> {
    return await this.table.find(Tables, where, options);
  }

  public async find(where: FilterQuery<Tables>): Promise<Tables | null> {
    return this.table.findOne(Tables, where);
  }

  public async findOrFail(where: FilterQuery<Tables>): Promise<Tables> {
    const table = await this.find(where);
    if (!table) {
      throw new ModelNotFoundException('Table not found', JSON.stringify(where));
    }
    return table;
  }

  public async create(data: RequiredEntityData<Tables>): Promise<Tables> {
    const table = this.table.create(Tables, data);
    await this.table.persistAndFlush(table);
    return table;
  }

  public async update(where: FilterQuery<Tables>, data: Partial<Tables>): Promise<Tables> {
    const table = await this.findOrFail(where);
    this.table.assign(table, data);
    await this.table.persistAndFlush(table);
    return table;
  }

  public async delete(id: string): Promise<void> {
    const table = await this.findOrFail({ id });
    await this.table.removeAndFlush(table);
  }

  public async softDelete(id: string): Promise<void> {
    const table = await this.findOrFail({ id });
    await table.softDelete();
  }
}