
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UploadedFile, UseInterceptors, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express'; // Import Response from express
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
        return this.portfolioItemService.findAll(query);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.portfolioItemService.findOne(+id);
    }

    @Get('image_data/:id') // Add a new endpoint to serve images
    async getImage(@Param('id') id: string, @Res() res: Response) {
        const image = await this.portfolioItemService.getImage(+id); // Ensure this method returns binary data
        if (image) {
            res.setHeader('Content-Type', 'image/jpeg'); // Adjust based on your image type
            res.send(image);
        } else {
            res.status(404).send('Image not found');
        }
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
