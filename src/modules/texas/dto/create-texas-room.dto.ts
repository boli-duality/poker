import { User } from '../entities/user.entity';

export class CreateTexasRoomDto {
  name: string;
  owner: User;
}
