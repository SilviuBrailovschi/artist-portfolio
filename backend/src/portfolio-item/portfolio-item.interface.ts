import { Document } from 'mongoose';

export interface PortfolioItem extends Document {
    id: number;
    title: string;
    description: string;
    image_data: Buffer;
    client_site_url: string;
    status: boolean;
}
