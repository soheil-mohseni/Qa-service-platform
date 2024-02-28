import { IsString } from 'class-validator';
import { IsPassword } from 'src/share/common/decorators';
import { ParentEntity } from 'src/share/database/entities';
import { Transform } from 'class-transformer';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { encryptString } from 'src/share/common/utils';

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
  
  @BeforeInsert()
  private async hashPassword(password?: string): Promise<string | void> {
    const targetPassword = password || this.password;
    const hashedString = await encryptString(targetPassword);
    this.password = hashedString;
  }
}
