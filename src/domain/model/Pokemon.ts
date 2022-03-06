import { PokemonNo } from 'domain/value/PokemonNo';
import { PokemonName } from 'domain/value/PokemonName';
import { Generation } from 'domain/value/Generation';
import { TARGET_NAME_LEN } from 'constants/config';
import { pokemonList } from 'constants/pokemonList';

export interface Pokemon {
  no: PokemonNo;
  name: PokemonName;
  generation: Generation;
}

export const isTargetPokemon = (pokemon: Pokemon) => {
  return pokemon.name.length === TARGET_NAME_LEN;
};

export const getTargetPokemonList = (filterOption?: {
  generations?: Generation[];
}) => {
  return pokemonList
    .filter(isTargetPokemon)
    .filter(
      (pokemon) =>
        !filterOption?.generations ||
        filterOption.generations.includes(pokemon.generation)
    );
};
