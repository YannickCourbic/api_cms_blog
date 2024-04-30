import {Prop , Schema , SchemaFactory} from "@nestjs/mongoose";
import { Date, HydratedDocument } from "mongoose";

export type MediaDocument = HydratedDocument<Media>

@Schema()
export class Media {
    @Prop({required: true , type: String})
    contentUrl: string

    @Prop({required: true , type: String})
    mimetype: string

    @Prop({required: true, type: String})
    type: string

    @Prop({required: true , type: Date})
    createdAt: Date

    @Prop({required: false , type: Date})
    updatedAt: Date
}

export const MediaSchema = SchemaFactory.createForClass(Media);