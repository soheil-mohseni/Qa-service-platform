import { DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseRepository<Entity> {
  abstract save(
    data: Partial<Entity> | DeepPartial<Entity>,
  ): Promise<Partial<Entity>>;

  abstract saveMany(data: DeepPartial<Entity>[]): Promise<Entity[]>;

  abstract findOneById(id: any): Promise<Entity>;

  abstract findAll(): Promise<Entity[]>;

  abstract delete(id: string): Promise<{ affected: number }>;

  abstract deleteByfield(
    field: string,
    value: any,
  ): Promise<{ affected: number }>;

  abstract softDelete(id: string): Promise<{ affected: number }>;

  abstract update(id: string, data: any): Promise<{ affected: number }>;
  
  abstract updateByfield(
    column: string,
    value: any,
    data: QueryDeepPartialEntity<Entity>,
  ): Promise<{ affected: number }>;

  abstract findOne(
    column: string,
    data: any,
    relations?: string[],
  ): Promise<Entity>;
}
