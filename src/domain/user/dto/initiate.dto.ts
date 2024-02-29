import { IsString,  } from "class-validator";

export class initiateAdminDto {
     
    @IsString()
    username: string;
    @IsString()
    password: string;

}