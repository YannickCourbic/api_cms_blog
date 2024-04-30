import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MediaModule } from './media/media.module';
// import {join} from "path";
import { BannerController } from './banner/banner.controller';
import { BannerModule } from './banner/banner.module';
import { ParagraphModule } from './paragraph/paragraph.module';
// const pathUpload = join(__dirname , '..', 'dist', 'uploads' , 'medias');
@Module({
  imports: [MediaModule,
            MongooseModule.forRoot('mongodb://localhost:27017/api_cms_blog'),
            BannerModule,
            ParagraphModule,
  ],
  controllers: [AppController, BannerController],
  providers: [AppService],
})
export class AppModule {}
