import { IsNumber, IsString } from 'class-validator';
import { ParentEntity } from 'src/share/database/entities';
import { Transform } from 'class-transformer';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Section } from 'src/modules/section/repository/section.entity';
import { Topic } from 'src/modules/topic/repository/topic.entity';
import { Answer } from './asnwer.entity';
import { Status } from 'src/share/common/enums/status.enums';

@Entity('question')
export class Question extends ParentEntity {
  @Column({ unique: true, nullable: false })
  @IsString()
  @Transform(({ value }) => value.trim())
  title: string;

  @Column({ nullable: true })
  @IsNumber()
  view: number;

  @Column({ nullable: true })
  @IsNumber()
  like: number;

  @Column({ nullable: true })
  @IsNumber()
  dislike: number;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PUBLIC, // You can set a default value if needed
  })
  status: Status;

  @ManyToOne(() => Topic, (topic) => topic.question)
  topic: Topic;

  @OneToMany(() => Answer, (answer) => answer.question)
  answer: Answer[];
}
