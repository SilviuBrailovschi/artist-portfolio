
import { Injectable } from '@nestjs/common';
import { PortfolioItem } from './portfolio-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PortfolioItemService {
    constructor(
        @InjectRepository(PortfolioItem)
        private portfolioItemRepository: Repository<PortfolioItem>,
    ) {}

    async create(portfolioItem: PortfolioItem): Promise<PortfolioItem> {
        return this.portfolioItemRepository.save(portfolioItem);
    }

    async findAll(query: any): Promise<PortfolioItem[]> {
        const { status } = query;
        const where = {};

        if (status) {
            if (status === 'active') {
                where['status'] = 1; // Active
            } else if (status === 'inactive') {
                where['status'] = 0; // Inactive
            }
        }

        return this.portfolioItemRepository.find({ where });
    }

    async findOne(id: number): Promise<PortfolioItem> {
        return this.portfolioItemRepository.findOneBy({ id });
    }

    async getImage(id: number): Promise<Buffer> {
        const item = await this.portfolioItemRepository.findOneBy({ id });
        return item ? item.image_data : null;
    }

    async update(id: number, portfolioItem: Partial<PortfolioItem>): Promise<PortfolioItem> {
        await this.portfolioItemRepository.update(id, portfolioItem);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.portfolioItemRepository.delete(id);
    }
}
