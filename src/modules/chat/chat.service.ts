import { Injectable } from '@nestjs/common';
import { ConnectChatDto } from './dto/connect-chat.dto';
import { ChatDto } from './dto/chat.dto';
import { Server, Socket } from 'socket.io';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatService {
  chats = new Chat();

  connectChat(connectChatDto: ConnectChatDto, client: Socket) {
    const room = this.chats.room[connectChatDto.room];
    if (!room) throw new Error('聊天室不存在');
    client.join(connectChatDto.room);
    return room;
  }

  chat(chatDto: ChatDto, client: Socket, server: Server) {
    const room = this.chats.room[chatDto.room];
    if (!room) return;
    if (chatDto.text) {
      room.push(chatDto);
      server.to(chatDto.room).emit('receive', chatDto);
    }
    return chatDto;
  }
}
