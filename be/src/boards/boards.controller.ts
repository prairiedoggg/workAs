import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  // 특정 보드 조회
  @Get(':id')
  async getBoard(@Param('id') id: string) {
    return this.boardsService.findOne(id);
  }

  // 보드 생성
  @Post()
  async createBoard(@Query('name') name: string) {
    return this.boardsService.create(name);
  }

  // 보드에 요소 추가
  @Post(':id/elements')
  async addElement(@Param('id') boardId: string, @Body() elementData: any) {
    return this.boardsService.addElement(boardId, elementData);
  }
}