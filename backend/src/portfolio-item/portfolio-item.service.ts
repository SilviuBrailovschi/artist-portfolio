// src/portfolio-item/portfolio-item.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PortfolioItem } from './portfolio-item.entity';

@Injectable()
export class PortfolioItemService {
    constructor(
        @InjectRepository(PortfolioItem)
        private portfolioItemRepository: Repository<PortfolioItem>,
    ) {}

    create(portfolioItem: PortfolioItem) {
        return this.portfolioItemRepository.save(portfolioItem);
    }

    findAll() {
        return this.portfolioItemRepository.find();
    }

    findOne(id: number) {
        return this.portfolioItemRepository.findOne({ where: { id } });
    }

    update(id: number, portfolioItemData: Partial<PortfolioItem>) {
        return this.portfolioItemRepository.update(id, portfolioItemData);
    }

    remove(id: number) {
        return this.portfolioItemRepository.delete(id);
    }
}
