import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokerModule } from './poker/poker.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [PokerModule, SocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
