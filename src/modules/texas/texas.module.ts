import { Module } from '@nestjs/common';
import { TexasService } from './texas.service';
import { TexasGateway } from './texas.gateway';

@Module({
  providers: [TexasGateway, TexasService],
})
export class TexasModule {}
