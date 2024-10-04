export interface CreateTaskDto {
  userId: number;
  title: string;
  notes: string;
}

export interface Task extends CreateTaskDto {
  id: number;
}
