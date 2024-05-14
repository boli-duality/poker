import { Injectable } from '@nestjs/common';
import { CreateTexasRoomDto } from './dto/create-texas-room.dto';
import { UpdateTexasRoomDto } from './dto/update-texas-room.dto';
import { Room } from './entities/texas.entity';
import { Server, Socket } from 'socket.io';
import { ConnectRoomDto } from './dto/connect-room.dto';

@Injectable()
export class TexasService {
  rooms: Record<string, Room> = {};

  connectHall() {
    return {
      err: 0,
      msg: '进入大厅',
      data: this.rooms,
    };
  }

  createRoom(createTexasRoomDto: CreateTexasRoomDto, server: Server) {
    const room = new Room(createTexasRoomDto);
    this.rooms[room.id] = room;
    const resp = {
      err: 0,
      msg: '创建房间成功',
      data: room,
    };
    server.emit('updateTexasRoom', resp);
    return resp;
  }

  connectRoom(connectRoomDto: ConnectRoomDto, server: Server, client: Socket) {
    const room = this.findOne(connectRoomDto.id);
    if (!room) {
      return {
        err: 1,
        msg: '房间不存在',
        data: null,
      };
    }
    client.join(connectRoomDto.id);
    const isInRoom = room.users.some((e) => e.id == connectRoomDto.user.id);
    if (!isInRoom) room.users.push(connectRoomDto.user);
    server.to(connectRoomDto.id).emit('updateRoomUser');
    return {
      err: 0,
      msg: '加入房间',
      data: room,
    };
  }

  findAll() {
    return `This action returns all texas`;
  }

  findOne(id: string) {
    const room = this.rooms[id];
    return room;
  }

  update(id: number, updateTexasRoomDto: UpdateTexasRoomDto) {
    console.log(updateTexasRoomDto);
    return `This action updates a #${id} texa`;
  }

  remove(id: number) {
    return `This action removes a #${id} texa`;
  }
}
