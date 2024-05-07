import { Injectable } from '@nestjs/common';
import { ConnectChatDto } from './dto/connect-chat.dto';
import { chat } from './entities/chat.entity';
import { ChatDto } from './dto/chat.dto';

@Injectable()
export class ChatService {
  connectChat(connectChatDto: ConnectChatDto) {
    const room = chat.room[connectChatDto.room];
    if (!room) throw new Error('聊天室不存在');
    return room;
  }

  chat(chatDto: ChatDto) {
    return chatDto;
  }
}
