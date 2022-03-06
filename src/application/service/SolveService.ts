import { getTargetPokemonList, Pokemon } from 'domain/model/Pokemon';
import {
  matchAnswerResult,
  solve,
  SolveResult,
} from 'application/query/model/SolveResult';
import { serializeCharacterStatuses } from 'application/query/value/CharacterStatus';
import { PokemonName } from 'domain/value/PokemonName';
import { ExpectValueResult } from 'application/query/model/ExpectValueResult';

/**
 * 全ポケモン選択時の期待値計算
 * @param list
 * @param usedNames
 * @param results
 * @return 期待値計算結果配列（期待値昇順ソート）
 */
export const calcAllExpectValues = (
  list: Pokemon[],
  usedNames: PokemonName[],
  results: SolveResult[]
): ExpectValueResult[] => {
  // 入力可能なポケモン一覧
  const usableList = getTargetPokemonList().filter(
    (pokemon) => !usedNames.includes(pokemon.name)
  );
  // 正解の可能性があるポケモン一覧
  const possibleList = list.filter((pokemon) =>
    results.every((result) => matchAnswerResult(pokemon.name, result))
  );
  console.log(possibleList.length + '/' + usableList.length);
  const possibleNameList = possibleList.map((v) => v.name);
  const evResults = usableList.map<ExpectValueResult>((pokemon) => {
    const size = possibleList.length;
    const possible = possibleNameList.includes(pokemon.name);
    const serializedCountMap = new Map<number, number>();
    possibleList.forEach((answer) => {
      const result = solve(pokemon.name, answer.name);
      const serializedValue = serializeCharacterStatuses(result.statuses);
      serializedCountMap.set(
        serializedValue,
        (serializedCountMap.get(serializedValue) || 0) + 1
      );
    });
    let ev: number = 0;
    Array.from(serializedCountMap).forEach(([_, count]) => {
      ev += count * (count / size);
    });
    return { pokemon, ev, possible };
  });
  // 期待値昇順, 可能性(有<無) ソート
  evResults.sort((a, b) => {
    if (a.ev !== b.ev) return a.ev - b.ev;
    if (a.possible !== b.possible)
      return Number(b.possible) - Number(a.possible);
    return 1;
  });
  return evResults;
};
