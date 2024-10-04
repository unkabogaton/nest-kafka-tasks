import { Injectable, NotFoundException } from '@nestjs/common';
import { generateMockTasks } from './mocks/tasks.mocks';
import { CreateTaskDto, Task } from './interfaces/task';

@Injectable()
export class AppService {
  private tasks: Task[] = [];

  constructor() {
    this.tasks = generateMockTasks(20);
  }

  getAllTasks() {
    return this.tasks;
  }

  getTasksPerUser(userId: number) {
    return this.tasks.filter((task) => task.userId === +userId);
  }

  getOneTask(id: number) {
    const matchedTask = this.tasks.find((task) => task.id === +id);
    if (!matchedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return matchedTask;
  }

  createTask(createTaskDto: CreateTaskDto) {
    const newTask = {
      ...createTaskDto,
      id: Math.floor(Math.random() * 10000),
    };
    this.tasks.push(newTask);

    return {
      message: `Task was sucessfully added`,
    };
  }

  updateTask(id: number, updateTaskDto: CreateTaskDto) {
    const taskIndex = this.tasks.findIndex((task) => task.id === +id);
    console.log(id);

    if (taskIndex === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const updatedtask = {
      ...this.tasks[taskIndex],
      ...updateTaskDto,
    };

    this.tasks[taskIndex] = updatedtask;

    return {
      message: 'Task was successfully updated',
    };
  }

  deleteTask(id: number) {
    const taskIndex = this.tasks.findIndex((task) => task.id === +id);

    if (taskIndex === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    this.tasks.splice(taskIndex, 1);

    return {
      message: 'Task was sucessfully deleted',
    };
  }
}
