import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Banner, BannerSchema } from 'src/schemas/banner.schema';
import { MediaService } from 'src/media/media.service';
import { Media } from 'src/schemas/media.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Banner.name, schema: BannerSchema}]),
    MongooseModule.forFeature([{name: Media.name, schema: MediaService}]),
  ],
  controllers: [BannerController],
  providers: [BannerService,   MediaService],
  exports: [BannerService,   MediaService]
})
export class BannerModule {}
