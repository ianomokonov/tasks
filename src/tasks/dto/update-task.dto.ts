export interface UpdateTaskDto {
  name: string;
  description: string;
  tags: string[];
  complete_date?: Date;
}
