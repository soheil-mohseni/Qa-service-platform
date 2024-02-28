import { IsString } from 'class-validator';
import { IsPassword } from 'src/share/common/decorators';
import { ParentEntity } from 'src/share/database/entities';
import { Transform } from 'class-transformer';
import { Column, Entity } from 'typeorm';

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
}
