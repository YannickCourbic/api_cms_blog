import { Module } from '@nestjs/common';
import { ParagraphController } from './paragraph.controller';
import { ParagraphService } from './paragraph.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Paragraph, ParagraphSchema } from 'src/schemas/paragraph.schema';
import { MediaService } from 'src/media/media.service';
import { Media, MediaSchema } from 'src/schemas/media.schema';

@Module({
  imports : [
    MongooseModule.forFeature([{name: Paragraph.name , schema: ParagraphSchema}]),
    MongooseModule.forFeature([{name: Media.name , schema: MediaSchema}])
  ],
  controllers: [ParagraphController],
  providers: [ParagraphService , MediaService],
  exports: [ParagraphService, MediaService]
})
export class ParagraphModule {}
