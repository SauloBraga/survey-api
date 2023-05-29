import { Survey } from 'src/survey/entities/survey.entity';
import { ISurveyRepository } from '../survey-repository.interface';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { FilterDTO } from 'src/shared/dtos/filter.dto';

export class SurveyRepository implements ISurveyRepository {
  private repo: Repository<Survey>;
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Survey);
  }
  async findById(surveyId: string): Promise<Survey> {
    return this.repo
      .createQueryBuilder('surveys')
      .leftJoinAndSelect('surveys.createdBy', 'createdBy')
      .leftJoinAndSelect('surveys.questions', 'questions')
      .leftJoinAndSelect('surveys.respondent', 'respondent')
      .where('surveys.id = :id', { id: surveyId })
      .getOne();
  }
  async update(
    surveyId: string,
    updatedSurvey: Partial<Survey>,
  ): Promise<void> {
    await this.repo.save({ ...updatedSurvey, id: surveyId });
  }
  async remove(id: string): Promise<void> {
    await this.repo.delete({ id });
  }
  async find(filter: FilterDTO): Promise<{ surveys: Survey[]; total: number }> {
    const [surveys, total] = await this.repo.findAndCount({
      relations: { questions: true, createdBy: true },
      skip: filter.skip,
      take: filter.take,
    });

    return { surveys, total };
  }

  async save(survey: Partial<Survey>): Promise<Survey> {
    return this.repo.save(survey);
  }
}
