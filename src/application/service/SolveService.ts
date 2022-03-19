import { getTargetPokemonList, Pokemon } from 'domain/model/Pokemon';
import {
  matchAnswerResult,
  SolveResult,
} from 'application/query/model/SolveResult';
import {
  BLOW,
  CharacterStatus,
  HIT,
  serializeCharacterStatuses,
  UNUSED,
} from 'application/query/value/CharacterStatus';
import { PokemonName } from 'domain/value/PokemonName';
import { ExpectValueResult } from 'application/query/model/ExpectValueResult';
import { TARGET_NAME_LEN } from 'constants/config';

/**
 * 入力ポケモン名と正解ポケモン名から回答結果を算出
 * @param input
 * @param answer
 */
export const solve = (input: PokemonName, answer: PokemonName): SolveResult => {
  // HIT している場所に HIT、それ以外の場所に UNUSED を設定
  const statuses = [...new Array(TARGET_NAME_LEN)].map<CharacterStatus>(
    (_, index) => (input.charAt(index) === answer.charAt(index) ? HIT : UNUSED)
  );

  // 正解文字列の中で HIT でない文字の個数を算出
  const blowCountMap = new Map<string, number>();
  statuses.forEach((status, index) => {
    if (status !== HIT) {
      blowCountMap.set(
        answer.charAt(index),
        (blowCountMap.get(answer.charAt(index)) || 0) + 1
      );
    }
  });

  // 正解の文字列と一致する文字を BLOW に置換（複数個存在する場合は左側の文字が優先）
  for (let index = 0; index < TARGET_NAME_LEN; index++) {
    if (statuses[index] === HIT) continue;
    const character = input.charAt(index);
    if (!blowCountMap.has(character)) continue;
    if ((blowCountMap.get(character) || 0) <= 0) continue;
    statuses[index] = BLOW;
    blowCountMap.set(character, (blowCountMap.get(character) || 1) - 1);
  }

  return {
    input,
    statuses,
  };
};

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
