import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new IoAdapter(app));
  
  // CORS 설정 추가ßß
  app.enableCors({
    origin: [
      'http://localhost:3001', // 프론트엔드 주소
      'http://192.168.50.185:3001' // 추가적인 주소
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  await app.listen(3000, '0.0.0.0'); // 모든 IP에서 접근 가능하도록 설정
  console.log('NestJS 서버가 3000 포트에서 실행 중...');
}
bootstrap();
