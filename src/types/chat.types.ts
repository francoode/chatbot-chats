import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

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
}

export class AddMessage {
    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    chatId: number;

    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    optionSelectedId: number;

    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    presetMessageId: number;
}