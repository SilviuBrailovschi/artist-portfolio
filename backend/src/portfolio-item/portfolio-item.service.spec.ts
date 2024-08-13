import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioItemService } from './portfolio-item.service';

describe('PortfolioItemService', () => {
  let service: PortfolioItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortfolioItemService],
    }).compile();

    service = module.get<PortfolioItemService>(PortfolioItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
