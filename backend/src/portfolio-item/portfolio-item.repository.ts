import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PortfolioItem } from './portfolio-item.interface';

@Injectable()
export class PortfolioItemRepository {
    constructor(
        @InjectModel('PortfolioItem') private readonly portfolioItemModel: Model<PortfolioItem>,
    ) {}

    async create(createPortfolioItemDto: any): Promise<PortfolioItem> {
        const createdPortfolioItem = new this.portfolioItemModel(createPortfolioItemDto);
        return createdPortfolioItem.save();
    }

    async findAll(): Promise<PortfolioItem[]> {
        return this.portfolioItemModel.find().exec();
    }

    async findById(id: string): Promise<PortfolioItem> {
        return this.portfolioItemModel.findById(id).exec();
    }

    async update(id: string, updatePortfolioItemDto: any): Promise<PortfolioItem> {
        return this.portfolioItemModel.findByIdAndUpdate(id, updatePortfolioItemDto, { new: true }).exec();
    }

    async delete(id: string): Promise<any> {
        return this.portfolioItemModel.findByIdAndDelete(id).exec();
    }

    async findByStatus(status: boolean): Promise<PortfolioItem[]> {
        return this.portfolioItemModel.find({ status }).exec();
    }
}
