import { Entity, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { ModelBase, ModelBaseInterface } from '@modules/_global/schemas/model.schema';

export interface TableInterface extends ModelBaseInterface {
  name: string;
  active: boolean;
}

@Entity({ tableName: 'tables' })
export class Tables extends ModelBase implements TableInterface {
  @ApiProperty({
    description: 'The table name',
    type: 'string',
    example: 'Plass',
  })
  @Property({ type: 'string', nullable: false })
  name!: string;

  @ApiProperty({
    description: 'The table active',
    type: 'boolean',
    example: true,
  })
  @Property({ type: 'boolean', default: false })
  active!: boolean;
}