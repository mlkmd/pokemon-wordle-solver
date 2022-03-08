import {
  GEN_BLACK_WHITE,
  GEN_DIAMOND_PEARL,
  GEN_GOLD_SILVER,
  GEN_RED_GREEN,
  GEN_RUBY_SAPPHIRE,
  GEN_SUN_MOON,
  GEN_SWORD_SHIELD,
  GEN_X_Y,
  Generation,
} from 'domain/value/Generation';
import { GenerationName } from 'domain/value/GenerationName';

export type GenerationEnumValue<K extends Generation = Generation> = {
  id: K;
  name: GenerationName;
};
export const GenerationEnum: { [K in Generation]: GenerationEnumValue<K> } = {
  [GEN_RED_GREEN]: { id: GEN_RED_GREEN, name: '赤・緑' },
  [GEN_GOLD_SILVER]: { id: GEN_GOLD_SILVER, name: '金・銀' },
  [GEN_RUBY_SAPPHIRE]: { id: GEN_RUBY_SAPPHIRE, name: 'ルビー・サファイア' },
  [GEN_DIAMOND_PEARL]: { id: GEN_DIAMOND_PEARL, name: 'ダイアモンド・パール' },
  [GEN_BLACK_WHITE]: { id: GEN_BLACK_WHITE, name: 'ブラック・ホワイト' },
  [GEN_X_Y]: { id: GEN_X_Y, name: 'X・Y' },
  [GEN_SUN_MOON]: { id: GEN_SUN_MOON, name: 'サン・ムーン' },
  [GEN_SWORD_SHIELD]: { id: GEN_SWORD_SHIELD, name: 'ソード・シールド' },
};
