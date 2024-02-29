import { IsString } from 'class-validator';
import { ParentEntity } from 'src/share/database/entities';
import { Transform } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import { Status } from 'src/share/common/enums/status.enums';

@Entity('section')
export class Section extends ParentEntity {
  @Column({ unique: true, nullable: false })
  @IsString()
  @Transform(({ value }) => value.trim())
  name: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PUBLIC, // You can set a default value if needed
  })
  status: Status;
}
