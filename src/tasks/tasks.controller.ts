import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';

@Controller('/tasks')
export class TasksController {
  constructor(private readonly service: TasksService) {}

  @Get()
  getTasks(): Promise<Task[]> {
    return this.service.findAll();
  }

  @Post()
  addTask(@Body() dto: Task): Promise<Task> {
    return this.service.create(dto);
  }

  @Put(':id')
  updateTask(@Param('id') id: string, @Body() dto: Task): Promise<void> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }
}
