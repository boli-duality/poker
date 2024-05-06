import { Controller, Get } from '@nestjs/common';
import { PokerService } from './poker.service';

@Controller('poker')
export class PokerController {
  constructor(private readonly pokerService: PokerService) {}

  @Get()
  getPoker(): string {
    return this.pokerService.getPoker();
  }
}
