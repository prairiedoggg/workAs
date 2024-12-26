import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: [
      'http://localhost:3001', // 프론트엔드 주소
      'http://192.168.50.185:3001' // 추가적인 주소
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
})
export class BoardsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  handleConnection(client: any) {
    console.log('클라이언트 연결됨:', client.id);
  }

  handleDisconnect(client: any) {
    console.log('클라이언트 해제:', client.id);
  }

  @SubscribeMessage('draw')
  async handleDraw(@MessageBody() data: any) {
    this.server.emit('drawBroadcast', data);
  }
} 