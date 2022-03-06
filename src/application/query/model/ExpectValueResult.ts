import { Pokemon } from 'domain/model/Pokemon';
import { ExpectedValue } from 'domain/value/ExpectedValue';

export type ExpectValueResult = {
  /** ポケモン情報 */
  pokemon: Pokemon;
  /** 期待値 */
  ev: ExpectedValue;
  /** 正解可能性 */
  possible: boolean;
};
