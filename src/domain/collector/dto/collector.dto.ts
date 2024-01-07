import { IsString,  } from "class-validator";

export class CollectorDto {
     
    @IsString()
    amount: number;

    @IsString()
    asset_currency: string ;
    
    @IsString()
    converted_currency: string ;
}
