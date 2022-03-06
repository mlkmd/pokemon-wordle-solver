import { pokemonList } from 'constants/pokemonList';
import { GEN_RED_GREEN } from 'domain/value/Generation';
import { matchAnswerResult } from 'application/query/model/SolveResult';
import {
  CharacterStatus,
  HIT,
  UNUSED,
} from 'application/query/value/CharacterStatus';
import { PokemonName } from 'domain/value/PokemonName';
import { getTargetPokemonList } from 'domain/model/Pokemon';

export const main = () => {
  const list = getTargetPokemonList({ generations: [GEN_RED_GREEN] });
  console.log(pokemonList.length + '->' + list.length);
  const input: PokemonName = 'ドーミラー';
  const statuses: CharacterStatus[] = [UNUSED, HIT, UNUSED, UNUSED, HIT];
  const filteredList = list.filter((pokemon) =>
    matchAnswerResult(pokemon.name, { input: input, statuses })
  );
  console.log(`input: ${input}`);
  console.log(`result: ${statuses}`);
  console.log(filteredList);
  console.log(list.length + '->' + filteredList.length);
};
main();
