import {Response} from 'express';
import { Body, Controller, Delete, Get, Param, Post, Put, Res , Query, Req} from '@nestjs/common';
import { CreateBannerDto, UpdateBannerDto } from './banner.dto';
import { BannerService } from './banner.service';
import mongoose from 'mongoose';
import { MediaService } from 'src/media/media.service';

@Controller('api/rest/v1/banner')
export class BannerController {
    constructor(private bannerService:BannerService, private mediaService:MediaService){}
    @Post('/create')
    async create(@Body() createBannerDto: CreateBannerDto , @Res() res:Response): Promise<Response>{
        console.log(createBannerDto);
        const created = await this.bannerService.create(createBannerDto);
        return res.status(201).json({message: "Vous avez créer une bannière avec succès." , data: created});
    }

    @Get('/all')
    async all(@Res() res: Response): Promise<Response>{
        const banners = await this.bannerService.findAll();
        if(banners.length === 0 ) return res.status(200).json({message: "Il n'y a pas de bannière encore crée actuellement."});
        return res.status(200).json({message: "Vous récuperer l'ensemble des bannières avec succès." , data: banners})
    }

    @Get('/show/:id')
    async show(@Res() res:Response, @Param() params:any):Promise<Response>{
        const banner = await this.bannerService.findById(params.id);
        if(banner === null) return res.status(404).json({message: "La bannière n'a pas été trouvée."});
        return res.status(200).json({message: "Vous avez récuper la bannière avec succès." , data: banner });
    }

    @Put('/update/:id')
    async update(@Res() res:Response , @Body() updateBannerDto:UpdateBannerDto , @Param() params:any):Promise<Response>{
        if(!mongoose.isValidObjectId(updateBannerDto.media)) return res.status(404).json({message: "Le média associée n'a pas été trouvé."});
        const media = await this.mediaService.findById(updateBannerDto.media);
        if(media === null) return res.status(404).json({ message :'Le média associée n\'a pas été trouvé.'});
        const banner = await this.bannerService.update(params.id , updateBannerDto);
        if(banner === null) return res.status(404).json({message: "La bannière à modifier n'a pas été trouvée"});
        return res.status(200).json({message: "Vous avez modifiée la bannière avec succès.", data: banner});
    }

    @Delete("/delete/:id")
    async delete(@Res() res:Response, @Param() params:any):Promise<Response>{
        if(!mongoose.isValidObjectId(params.id)) return res.status(404).json({message: "La bannière n'a pas été trouvée."});
        const banner = await this.bannerService.delete(params.id);
        if(banner === null) return res.status(404).json({message: "La bannière n'a pas été trouvée."});
        return res.status(200).json({message: `Vous avez supprimer la bannière ${banner.title}`})
    }

    @Get('/paginate')
    async paginate(@Res() res:Response , @Query('limit') limit:string, @Query('page') page:string):Promise<Response>{
        console.log(limit);
        if(!page) return res.status(400).json({message: "La requête est invalide car la page n'est pas en query dans la requête."});
        if(!limit) return res.status(400).json({message: "La requête est invalide car la limit n'est pas en query dans la requête."});
        const paginated = await this.bannerService.pagination(  parseInt(page),parseInt(limit) )
        return res.status(200).json({message: "Vous avez récupérer la pagination avec succès." , data: paginated})
    }

    @Get('/search')
    async search(@Res() res:Response , @Req() req:Request , @Query() query:any):Promise<Response>{
        // console.log( query);
        let banner; 
        if(!query.id && !query.title && !query.regexp) {return res.status(400).json({message: "La requête est invalide car il n'y a pas de query associée (?id=, ?title= , ?search=)"});}
        if(query.id && !query.title && !query.regexp){
            banner = await this.bannerService.findById(query.id);
            if(!mongoose.isValidObjectId(query.id)) return res.status(404).json({message: "l'id est invalide."});
            if(banner === null) return res.status(404).json({message: "la bannière n'a pas été trouvée."});
        }
        if(query.title && !query.id && !query.regexp){
            banner = await this.bannerService.findByTitle(query.title);
            //console.log(banner);
            if(banner === null) return res.status(400).json({message: "La bannière n'a pas été trouvé , le titre est invalide."});
        }
        if(query.regexp && !query.id && !query.title){
            banner = await this.bannerService.findByRegexTitle(query.regexp);
            //console.log(banner);
        }
        
        return res.status(200).json({message: "Vous avez récupérer une ressource via une recherche avec succès." , data: banner});
    }

    


}
