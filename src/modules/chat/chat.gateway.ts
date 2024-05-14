import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { ConnectChatDto } from './dto/connect-chat.dto';
import { ChatDto } from './dto/chat.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true, transports: ['websocket'] })
export class ChatGateway {
  @WebSocketServer()
  private readonly server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('connectChat')
  connectChat(
    @MessageBody() connectChatDto: ConnectChatDto,
    @ConnectedSocket() client: Socket,
  ) {
    return this.chatService.connectChat(connectChatDto, client);
  }

  @SubscribeMessage('chat')
  chat(@MessageBody() chatDto: ChatDto, @ConnectedSocket() client: Socket) {
    return this.chatService.chat(chatDto, client, this.server);
  }
}
