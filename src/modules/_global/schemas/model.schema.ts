import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

export interface ModelBaseInterface {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | undefined;
}

@Entity()
export class ModelBase implements ModelBaseInterface {
  @ApiProperty({
    description: 'The table ID',
    type: 'string',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryKey()
  id: string = uuidv4();

  @ApiProperty({
    description: 'The creation date',
    type: Date,
    example: '2023-01-01T00:00:00.000Z',
  })
  @Property({ type: 'date', onCreate: () => new Date(), fieldName: 'createdAt' })
  createdAt: Date = new Date();

  @ApiProperty({
    description: 'The update date',
    type: Date,
    example: '2023-01-01T00:00:00.000Z',
  })
  @Property({ type: 'date', onUpdate: () => new Date(), fieldName: 'updatedAt' })
  updatedAt: Date = new Date();

  @ApiPropertyOptional({
    description: 'The deletion date',
    type: Date,
    example: '2023-01-01T00:00:00.000Z',
  })
  @Property({ type: 'date', nullable: true, fieldName: 'deletedAt' })
  deletedAt?: Date | undefined;

  softDelete() {
    this.deletedAt = new Date();
  }
}