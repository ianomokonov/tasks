import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(createDto: CreateTaskDto): Promise<Task> {
    const createdCat = new this.taskModel(createDto);
    return createdCat.save();
  }

  async update(id: string, updateDto: UpdateTaskDto): Promise<void> {
    await this.taskModel.findByIdAndUpdate(id, { ...updateDto });
  }

  async delete(id: string): Promise<void> {
    await this.taskModel.findByIdAndDelete(id);
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }
}
