import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { ConnectChatDto } from './dto/connect-chat.dto';
import { ChatDto } from './dto/chat.dto';
import { Socket } from 'net';
import { chat } from './entities/chat.entity';

@WebSocketGateway({ cors: true, transports: ['websocket'] })
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('connectChat')
  connectChat(@MessageBody() connectChatDto: ConnectChatDto) {
    return this.chatService.connectChat(connectChatDto);
  }

  @SubscribeMessage('chat')
  chat(@MessageBody() chatDto: ChatDto, @ConnectedSocket() client: Socket) {
    const room = chat.room[chatDto.room];
    if (!room) return this.chatService.chat(chatDto);
    if (chatDto.text) {
      room.push(chatDto);
      client.emit(`chat-${chatDto.room}`, chatDto);
    }

    return this.chatService.chat(chatDto);
  }
}
