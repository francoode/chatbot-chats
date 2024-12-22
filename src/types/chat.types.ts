import { ParseIntPipe } from "@nestjs/common";
import { IsNotEmpty, IsNumberString } from "class-validator";

export type ChatCreateData = {
    userId: string;
    
}

export type CheckChatExistsData = {
    userId: string;
}

export class CreateChatDto {
    @IsNotEmpty()
    @IsNumberString()
    userId: string;
}