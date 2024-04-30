import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";


@ValidatorConstraint({name: 'customRegERxp' , async: false})
export class CustomRegExp implements ValidatorConstraintInterface {
    validate(value: string, args?: ValidationArguments): boolean | null| Promise<boolean|null> {
        // throw new Error("Method not implemented.");
        // return value.match(/[]$/i);
        console.log(args);
        return value.match(/^(?!.*[\W+]$)(\d+(?:\.\d*)?|\d*\.\d+)(?:%|px|em|rem|in|pt|cm|pc)/g) ? true : false;
    }
    defaultMessage?(args?: ValidationArguments): string {
        console.log(args);
        
        return 'La valeur css  ($value) est invalide.'
    }

}