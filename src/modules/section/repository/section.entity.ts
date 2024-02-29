import { IsString } from 'class-validator';
import { ParentEntity } from 'src/share/database/entities';
import { Transform } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';
import { Status } from 'src/share/common/enums/status.enums';
import { Topic } from 'src/modules/topic/repository/topic.entity';

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


  @OneToMany(() => Topic, topic => topic.section)
  topic: Topic[];
}
