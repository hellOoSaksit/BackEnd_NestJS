import { IsEmail, IsString } from "class-validator";

export class CreateUserinfoDto {
    @IsEmail({},{message:'Input Email @ or . '})
    email:string;

    @IsString({message:'Input String (Password)'})
    password:string;

    @IsString({message:'Input String (PhoneNumber)'})
    phone:string;
}
