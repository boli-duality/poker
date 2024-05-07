import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { CreateSocketDto } from './dto/create-socket.dto';
import { Socket } from 'net';

@WebSocketGateway({ cors: true, transports: ['websocket'] })
export class SocketGateway {
  constructor(private readonly socketService: SocketService) {}

  @SubscribeMessage('createSocket')
  create(
    @MessageBody() createSocketDto: CreateSocketDto,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('createSocketDto', createSocketDto);
    setTimeout(() => client.emit('play', '小丑牌，启动！'), 3000);
    return this.socketService.create(createSocketDto);
  }
}
