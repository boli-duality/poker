import { Module } from '@nestjs/common';
import { PokerController } from './poker.controller';
import { PokerService } from './poker.service';

@Module({
  imports: [],
  controllers: [PokerController],
  providers: [PokerService],
})
export class PokerModule {}
