import { Injectable } from '@nestjs/common';

@Injectable()
export class PokerService {
  getPoker(): any {
    return {
      success: true,
      data: '小丑牌，启动！',
    };
  }
}
