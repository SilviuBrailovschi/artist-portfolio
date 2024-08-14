import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioItem } from './portfolio-item/portfolio-item.entity';
import { PortfolioItemModule } from './portfolio-item/portfolio-item.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'parola123',
      database: 'digital_artist',
      entities: [PortfolioItem],
      synchronize: true,
    }),
    PortfolioItemModule,
  ],
})
export class AppModule {}

