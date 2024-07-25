import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) { }
  private readonly axios: AxiosInstance = axios;

  @Get()
  async executeSeed() {
    let {data} = await this.axios.get<PokeResponse>("https://pokeapi.co/api/v2/pokemon?limit=650");

    const pokemons= data.results.map((pokemon)=>{
      const segments = pokemon.url.split("/");
      const id = +segments[segments.length-2];
      return{
        name:pokemon.name,
        no:id
      } 
    })
    


    return pokemons;
  }
}
