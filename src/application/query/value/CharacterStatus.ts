/** 無使用 */
export const UNUSED = 'UNUSED';
/** ヒット */
export const HIT = 'HIT';
/** ブロー*/
export const BLOW = 'BLOW';

export const characterStatuses = [UNUSED, HIT, BLOW] as const;

/**
 * 文字ステータス
 */
export type CharacterStatus = typeof characterStatuses[number];

/**
 * 文字ステータス配列のシリアライズ
 * @param statuses
 */
export const serializeCharacterStatuses = (
  statuses: CharacterStatus[]
): number => {
  let value = 0;
  statuses.forEach((status) => {
    value *= characterStatuses.length + 1;
    value += characterStatuses.findIndex((item) => item === status) + 1;
  });
  return value;
};

/**
 * 文字ステータス配列のデシリアライズ
 * @param serializedValue
 */
export const deserializeCharacterStatuses = (
  serializedValue: number
): CharacterStatus[] => {
  const statuses: CharacterStatus[] = [];
  while (serializedValue > 0) {
    const statusIndex = (serializedValue % (characterStatuses.length + 1)) - 1;
    statuses.unshift(characterStatuses[statusIndex]);
    serializedValue = Math.floor(
      serializedValue / (characterStatuses.length + 1)
    );
  }
  return statuses;
};
