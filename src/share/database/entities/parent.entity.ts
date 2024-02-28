import {
    BaseEntity,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  export class ParentEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn({ nullable: true,})
    updatedAt?: Date;
  
    @DeleteDateColumn({ nullable: true, })
    deletedAt?: Date;
  }