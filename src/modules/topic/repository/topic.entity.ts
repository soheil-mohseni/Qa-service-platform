import { IsString } from 'class-validator';
import { ParentEntity } from 'src/share/database/entities';
import { Transform } from 'class-transformer';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Section } from 'src/modules/section/repository/section.entity';
import { Question } from 'src/modules/qa/repository/question.entity';

@Entity('topic')
export class Topic extends ParentEntity {
  @Column({ unique: true, nullable: false })
  @IsString()
  @Transform(({ value }) => value.trim())
  name: string;

  @ManyToOne(() => Section, (section) => section.name)
  section: Section;

  @OneToMany(() => Question, (question) => question.topic)
  question: Question[];
}
