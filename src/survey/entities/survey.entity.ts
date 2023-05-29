import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from './question.entity';
import { User } from 'src/user/entities/user.entity';
import { Respondent } from './respondent.entity';

@Entity('surveys')
export class Survey {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  createdBy: User;
  @OneToMany(() => Respondent, (respondent) => respondent.user, {
    cascade: true,
  })
  respondent: Respondent[];
  @OneToMany(() => Question, (question) => question.survey, { cascade: true })
  questions: Question[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
