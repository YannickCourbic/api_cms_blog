import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";


export type ParagraphDocument = HydratedDocument<Paragraph>

@Schema()
export class Paragraph {
    @Prop({required:true , type: String , unique:true})
    title:string;

    @Prop({required:false, type:String})
    content:string;

    @Prop(raw({
        title: {
            fontSize: {type:String , required:true},
            fontFamily: {type:String , required:true},
            color: {type:String, required:true},
            border: {type:String , required:true , default: 'none'},
            shadow: {type:String , required:true},
            position: {
                type: {type:String , required:true},
                top: {type:String , required:true},
                bottom: {type:String, required:true},
                left: {type:String, required:true},
                right: {type:String , required:true}
            },
            padding: {
                top: {type:String , required:true},
                bottom: {type:String, required:true},
                left: {type:String, required:true},
                right: {type:String , required:true}
            },
            margin: {
                top: {type:String , required:true},
                bottom: {type:String, required:true},
                left: {type:String, required:true},
                right: {type:String , required:true}
            },
            letterSpacing: {type:String , required:true}
        },
        content: {
            fontSize: {type:String , required:true},
            fontFamily: {type:String , required:true},
            color: {type:String, required:true},
            border: {type:String , required:true , default: 'none'},
            shadow: {type:String , required:true},
            position: {
                type: {type:String , required:true},
                top: {type:String , required:true},
                bottom: {type:String, required:true},
                left: {type:String, required:true},
                right: {type:String , required:true}
            },
            padding: {
                top: {type:String , required:true},
                bottom: {type:String, required:true},
                left: {type:String, required:true},
                right: {type:String , required:true}
            },
            margin: {
                top: {type:String , required:true},
                bottom: {type:String, required:true},
                left: {type:String, required:true},
                right: {type:String , required:true}
            },
            lineHeight :{type:String , required:true},
            letterSpacing: {type:String , required:true},
        },
        media: {
            height: {type:String , required:true},
            width: {type:String, required:true},
            border: {type:String , required:true},
            borderRadius:{type:String , required:true},
            position: {
                type: {type:String , required:true},
                top: {type:String , required:true},
                bottom: {type:String, required:true},
                left: {type:String, required:true},
                right: {type:String , required:true}
            },
            padding: {
                top: {type:String , required:false},
                bottom: {type:String, required:false},
                left: {type:String, required:false},
                right: {type:String , required:false}
            },
            margin: {
                top: {type:String , required:true},
                bottom: {type:String, required:true},
                left: {type:String, required:true},
                right: {type:String , required:true}
            },
        }

    }))
    styles: Record<string,any>

    @Prop({required:true , type:mongoose.Schema.Types.ObjectId})
    media:Types.ObjectId

    @Prop({required:true , type:Number})
    node:number;
}

export const ParagraphSchema = SchemaFactory.createForClass(Paragraph);

ParagraphSchema.pre('findOne' , function(){
    this.populate('media');
})