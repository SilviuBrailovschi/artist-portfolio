// src/portfolio-item/portfolio-item.controller.ts

import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PortfolioItemService } from './portfolio-item.service';
import { PortfolioItem } from './portfolio-item.entity';

@Controller('portfolio-item')
export class PortfolioItemController {
    constructor(private readonly portfolioItemService: PortfolioItemService) {}

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() portfolioItemData: Partial<PortfolioItem>,
    ) {
        if (file) {
            portfolioItemData.image_data = file.buffer;
        }

        if (portfolioItemData.status === undefined) {
            portfolioItemData.status = true;
        }
        return this.portfolioItemService.create(portfolioItemData as PortfolioItem);
    }

    @Get()
    async findAll(@Query() query: any) {
        // Pass the query parameters to the service method
        console.log('--------------------------------------------INTYRA');
        return this.portfolioItemService.findAll(query);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.portfolioItemService.findOne(+id);
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('image'))
    async update(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
        @Body() portfolioItemData: Partial<PortfolioItem>,
    ) {
        if (file) {
            portfolioItemData.image_data = file.buffer;
        }

        if (portfolioItemData.status === undefined) {
            portfolioItemData.status = true;
        }
        return this.portfolioItemService.update(+id, portfolioItemData as PortfolioItem);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.portfolioItemService.remove(+id);
    }
}
