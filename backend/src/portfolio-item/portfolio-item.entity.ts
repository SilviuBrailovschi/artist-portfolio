// src/portfolio-item/portfolio-item.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PortfolioItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    title: string;

    @Column('text')
    description: string;

    @Column('longblob', { nullable: true })
    image_data: Buffer;

    @Column({ length: 255, nullable: true })
    client_site_url: string;

    @Column({ type: 'boolean', default: true })
    status: boolean;
}
