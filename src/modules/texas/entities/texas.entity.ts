import { randomUUID } from 'crypto';
import { CreateTexasRoomDto } from '../dto/create-texas-room.dto';
import { User } from './user.entity';

export class Room {
  id: string;
  name: string;
  owner: User;
  users: User[] = [];
  constructor(createTexasRoomDto: CreateTexasRoomDto) {
    this.id = randomUUID();
    this.name = createTexasRoomDto.name;
    this.owner = createTexasRoomDto.owner;
  }
}
