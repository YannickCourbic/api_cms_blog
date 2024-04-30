import { IsNotEmpty, IsNumber, Length, Validate, ValidateNested } from "class-validator";
import { Types } from "mongoose";
import { CustomRegExp } from "src/validator/regexp.validator";
export class PositionDto {
            @IsNotEmpty()
            type: string;
            @IsNotEmpty()
            @Validate(CustomRegExp , {
                message : "la valeur css top de la position est invalide"
            })
            top: string;
            @IsNotEmpty()
            @Validate(CustomRegExp , {
                message : "la valeur css bottom de la position est invalide"
            })
            bottom: string;
            @IsNotEmpty()
            @Validate(CustomRegExp , {
                message : "la valeur css left de la position est invalide"
            })
            left: string;
            @IsNotEmpty()
            @Validate(CustomRegExp , {
                message : "la valeur css right de la position est invalide"
            })
            right: string
}
export class PaddingDTO{
            @IsNotEmpty()
            @Validate(CustomRegExp , {
                message : "la valeur css top de la position est invalide"
            })
            top: string;
            @IsNotEmpty()
            @Validate(CustomRegExp , {
                message : "la valeur css bottom de la position est invalide"
            })
            bottom: string;
            @IsNotEmpty()
            @Validate(CustomRegExp , {
                message : "la valeur css left de la position est invalide"
            })
            left: string;
            @IsNotEmpty()
            @Validate(CustomRegExp , {
                message : "la valeur css right de la position est invalide"
            })
            right: string;
}
export class TitleDTO{
    @IsNotEmpty({message: "La propriété font-size du titre ne peut être vide ou null."})
    @Validate(CustomRegExp , {
        message : "la valeur css font-size de la position est invalide"
    })
    fontSize: string;
    @IsNotEmpty()
    fontFamily: string;
    @IsNotEmpty()
    color: string;
    @IsNotEmpty()
    border: string;
    @IsNotEmpty()
    shadow: string;
    @ValidateNested()
    @IsNotEmpty()
    position: PositionDto;
    @ValidateNested({each: true})
    @IsNotEmpty()
    padding: PaddingDTO;
    @ValidateNested({each :true})
    @IsNotEmpty()
    margin: PaddingDTO;
    @IsNotEmpty()
    @Validate(CustomRegExp , {
        message : "la valeur css letter-spacing est invalide"
    })
    letterSpacing:string;
}
export class ContentDTO{
    @IsNotEmpty()
    @Validate(CustomRegExp , {
        message : "la valeur css font-size de la position est invalide"
    })
    fontSize: string;
    @IsNotEmpty()
    fontFamily: string;
    @IsNotEmpty()
    color: string;
    @IsNotEmpty()
    border: string;
    @IsNotEmpty()
    shadow: string;
    @ValidateNested()
    @IsNotEmpty()
    position: PositionDto;
    @ValidateNested()
    @IsNotEmpty()
    padding: PaddingDTO;
    @ValidateNested()
    @IsNotEmpty()
    margin: PaddingDTO;
    @IsNotEmpty()
    lineHeight:string;
    @IsNotEmpty()
    letterSpacing:string;
}
export class MediaDTO{
        @IsNotEmpty()
        @Validate(CustomRegExp , {
            message : "la valeur css de la hauteur est invalide"
        })
        height: string;
        @IsNotEmpty()
        @Validate(CustomRegExp , {
            message : "la valeur css de la largeur est invalide"
        })
        width: string;
        @IsNotEmpty()
        border:string;
        @IsNotEmpty()
        borderRadius: string;
        @ValidateNested()
        @IsNotEmpty()
        position: PositionDto;
        @ValidateNested()
        @IsNotEmpty()
        padding: PaddingDTO;
        @ValidateNested()
        @IsNotEmpty()
        margin: PaddingDTO;
    
}

export class StylesDTO{
    @ValidateNested()
    @IsNotEmpty()
    title: TitleDTO;
    @ValidateNested()
    @IsNotEmpty()
    content: ContentDTO;
    @ValidateNested()
    @IsNotEmpty()
    media: MediaDTO;
}

export class CreateParagraphDto{
    @IsNotEmpty( {message: "Le titre ne peut être vide ou null."})
    @Length(5 , 150 , {message: "Le titre ne peut avoir minimun 5 caractères et maximum 150 caractères."})
    title:string;

    @IsNotEmpty({message: "Le message ne peut être vide ou null."})
    content:string;

    @ValidateNested()
    @IsNotEmpty()
    styles: StylesDTO;

    @IsNotEmpty()
    media:Types.ObjectId;

    @IsNotEmpty()
    @IsNumber()
    node:number;

}
