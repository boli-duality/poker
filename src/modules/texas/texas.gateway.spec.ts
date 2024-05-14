import { Test, TestingModule } from '@nestjs/testing';
import { TexasGateway } from './texas.gateway';
import { TexasService } from './texas.service';

describe('TexasGateway', () => {
  let gateway: TexasGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TexasGateway, TexasService],
    }).compile();

    gateway = module.get<TexasGateway>(TexasGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
