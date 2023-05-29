import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Survey } from './survey.entity';
import { User } from 'src/user/entities/user.entity';

@Entity('users_surveys')
export class Respondent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Survey, { cascade: true, onDelete: 'CASCADE' })
  survey: Survey;

  @CreateDateColumn()
  createdAt: Date;
}
