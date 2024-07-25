import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class Pokemon extends Document {

    // id me lo da mongo : string
    @Prop({
        unique: true,
        index: true
    })
    name: string;

    @Prop({
        unique: true,
        index: true
    })
    no: number;

}




export const pokemonSchema = SchemaFactory.createForClass(Pokemon);