import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioItemController } from './portfolio-item.controller';
import { PortfolioItemService } from './portfolio-item.service';
import { PortfolioItemRepository } from './portfolio-item.repository';
import { PortfolioItemSchema } from './portfolio-item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'PortfolioItem', schema: PortfolioItemSchema }]),
  ],
  controllers: [PortfolioItemController],
  providers: [PortfolioItemService, PortfolioItemRepository],
})
export class PortfolioItemModule {}
