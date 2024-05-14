import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { TexasService } from './texas.service';
import { CreateTexasRoomDto } from './dto/create-texas-room.dto';
import { UpdateTexasRoomDto } from './dto/update-texas-room.dto';
import { Socket, Server } from 'socket.io';
import { ConnectRoomDto } from './dto/connect-room.dto';

@WebSocketGateway()
export class TexasGateway {
  @WebSocketServer()
  private readonly server: Server;

  constructor(private readonly texasService: TexasService) {}

  @SubscribeMessage('connectTexasHall')
  connectHall() {
    return this.texasService.connectHall();
  }

  @SubscribeMessage('createTexasRoom')
  createRoom(@MessageBody() createTexasRoomDto: CreateTexasRoomDto) {
    return this.texasService.createRoom(createTexasRoomDto, this.server);
  }

  @SubscribeMessage('connectTexasRoom')
  connectRoom(
    @MessageBody() connectRoomDto: ConnectRoomDto,
    @ConnectedSocket() client: Socket,
  ) {
    return this.texasService.connectRoom(connectRoomDto, this.server, client);
  }

  @SubscribeMessage('findAllTexas')
  findAll() {
    return this.texasService.findAll();
  }

  @SubscribeMessage('findOneTexa')
  findOne(@MessageBody() id: string) {
    return this.texasService.findOne(id);
  }

  @SubscribeMessage('updateTexa')
  update(@MessageBody() updateTexaRoomDto: UpdateTexasRoomDto) {
    return this.texasService.update(updateTexaRoomDto.id, updateTexaRoomDto);
  }

  @SubscribeMessage('removeTexa')
  remove(@MessageBody() id: number) {
    return this.texasService.remove(id);
  }
}
