import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Media, MediaSchema } from 'src/schemas/media.schema';
// import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports : [
    MongooseModule.forFeature([{name: Media.name, schema: MediaSchema}]) 
  ],
  controllers: [MediaController],
  providers: [MediaService],
  exports: [MediaService]
})
export class MediaModule {}
