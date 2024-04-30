import { Controller, Delete, Get, Param, Post, Put, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response , Request} from 'express';
import { unlinkSync } from 'fs';
import { diskStorage } from 'multer';
import { MediaService } from './media.service';
import { Media } from 'src/schemas/media.schema';
import { join } from 'path';


@Controller('api/rest/v1/media')
export class MediaController {

    public  newFilename?:string;
    constructor(private mediaService:MediaService){}

    @Post('/create')
    @UseInterceptors(
    FileInterceptor('media_file' , {
                        storage : diskStorage({
                            destination : './resource/medias',
                            filename: (req , file , cb) => {
                                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
                                cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
                            }
                        })
    }) )
    async create(@UploadedFile() file: Express.Multer.File , @Res() res: Response , @Req() req: Request):Promise<Response>
    {   
        let media: Media;
        if(!file.originalname.match(/\.(jpg|jpeg|avif|svg|png|gif|mp4|mp3|mkv)$/)){
            unlinkSync( file.path);
            return res.status(404).json({ error : 'Le fichier uploader n\'est pas supporté , les extensions supporté sont : (jpg|jpeg|avif|svg|png|gif|mp4|mp3)' })
        }
        else{
            console.log(file , req.protocol);
            media = await this.mediaService.create(file , `${req.protocol}://${req.hostname}:3000`);
        }
        console.log(media);
        return res.status(201).json( { message: 'Vous avez upload votre média avec succès.' , media:media});
    }

    @Get('/all')
    async all(@Res() res:Response):Promise<Response>{
        //console.log(await this.mediaService.findAll());
        const medias = await this.mediaService.findAll();
        if(medias.length === 0){ return res.status(200).json({message: "Il n'a pas de media disponible actuellement."})}
        return res.status(200).json({message: 'Vous avez récupérer tout les médias avec succès.' , medias : medias});
    }

    @Get('/:id')
    async show(@Res() res:Response , @Param() params: any):Promise<Response>{
        const media = await this.mediaService.findById(params.id);
        if(media === null){ return res.status(404).json({error: "Le media n'a pas été trouvé."});}
        return res.status(200).json({message: 'Vous avez récupérer un médias avec succès.' , media: media});
    }

    @Put('/update/:id')
    @UseInterceptors(FileInterceptor('file_update_media' , {
        storage : diskStorage({
            destination : './resource/medias',
            filename: (req , file , cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
                cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
            }
        })
    }))
    async update(@Res() res:Response , @Param() params: any, @UploadedFile() file: Express.Multer.File , @Req() req:Request): Promise<Response>{
        const media = await this.mediaService.findById(params.id);
        let mediaUpdate:Media|null;
        if(media === null){ 
            unlinkSync(file.path);
            return res.status(404).json({error : 'Le media n\'a pas été trouvé.'})
        };
        console.log(file);
        //je supprime l'ancienne image 
        if(media.contentUrl){
            const oldFilename = media.contentUrl.replace(`${req.protocol}://${req.hostname}:3000/medias/` , '');
            // console.log(oldFilename);
            unlinkSync(join('resource' , 'medias' , oldFilename));
        }

        if(!file.originalname.match(/\.(jpg|jpeg|avif|svg|png|gif|mp4|mp3|mkv)$/)){
            unlinkSync( file.path);
            return res.status(404).json({ error : 'Le fichier uploader n\'est pas supporté , les extensions supporté sont : (jpg|jpeg|avif|svg|png|gif|mp4|mp3)' })
        }
        else{
            mediaUpdate = await this.mediaService.update(file , `${req.protocol}://${req.hostname}:3000` , params.id);
        }
        return res.status(200).json({message: "Vous avez modifié un média avec succès." , 'media' : mediaUpdate});
    }
    @Delete("/delete/:id")
    async remove(@Res() res:Response , @Param() params:any , @Req() req: Request):Promise<Response>{
        const media = await this.mediaService.findById(params.id);
        if(media){
            const oldFilename = media.contentUrl.replace(`${req.protocol}://${req.hostname}:3000/medias/` , '');
            // console.log(oldFilename);
            unlinkSync(join('resource' , 'medias' , oldFilename));
        }
        else{
            return res.status(404).json({error : 'Le media n\'a pas été trouvé.'})
        }
        await this.mediaService.delete(params.id);
        return res.status(200).json({message : "Vous avez supprimer avec succès le médias."});
    }
    



}
