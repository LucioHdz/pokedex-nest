import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>


  ) {

  }


  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto)
      return pokemon;

    } catch (error) {
      this.handleException(error)
    }

  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(id: string) {

    let pokemon: Pokemon;

    if (!isNaN(+id)) {
      // No. pokemon
      pokemon = await this.pokemonModel.findOne({ no: id })
    } else if (isValidObjectId(id)) {
      // Mongo ID
      pokemon = await this.pokemonModel.findById(id);
    } else {
      //Name 

      pokemon = await this.pokemonModel.findOne({ name: id.toLowerCase() });
    }

    if (!pokemon) throw new NotFoundException(`pokemon with id, name or No "${id}" not found`)
    return pokemon
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    try {
      const pokemonupdate = await this.pokemonModel.findByIdAndUpdate(pokemon._id, updatePokemonDto)
    } catch (error) {
      this.handleException(error)
    }


    return { ...pokemon.toJSON(), ...updatePokemonDto };
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();
    // const result = await this.pokemonModel.findByIdAndDelete(id);

    const result = await this.pokemonModel.deleteOne({ _id: id})

    if(result.deletedCount=== 0)
      throw new BadRequestException(`pokeon with id "${id}" not found`);
    return;
  }



  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exist in db '${JSON.stringify(error.keyValue)}'`)
    } else {
      console.log(error);
      throw new InternalServerErrorException(`Can't update pokemon - Check server logs`);
    }
  }
}
