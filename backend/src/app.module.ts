import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioItemModule } from './portfolio-item/portfolio-item.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://root:parola123@myfirstapp.hdasqyw.mongodb.net/?retryWrites=true&w=majority&appName=MyFirstApp'),
    PortfolioItemModule,
  ],
})
export class AppModule {}

