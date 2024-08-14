import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioItemService } from './portfolio-item.service';
import { PortfolioItemController } from './portfolio-item.controller';
import { PortfolioItem } from './portfolio-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioItem])],
  controllers: [PortfolioItemController],
  providers: [PortfolioItemService],
})
export class PortfolioItemModule {}

