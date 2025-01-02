import { Exclude, instanceToPlain, Type } from "class-transformer";
import { Chat } from "../entities/chat.model";
import { PresetMessageOptionSerializer } from "src/messages/dtos/message-option.dto";
import { Message } from "src/messages/entities/message.model";
import { MessageSerializer } from "src/messages/dtos/message.dto";

export class ChatSerializer {
    @Type(() => MessageSerializer)
    messages: MessageSerializer;

    constructor(partial: Partial<Chat>) {
        Object.assign(this, partial);
    }
}