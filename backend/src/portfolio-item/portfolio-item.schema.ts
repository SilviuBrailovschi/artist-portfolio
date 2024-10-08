import { Schema, Document } from 'mongoose';

export const PortfolioItemSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image_data: { type: Buffer, required: true },
    client_site_url: { type: String, required: true },
    status: { type: Boolean, required: true },
});

export interface PortfolioItem extends Document {
    title: string;
    description: string;
    image_data: Buffer;
    client_site_url: string;
    status: boolean;
}
