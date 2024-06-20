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
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('/tasks')
export class TasksController {
  constructor(private readonly service: TasksService) {}

  @Get()
  getTasks(): Promise<Task[]> {
    return this.service.findAll();
  }

  @Post()
  addTask(@Body() dto: CreateTaskDto): Promise<Task> {
    return this.service.create(dto);
  }

  @Put(':id')
  updateTask(
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
  ): Promise<void> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }
}
