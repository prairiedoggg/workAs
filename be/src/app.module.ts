import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AudioGateway } from './gateways/audio.gateway';
import { BoardsModule } from './boards/boards.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'production' ? '.env' : '.env.dev',
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.glzlc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    ),
    BoardsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AudioGateway],
})
export class AppModule {}
