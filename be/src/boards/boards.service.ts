import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Board } from './schemas/board.schema';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name) private readonly boardModel: Model<Board>,
  ) {}

  async findOne(boardId: string): Promise<Board> {
    const board = await this.boardModel.findById(boardId).exec();
    if (!board) {
      throw new NotFoundException('Board not found');
    }
    return board;
  }

  async create(name: string): Promise<Board> {
    const newBoard = new this.boardModel({ name, elements: [] });
    return newBoard.save();
  }

  async addElement(boardId: string, elementData: any) {
    const board = await this.findOne(boardId);
    const elementId = String(Date.now());
    const newElement = {
      id: elementId,
      ...elementData,
    };
    board.elements.push(newElement);
    return board.save();
  }
} 