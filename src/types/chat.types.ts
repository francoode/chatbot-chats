import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export type ChatCreateData = {
    userId: number;
    
}

export type CheckChatExistsData = {
    userId: number;
}

export enum SourceMessage {
    CLIENT = "CLIENT",
    SERVER = "SERVER",
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