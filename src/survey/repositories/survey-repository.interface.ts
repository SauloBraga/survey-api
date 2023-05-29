import { FilterDTO } from 'src/shared/dtos/filter.dto';
import { Survey } from '../entities/survey.entity';

export interface ISurveyRepository {
  save(survey: Partial<Survey>): Promise<Survey>;
  find(filter: FilterDTO): Promise<{ surveys: Survey[]; total: number }>;
  remove(id: string): Promise<void>;
  findById(surveyId: string): Promise<Survey | null>;
  update(surveyId: string, updatedSurvey: Partial<Survey>): Promise<void>;
}
