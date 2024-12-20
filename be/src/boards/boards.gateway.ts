import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { BoardsService } from './boards.service';

@WebSocketGateway()
export class BoardsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly boardsService: BoardsService) {}

  handleConnection(client: any) {
    console.log('클라이언트 연결됨:', client.id);
  }

  handleDisconnect(client: any) {
    console.log('클라이언트 해제:', client.id);
  }

  @SubscribeMessage('draw')
  async handleDraw(@MessageBody() data: any) {
    // DB 저장 로직(필요 시):
    // await this.boardsService.addElement(boardId, data);

    // 받은 데이터 전체 클라이언트에게 방송
    this.server.emit('drawBroadcast', data);
  }
} 