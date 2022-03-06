import { getTargetPokemonList } from 'domain/model/Pokemon';
import {
  GEN_DIAMOND_PEARL,
  GEN_GOLD_SILVER,
  GEN_RED_GREEN,
  GEN_RUBY_SAPPHIRE,
} from 'domain/value/Generation';
import { calcAllExpectValues } from 'application/service/SolveService';

export const main = () => {
  const list = getTargetPokemonList({
    generations: [
      GEN_RED_GREEN,
      GEN_GOLD_SILVER,
      GEN_RUBY_SAPPHIRE,
      GEN_DIAMOND_PEARL,
    ],
  });
  const result = calcAllExpectValues(
    list,
    [],
    [
      // { input: 'レントラー', statuses: [UNUSED, BLOW, BLOW, UNUSED, UNUSED] },
    ]
  );
  console.log(result.slice(0, 20));
};
main();
