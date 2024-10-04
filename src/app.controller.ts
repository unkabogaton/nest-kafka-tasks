import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTaskDto } from './interfaces/task';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('tasks.getAll')
  getAllTasks() {
    return this.appService.getAllTasks();
  }

  @MessagePattern('tasks.getPerUser')
  getTasksPerUser(@Payload() userId: number) {
    return this.appService.getTasksPerUser(userId);
  }

  @MessagePattern('tasks.getOne')
  getOneTask(@Payload() id: number) {
    return this.appService.getOneTask(id);
  }

  @MessagePattern('tasks.create')
  createTask(@Payload() createTaskDto: CreateTaskDto) {
    return this.appService.createTask(createTaskDto);
  }

  @MessagePattern('tasks.update')
  updateTask(@Payload() task: { id: number; updateTaskDto: CreateTaskDto }) {
    const { id, updateTaskDto } = task;
    return this.appService.updateTask(id, updateTaskDto);
  }

  @MessagePattern('tasks.delete')
  deleteTask(@Payload() id: number) {
    return this.appService.deleteTask(id);
  }
}
