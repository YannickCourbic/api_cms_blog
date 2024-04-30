import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Media } from 'src/schemas/media.schema';

@Injectable()
export class MediaService {
    constructor(@InjectModel(Media.name) private mediaModel: Model<Media>){}

    async create(file:Express.Multer.File , pathUrl:string):Promise<Media>{
        let type: string;
        if(file.mimetype.match(/image\/(jpg|jpeg|png|svg\+xml|gif|avif)$/)){
            type = "image";
        }
        else if(file.mimetype.match(/video\/(mp4|x-matroska)$/)){
            type = 'vidéo'
        }
        else{
            type  = 'son'
        }
        const createdFile = new this.mediaModel({
            contentUrl : `${pathUrl}/medias/${file.filename}`,
            mimetype : file.mimetype,
            type : type,
            createdAt : Date.now()
        })

        return createdFile.save();
    }

    async findAll():Promise<Media[]>{
        return this.mediaModel.find().exec();
    }

    async findById(id:string):Promise<Media|null>{
        if(!mongoose.isValidObjectId(id)){return null;}
        try {
            const media = this.mediaModel.findById(id).lean().exec();
            if(!media){return null;}
            return media;
        } catch (error) {throw error;}
    }

    async update(file:Express.Multer.File , pathUrl:string,  id:string):Promise<Media|null>{
        if(!mongoose.isValidObjectId(id)){return null}
        try {
            const media = await this.mediaModel.findById(id).lean().exec();
            if(!media){return null;}
            let type: string;
            if(file.mimetype.match(/image\/(jpg|jpeg|png|svg\+xml|gif|avif)$/)){
                type = "image";
            }
            else if(file.mimetype.match(/video\/(mp4|x-matroska)$/)){
                type = 'vidéo'
            }
            else{
                type  = 'son'
            }
            media.type = type;
            media.contentUrl =  `${pathUrl}/medias/${file.filename}`;
            media.mimetype = file.mimetype;
            const update = await this.mediaModel.findOneAndUpdate({_id: id} , {...media , updatedAt : Date.now()} , {new : true});
            return update;
        } catch (error) {
            throw error;
        }
    }


    async delete(id:string):Promise<boolean>{
        if(!mongoose.isValidObjectId(id )){return false}
        const media = await this.mediaModel.findById(id).lean().exec();
        if(!media) return false;
        return (await this.mediaModel.findByIdAndDelete(id)).save() ? true : false
    }



    
}


