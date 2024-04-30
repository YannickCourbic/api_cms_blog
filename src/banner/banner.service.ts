import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Banner } from 'src/schemas/banner.schema';
import { CreateBannerDto, UpdateBannerDto } from './banner.dto';

@Injectable()
export class BannerService {
    constructor(@InjectModel(Banner.name) private bannerModel: Model<Banner>){}

    async create(createBannerDto: CreateBannerDto):Promise<Banner>{
        const createdBanner = new this.bannerModel({...createBannerDto , createdAt: Date.now()});
        return createdBanner.save();
    }

    async findAll():Promise<Banner[]>{
        const pipeline = [
            {
                $lookup: {
                    from: 'media',
                    localField: 'media',
                    foreignField: '_id',
                    as: 'media'
                }
            },
            {
                $unwind: '$media',
            }
        ];
        const banners = await this.bannerModel.aggregate(pipeline).exec();
        console.log(banners);
        
        return banners;
    }

    async findById(id:string):Promise<Banner|null>{
        const banner = await this.bannerModel.findById(id).lean().exec();
        if(!mongoose.isValidObjectId(id)) return null;
        if(!banner) return null;
        return banner;
    }

    async update(id:string , updateBannerDto: UpdateBannerDto):Promise<Banner|null>{
        if(!mongoose.isValidObjectId(id)) return null;
        const banner = this.bannerModel.findById(id).lean().exec();
        if(!banner) return null;
        const update = await this.bannerModel.findByIdAndUpdate(id , {...updateBannerDto , updatedAt: Date.now()} , {new:true , runValidators: true})
        return update;
    }

    async delete(id:string):Promise<Banner|null>{
        const banner = this.bannerModel.findById(id).lean().exec();
        if(banner === null) return null;
        const remove = (await this.bannerModel.findByIdAndDelete(id));
        return remove; 
    }

    async pagination(page:number , limit:number):Promise<Banner[]|null>{
        const pipeline = [
            {
                $lookup: {
                    from:'media',
                    localField:'media',
                    foreignField: '_id',
                    as: 'media'
                },
            },
            {$unwind: '$media'},
            {$skip:( (page - 1) * limit)},
            {$limit: limit}
        ];
        const banners = await this.bannerModel.aggregate(pipeline).exec();
        //console.log(banners);
        return banners;
    }

    async findByTitle(title:string):Promise<Banner|null>{
        const banner = await this.bannerModel.findOne({title : title}).exec();
        return banner;
    }
    async findByRegexTitle(regex: string): Promise<Banner[] | null> {
        const regexp = new RegExp(regex, 'i');
        const banners = await this.bannerModel.find({ title: { $regex: regexp } }).exec();
        return banners;
    }
    

    




}
