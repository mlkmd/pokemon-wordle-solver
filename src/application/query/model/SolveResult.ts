import { PokemonName } from 'domain/value/PokemonName';
import {
  BLOW,
  CharacterStatus,
  HIT,
  UNUSED,
} from 'application/query/value/CharacterStatus';
import { TARGET_NAME_LEN } from 'constants/config';

/**
 * 回答結果
 */
export interface SolveResult {
  /**
   * 回答ポケモン名
   */
  input: PokemonName;
  /**
   * ステータス配列
   * - １文字ずつの判定結果を配列で渡す（Length === TARGET_NAME_LEN)
   */
  statuses: CharacterStatus[];
}

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

class MatchCondition {
  private readonly character: string;

  private readonly unusedIndexes: number[];
  private readonly hitIndexes: number[];
  private readonly blowIndexes: number[];
  private readonly min: number = 0;
  private readonly max: number = TARGET_NAME_LEN;

  /**
   * @param character
   * @param statuses ステータス配列
   * - character の文字と一致しない要素は null を与える
   */
  constructor(character: string, statuses: (null | CharacterStatus)[]) {
    if (statuses.every((status) => status === null)) {
      throw new Error(`Invalid Argument: 有効なステータスが存在しません。`);
    }
    this.character = character;

    const getIndexesByStatus = (targetStatus: CharacterStatus): number[] => {
      return statuses.reduce<number[]>(
        (prev, status, index) =>
          status === targetStatus ? [...prev, index] : prev,
        []
      );
    };

    this.unusedIndexes = getIndexesByStatus(UNUSED);
    this.hitIndexes = getIndexesByStatus(HIT);
    this.blowIndexes = getIndexesByStatus(BLOW);
    const hitOrBlowCount = this.hitIndexes.length + this.blowIndexes.length;

    this.min = hitOrBlowCount;
    if (this.unusedIndexes.length > 0) {
      this.max = hitOrBlowCount;
    }
  }

  /**
   * ステータスと一致するポケモン名であるか判定
   */
  public match(name: PokemonName): boolean {
    const indexes: number[] = name
      .split('')
      .reduce<number[]>(
        (prev, character, index) =>
          character === this.character ? [...prev, index] : prev,
        []
      );
    // 最小個数より少ない => false
    if (indexes.length < this.min) return false;
    // 最大個数より多い => false
    if (indexes.length > this.max) return false;
    // ヒットしていない場所(unused, blow)に文字が存在 => false
    if (this.unusedIndexes.some((unusedIndex) => indexes.includes(unusedIndex)))
      return false;
    if (this.blowIndexes.some((blowIndex) => indexes.includes(blowIndex)))
      return false;
    // ヒットしている場所に文字が存在している => true
    return this.hitIndexes.every((hitIndex) => indexes.includes(hitIndex));
  }
}

/**
 * 回答結果のステータスを満たすポケモン名であるか判定
 */
export const matchAnswerResult = (name: PokemonName, result: SolveResult) => {
  // １文字ずつ配列化
  const characters = result.input.split('');
  // 文字とその要素番号配列
  const characterIndexMap = new Map<string, number[]>();
  characters.forEach((character, index) => {
    characterIndexMap.set(character, [
      ...(characterIndexMap.get(character) || []),
      index,
    ]);
  });
  // 文字ごとの条件一覧
  const conditions = Array.from(characterIndexMap).map(
    ([character, indexes]) =>
      new MatchCondition(
        character,
        result.statuses.map((status, index) =>
          indexes.includes(index) ? status : null
        )
      )
  );
  // 条件を全て満たす => True
  return conditions.every((condition) => condition.match(name));
};
