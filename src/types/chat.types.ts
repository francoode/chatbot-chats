import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export type ChatCreateData = {
    userId: number;
    
}

export type CheckChatExistsData = {
    userId: number;
}

export class CreateChatDto {
    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsString()
    internalId: string;
}

