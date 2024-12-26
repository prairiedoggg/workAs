import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AudioGateway } from './gateways/audio.gateway';
import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://tmdqja:ytD8z0y72v3Tmlki@cluster0.glzlc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    BoardsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AudioGateway],
})
export class AppModule {}
