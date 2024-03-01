import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessages } from 'src/share/common/constants/errors.constant';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseRepository } from './base.repository';

interface HasId {
  id: string;
}

export class PostgresRepository<
  Entity extends HasId,
> extends BaseRepository<Entity> {
  constructor(private repository: Repository<Entity>) {
    super();
  }

  public async save(data: DeepPartial<Entity>): Promise<Entity> {
    return await this.repository.save(data);
  }

  public async saveMany(data: DeepPartial<Entity>[]): Promise<Entity[]> {
    return await this.repository.save(data);
  }

  public create(data: DeepPartial<Entity>): Entity {
    return this.repository.create(data);
  }

  public createMany(data: DeepPartial<Entity>[]): Entity[] {
    return this.repository.create(data);
  }

  public async findOneById(
    id: any,
    options?: FindOneOptions<Entity>,
  ): Promise<Entity> {
    return await this.repository.findOne({ where: { id }, ...options });
  }

  public async findByCondition(
    filterCondition: FindOneOptions<Entity>,
  ): Promise<Entity> {
    return await this.repository.findOne(filterCondition);
  }

  public async findWithRelations(
    relations: FindManyOptions<Entity>,
  ): Promise<Entity[]> {
    return await this.repository.find(relations);
  }

  public async findAll(options?: FindManyOptions): Promise<Entity[]> {
    return await this.repository.find(options);
  }

  public async delete(id: string): Promise<{ affected: number }> {
    const result = await this.repository.delete(id);
    return { affected: result.affected };
  }

  public async deleteByfield(
    field: string,
    value: any,
  ): Promise<{ affected: number }> {
    const data = await this.findOne(field, value);
    console.log(field, value, data);
    if (data) {
      const result = await this.repository.delete(data.id);
      return { affected: result.affected };
    } else {
      throw new HttpException(
        ErrorMessages.USER_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async softDelete(id: string): Promise<{ affected: number }> {
    const result = await this.repository.softDelete(id);
    return { affected: result.affected };
  }

  public async findOne(
    column: string,
    value: string | number,
    relations?: string[],
  ): Promise<Entity> {
    const whereOptions: FindOptionsWhere<Entity> = {};
    whereOptions[column] = value;
    return await this.repository.findOne({
      where: whereOptions,
      relations,
    });
  }

  public async update(
    id: string,
    data: QueryDeepPartialEntity<Entity>,
  ): Promise<{ affected: number }> {
    const result = await this.repository.update(id, data);
    return { affected: result.affected };
  }

  public async updateByfield(
    column: string,
    value: any,
    data: QueryDeepPartialEntity<Entity>,
  ): Promise<{ affected: number }> {

    const user = await this.findOne(column, value);
    if (user) {
      const result = await this.repository.update(user.id, data);
      return { affected: result.affected };
    } else {
      throw new HttpException(
        ErrorMessages.USER_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
