import {Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors, Query} from '@nestjs/common';
import {PortfolioItemService} from './portfolio-item.service';
import {PortfolioItem} from './portfolio-item.interface';
import {FileInterceptor} from '@nestjs/platform-express';
import * as sharp from 'sharp';

@Controller('portfolio-item')
export class PortfolioItemController {
    constructor(private readonly portfolioItemService: PortfolioItemService) {}

    @Get() // GET /portfolio-item
    async findAll(@Query('status') status?: string): Promise<PortfolioItem[]> {
        return this.portfolioItemService.findByStatus(status);
    }

    @Get(':id') // GET /portfolio-item/:id
    async findById(@Param('id') id: string): Promise<PortfolioItem> {
        return this.portfolioItemService.findById(id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('image_data'))
    async create(@UploadedFile() file: Express.Multer.File, @Body() body: any): Promise<PortfolioItem> {
        if (file) {
            body.image_data = await sharp(file.buffer)
                .resize({width: 1024})
                .jpeg({quality: 80})
                .toBuffer();
        } else {
            throw new Error('Image file is required.');
        }

        return this.portfolioItemService.create(body);
    }

    @Put(':id') // PUT /portfolio-item/:id
    @UseInterceptors(FileInterceptor('image_data'))
    async update(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
        @Body() body: any
    ): Promise<PortfolioItem> {
        if (file) {
            body.image_data = await sharp(file.buffer)
                .resize({ width: 1024 })
                .jpeg({ quality: 80 })
                .toBuffer();
        }

        return this.portfolioItemService.update(id, body);
    }

    @Delete(':id') // DELETE /portfolio-item/:id
    async delete(@Param('id') id: string): Promise<void> {
        return this.portfolioItemService.delete(id);
    }
}
