import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
// import { Media } from "./media.schema";


export type BannerDocument = HydratedDocument<Banner>;

@Schema()
export class Banner {
    @Prop({required: true , type:String})
    title:string

    @Prop(raw({
        x: {type: String , require:true},
        y: {type: String , require:true}
    }))
    positionText: Record<string , any>

    @Prop(raw({
        height: {type: String , require: true},
        width: {type: String , require: true}
    }))
    size: Record<string ,any>

    @Prop({required:true , type:String})
    background: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Media'})
    media: Types.ObjectId

    @Prop({required: true , type: Date})
    createdAt: Date

    @Prop({required: false , type: Date})
    updatedAt: Date
}

export const BannerSchema = SchemaFactory.createForClass(Banner);

BannerSchema.pre('findOne', function(){
    this.populate('media');
});