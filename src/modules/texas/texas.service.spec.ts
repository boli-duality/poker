import { Test, TestingModule } from '@nestjs/testing';
import { TexasService } from './texas.service';

describe('TexasService', () => {
  let service: TexasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TexasService],
    }).compile();

    service = module.get<TexasService>(TexasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
