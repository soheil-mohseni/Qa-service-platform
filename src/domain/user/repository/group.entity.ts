import { IsString } from 'class-validator';
import { ParentEntity } from 'src/share/database/entities';
import { Transform } from 'class-transformer';
import {  Column, Entity, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity('group')
export class Group extends ParentEntity {
  @Column({ unique: true, nullable: false })
  @IsString()
  @Transform(({ value }) => value.trim())
  name: string;

  @OneToMany(() => User, user => user.group)
  users: User[];
}
