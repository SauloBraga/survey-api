import { Question } from '../entities/question.entity';

export interface IQuestionRepository {
  save(question: Partial<Question>): Promise<Question>;
  update(question: Partial<Question>): Promise<void>;
}
