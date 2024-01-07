import {
    Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity('currency')
export class Currency {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'string', })
  currency: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn({ nullable: true, select: false })
  updatedAt?: Date;

  @DeleteDateColumn({ nullable: true, select: false })
  deletedAt?: Date;
}
