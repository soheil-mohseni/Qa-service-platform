import { IsNumber, IsString } from 'class-validator';
import { ParentEntity } from 'src/share/database/entities';
import { Transform } from 'class-transformer';
import {  Column, Entity, ManyToOne } from 'typeorm';
import { Section } from 'src/modules/section/repository/section.entity';
import { Topic } from 'src/modules/topic/repository/topic.entity';
import { Question } from './question.entity';

@Entity('answer')
export class Answer extends ParentEntity {
  @Column({ unique: true, nullable: false })
  @IsString()
  @Transform(({ value }) => value.trim())
  value: string;


  @Column({nullable: true ,default: 0})
  @IsNumber()
  like: number;

  @Column({nullable: true,default: 0 })
  @IsNumber()
  dislike: number;


  @ManyToOne(() => Question, question => question.answer)
  question: Question;



}
