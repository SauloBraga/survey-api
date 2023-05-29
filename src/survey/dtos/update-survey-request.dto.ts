export class UpdateSurveyRequestDTO {
  name?: string;
  description?: string;
  questions?: { id: string; description: string }[];
}
