import { Types } from "mongoose";

export class CreateBannerDto {
    title: string;
    positionText: {
        x:string,
        y:string
    };
    size: {
        height:string,
        width:string
    };
    background:string;
    media: Types.ObjectId;
}


export class UpdateBannerDto{
    title: string;
    positionText: {
        x:string,
        y:string
    };
    size: {
        height:string,
        width:string
    };
    background:string;
    media: string;
}