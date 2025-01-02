import { Exclude, Type } from "class-transformer";
import { Message } from "../entities/message.model";
import { PresetMessageSerializer } from "./preset-message.dto";

export class MessageSerializer {

    @Type(() => PresetMessageSerializer)
    presetMessage: PresetMessageSerializer;
  
    constructor(partial: Partial<Message>) {
      Object.assign(this, partial);
    }
}