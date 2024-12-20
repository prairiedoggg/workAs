import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get(':id')
  async getBoard(@Param('id') id: string) {
    return this.boardsService.findOne(id);
  }

  @Post()
  async createBoard(@Query('name') name: string) {
    return this.boardsService.create(name);
  }

  @Post(':id/elements')
  async addElement(@Param('id') boardId: string, @Body() elementData: any) {
    return this.boardsService.addElement(boardId, elementData);
  }
} 