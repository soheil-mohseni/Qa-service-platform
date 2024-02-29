import { IsString } from 'class-validator';
import { IsPassword } from 'src/share/common/decorators';
import { ParentEntity } from 'src/share/database/entities';
import { Transform } from 'class-transformer';
import { BeforeInsert, Column, Entity, ManyToOne } from 'typeorm';
import { encryptString } from 'src/share/common/utils';
import { Group } from './group.entity';

@Entity('user')
export class User extends ParentEntity {
  @Column({ unique: true, nullable: false })
  @IsString()
  @Transform(({ value }) => value.trim())
  username: string;

  @Column({ unique: false, nullable: false })
  @IsString()
  @IsPassword()
  @Transform(({ value }) => value.trim())
  password: string;
  
  @ManyToOne(() => Group, group => group.name)
  group: Group;

}
