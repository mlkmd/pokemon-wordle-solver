/** 赤・緑 */
export const GEN_RED_GREEN = 'GEN_RED_GREEN';
/** 金・銀 */
export const GEN_GOLD_SILVER = 'GEN_GOLD_SILVER';
/** ルビー・サファイア */
export const GEN_RUBY_SAPPHIRE = 'GEN_RUBY_SAPPHIRE';
/** ダイアモンド・パール */
export const GEN_DIAMOND_PEARL = 'GEN_DIAMOND_PEARL';
/** ブラック・ホワイト */
export const GEN_BLACK_WHITE = 'GEN_BLACK_WHITE';
/** X・Y */
export const GEN_X_Y = 'GEN_X_Y';
/** サン・ムーン */
export const GEN_SUN_MOON = 'GEN_SUN_MOON';
/** ソード・シールド */
export const GEN_SWORD_SHIELD = 'GEN_SWORD_SHIELD';

export const generations = [
  GEN_RED_GREEN,
  GEN_GOLD_SILVER,
  GEN_RUBY_SAPPHIRE,
  GEN_DIAMOND_PEARL,
  GEN_BLACK_WHITE,
  GEN_X_Y,
  GEN_SUN_MOON,
  GEN_SWORD_SHIELD,
] as const;

/**
 * 世代
 */
export type Generation = typeof generations[number];

/**
 * 指定世代までの世代一覧を取得する
 * @param generation
 */
export const getGenerationsUntil = (generation: Generation): Generation[] =>
  generations.slice(0, generations.findIndex((v) => v === generation) + 1);
