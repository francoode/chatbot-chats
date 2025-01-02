import { Exclude } from "class-transformer";
import { PresetMessageOption } from "../entities/preset-options.model";

export class PresetMessageOptionSerializer {

    @Exclude()
    id: any;

    constructor(partial: Partial<PresetMessageOption>) {
        Object.assign(this, partial);
    }
}