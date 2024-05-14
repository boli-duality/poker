import { PartialType } from '@nestjs/mapped-types';
import { CreateTexasRoomDto } from './create-texas-room.dto';

export class UpdateTexasRoomDto extends PartialType(CreateTexasRoomDto) {
  id: number;
}
