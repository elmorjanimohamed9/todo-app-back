import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './schema/todo.schema';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<Todo>,
  ) {}

  create(createTodoDto: CreateTodoDto) {
    return this.todoModel.create(createTodoDto);
  }

  findAll() {
    return this.todoModel.find();
  }

  findOne(id: string) {
    return this.todoModel.findById(id);
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.todoModel.findByIdAndUpdate(id, updateTodoDto, { new: true });
  }

  remove(id: string) {
    return this.todoModel.findByIdAndDelete(id);
  }
}
