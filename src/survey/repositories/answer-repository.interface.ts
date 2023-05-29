import { FilterDTO } from 'src/shared/dtos/filter.dto';
import { Answer } from '../entities/answer.entity';

export interface IAnswerRepository {
  save(answer: Partial<Answer>): Promise<void>;
  listAnswersBySurveyAndUser(
    userId: string,
    surveyId: string,
    filter: FilterDTO,
  ): Promise<{ answers: Answer[]; total: number }>;
  findAnswerByIdAndSurveyAndUser(
    answerId: string,
    surveyId: string,
    userId: string,
  ): Promise<Answer>;
  remove(answerId: string): Promise<void>;
}
