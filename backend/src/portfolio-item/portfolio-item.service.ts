import { Injectable } from '@nestjs/common';
import { PortfolioItemRepository } from './portfolio-item.repository';
import { PortfolioItem } from './portfolio-item.interface';

@Injectable()
export class PortfolioItemService {
    constructor(private readonly portfolioItemRepository: PortfolioItemRepository) {}

    async findByStatus(status?: string): Promise<PortfolioItem[]> {
        if (status === 'active') {
            return this.portfolioItemRepository.findByStatus(true);
        } else if (status === 'inactive') {
            return this.portfolioItemRepository.findByStatus(false);
        } else {
            return this.portfolioItemRepository.findAll();
        }
    }

    async findAll(): Promise<PortfolioItem[]> {
        return this.portfolioItemRepository.findAll();
    }

    async findById(id: string): Promise<PortfolioItem> {
        return this.portfolioItemRepository.findById(id);
    }

    async create(createPortfolioItemDto: any): Promise<PortfolioItem> {
        return this.portfolioItemRepository.create(createPortfolioItemDto);
    }

    async update(id: string, updatePortfolioItemDto: PortfolioItem): Promise<PortfolioItem> {
        return this.portfolioItemRepository.update(id, updatePortfolioItemDto);
    }

    async delete(id: string): Promise<void> {
        return this.portfolioItemRepository.delete(id);
    }
}
