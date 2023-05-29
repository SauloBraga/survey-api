export class AnswerSurveyRequestDTO {
  answers: {
    questionId: string;
    description: string;
  }[];
}
