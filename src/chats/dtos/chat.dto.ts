import { Chat } from "../entities/chat.model";
export class ChatSerializer {
    constructor(partial: Partial<Chat>) {
        Object.assign(this, partial);
    }
}