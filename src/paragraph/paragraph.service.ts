import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Paragraph } from 'src/schemas/paragraph.schema';
import { CreateParagraphDto } from './paragraph.dto';

@Injectable()
export class ParagraphService {
    constructor(@InjectModel(Paragraph.name) private paragraphModel: Model<Paragraph>){}

    async create(createParagraphDto:CreateParagraphDto):Promise<Paragraph>{
        const createParagraph = new this.paragraphModel({...createParagraphDto });
        return createParagraph.save();
    }



}
