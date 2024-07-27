import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  private readonly axios:AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>

  ) { }

  async executeSeed() {
    await this.pokemonModel.deleteMany({});
    
    let {data} = await this.axios.get<PokeResponse>("https://pokeapi.co/api/v2/pokemon?limit=650");


    const pokemonToInsert :{name:string,no:number}[] = data.results.map(({url,name})=>{
      const segments = url.split("/");
      const id = +segments[segments.length-2];
      return{
        name:name,
        no:id
      }
    })
    
    this.pokemonModel.insertMany(pokemonToInsert)

    return "Seed executed";
  }
}
