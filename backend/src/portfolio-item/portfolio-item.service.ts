// src/portfolio-item/portfolio-item.service.ts

import { Injectable } from '@nestjs/common';
import { PortfolioItem } from './portfolio-item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PortfolioItemService {
    constructor(
        @InjectRepository(PortfolioItem)
        private readonly portfolioItemRepository: Repository<PortfolioItem>,
    ) {}

    async create(portfolioItemData: PortfolioItem): Promise<PortfolioItem> {
        return this.portfolioItemRepository.save(portfolioItemData);
    }

    async findAll(query: any): Promise<PortfolioItem[]> {
        const { status, title } = query;

        const conditions: any = {};
        if (status !== undefined) {
            conditions.status = status === 'true' ? true : false;
        }
        if (title) {
            conditions.title = title;
        }

        return this.portfolioItemRepository.find({ where: conditions });
    }

    async findOne(id: number): Promise<PortfolioItem | null> {
        return this.portfolioItemRepository.findOneBy({ id });
    }

    async update(id: number, portfolioItemData: Partial<PortfolioItem>): Promise<PortfolioItem> {
        await this.portfolioItemRepository.update(id, portfolioItemData);
        return this.portfolioItemRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.portfolioItemRepository.delete(id);
    }
}
