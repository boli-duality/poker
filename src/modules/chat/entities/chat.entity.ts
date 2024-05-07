import { ChatDto } from '../dto/chat.dto';

class Chat {
  room = {
    world: [] as ChatDto[],
  };
}

export const chat = new Chat();
