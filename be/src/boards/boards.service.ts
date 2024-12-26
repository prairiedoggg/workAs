import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
  private boards = new Map<string, any>();

  // 보드 생성
  create(name: string) {
    const id = `${Date.now()}`;
    this.boards.set(id, { id, name, elements: [] });
    return this.boards.get(id);
  }

  // 특정 보드 조회
  findOne(id: string) {
    return this.boards.get(id);
  }

  // 보드에 요소 추가
  addElement(boardId: string, element: any) {
    const board = this.boards.get(boardId);
    if (board) {
      board.elements.push(element);
      return board;
    }
    return null;
  }
} 