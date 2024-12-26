import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

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
export class AudioGateway {
  @WebSocketServer()
  server!: Server;

  // 누군가가 offer(전화 시도) 보냈을 때
  @SubscribeMessage('callUser')
  handleCallUser(
    @MessageBody() data: { to: string; offer: RTCSessionDescriptionInit },
    @ConnectedSocket() client: Socket,
  ) {
    this.server.to(data.to).emit('callMade', {
      offer: data.offer,
      socket: client.id,
    });
  }

  // 전화를 수락하면서 answer를 보냄
  @SubscribeMessage('makeAnswer')
  handleMakeAnswer(
    @MessageBody() data: { to: string; answer: RTCSessionDescriptionInit },
  ) {
    this.server.to(data.to).emit('answerMade', {
      answer: data.answer,
    });
  }

  // ICE Candidate 교환
  @SubscribeMessage('iceCandidate')
  handleICECandidate(
    @MessageBody() data: { to: string; candidate: RTCIceCandidate },
  ) {
    this.server.to(data.to).emit('iceCandidate', {
      candidate: data.candidate,
    });
  }

  // 연결 종료 (선택 구현)
  @SubscribeMessage('hangUp')
  handleHangUp(@MessageBody() data: { to: string }) {
    this.server.to(data.to).emit('hangUp');
  }
} 