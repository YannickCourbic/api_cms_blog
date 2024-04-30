import { Body, Controller, Post, Res } from '@nestjs/common';
import { ParagraphService } from './paragraph.service';
import { CreateParagraphDto } from './paragraph.dto';
import { Response } from 'express';
import { validate } from 'class-validator';
@Controller('api/rest/v1/paragraph')
export class ParagraphController {

    constructor(private paragraphService:ParagraphService){}

    @Post('/create')
    async create(@Body() createParagraphDto:CreateParagraphDto, @Res() res:Response):Promise<Response>{
        
        try {
            const errors = await validate(createParagraphDto)
            if(errors.length > 0){
                return res.status(400).json(errors);
            }
            const created = await this.paragraphService.create(createParagraphDto);
            return res.status(201).json({message: "Vous avez crée un paragraph avec succès." , data:created});
        } catch (error) {
            if(error.errors || error){
                return res.status(400).json({error: error});
            }
            return res.status(500).json({ message: 'Internal server error' , error: error });
        }
    }

}
