import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { getModelToken } from '@nestjs/mongoose';
import { Todo } from './schema/todo.schema';
import { Model } from 'mongoose';

describe('TodoService', () => {
  let service: TodoService;
  let model: Model<Todo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getModelToken(Todo.name),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
    model = module.get<Model<Todo>>(getModelToken(Todo.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a todo', async () => {
    const createTodoDto = { title: 'Test Todo' };
    await service.create(createTodoDto);
    expect(model.create).toHaveBeenCalledWith(createTodoDto);
  });
});
