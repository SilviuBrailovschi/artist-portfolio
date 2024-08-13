import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioItemController } from './portfolio-item.controller';

describe('PortfolioItemController', () => {
  let controller: PortfolioItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortfolioItemController],
    }).compile();

    controller = module.get<PortfolioItemController>(PortfolioItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
