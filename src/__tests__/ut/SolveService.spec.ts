import { calcAllExpectValues } from 'application/service/SolveService';
import { BLOW, HIT, UNUSED } from 'application/query/value/CharacterStatus';
import { GEN_RED_GREEN } from 'domain/value/Generation';

describe('calculate test', () => {
  test('hit test', () => {
    const evResult = calcAllExpectValues(
      [
        { name: 'フーディン', no: 1, generation: GEN_RED_GREEN },
        { name: 'ベイリーフ', no: 2, generation: GEN_RED_GREEN },
      ],
      [],
      [
        {
          input: 'フタチマル',
          statuses: [HIT, UNUSED, UNUSED, UNUSED, UNUSED],
        },
      ]
    );
    const possibleNames = evResult
      .filter((item) => item.possible)
      .map((item) => item.pokemon.name);

    // HIT の文字が一致 -> true
    expect(possibleNames).toContain('フーディン');

    // HIT の文字が不一致 -> false
    expect(possibleNames).not.toContain('ベイリーフ');
  });

  test('blow test', () => {
    const evResult = calcAllExpectValues(
      [
        { name: 'フーディン', no: 1, generation: GEN_RED_GREEN },
        { name: 'ベイリーフ', no: 2, generation: GEN_RED_GREEN },
        { name: 'リザードン', no: 3, generation: GEN_RED_GREEN },
      ],
      [],
      [
        {
          input: 'フタチマル',
          statuses: [BLOW, UNUSED, UNUSED, UNUSED, UNUSED],
        },
      ]
    );
    const possibleNames = evResult
      .filter((item) => item.possible)
      .map((item) => item.pokemon.name);

    // BLOW の文字が一致 -> false
    expect(possibleNames).not.toContain('フーディン');

    // BLOW の文字が不一致 ∩ 含まれている -> true
    expect(possibleNames).toContain('ベイリーフ');

    // BLOW の文字が不一致 ∩ 含まれていない -> false
    expect(possibleNames).not.toContain('リザードン');
  });

  test('unused test', () => {
    const evResult = calcAllExpectValues(
      [
        { name: 'ゴローニャ', no: 1, generation: GEN_RED_GREEN },
        { name: 'ベイリーフ', no: 2, generation: GEN_RED_GREEN },
      ],
      [],
      [
        {
          input: 'フタチマル',
          statuses: [UNUSED, UNUSED, UNUSED, UNUSED, UNUSED],
        },
      ]
    );
    const possibleNames = evResult
      .filter((item) => item.possible)
      .map((item) => item.pokemon.name);

    // UNUSED の文字が含まれていない -> true
    expect(possibleNames).toContain('ゴローニャ');

    // UNUSED の文字が含まれている -> false
    expect(possibleNames).not.toContain('ベイリーフ');
  });

  test('duplicated test - 2 input 1 hit', () => {
    const evResult = calcAllExpectValues(
      [
        { name: 'ワンリキー', no: 1, generation: GEN_RED_GREEN },
        { name: 'フリーザー', no: 2, generation: GEN_RED_GREEN },
      ],
      [],
      [
        {
          input: 'ドーミラー',
          statuses: [UNUSED, UNUSED, UNUSED, UNUSED, HIT],
        },
      ]
    );
    const possibleNames = evResult
      .filter((item) => item.possible)
      .map((item) => item.pokemon.name);

    // １文字 -> true
    expect(possibleNames).toContain('ワンリキー');

    // ２文字 -> false
    expect(possibleNames).not.toContain('フリーザー');
  });

  test('duplicated test - 2 input 2 hit', () => {
    const evResult = calcAllExpectValues(
      [
        { name: 'ワンリキー', no: 1, generation: GEN_RED_GREEN },
        { name: 'ゴーリキー', no: 2, generation: GEN_RED_GREEN },
        { name: 'フリーザー', no: 3, generation: GEN_RED_GREEN },
      ],
      [],
      [
        {
          input: 'ドーミラー',
          statuses: [UNUSED, HIT, UNUSED, UNUSED, HIT],
        },
      ]
    );
    const possibleNames = evResult
      .filter((item) => item.possible)
      .map((item) => item.pokemon.name);

    // １文字 -> false
    expect(possibleNames).not.toContain('ワンリキー');

    // 2 HIT -> true
    expect(possibleNames).toContain('ゴーリキー');

    // 1 HIT 1 BLOW -> false
    expect(possibleNames).not.toContain('フリーザー');
  });

  test('duplicated test - 2 input 1 hit 1 blow', () => {
    const evResult = calcAllExpectValues(
      [
        { name: 'ワンリキー', no: 1, generation: GEN_RED_GREEN },
        { name: 'ゴーリキー', no: 2, generation: GEN_RED_GREEN },
        { name: 'フリーザー', no: 3, generation: GEN_RED_GREEN },
      ],
      [],
      [
        {
          input: 'ドーミラー',
          statuses: [UNUSED, BLOW, UNUSED, UNUSED, HIT],
        },
      ]
    );
    const possibleNames = evResult
      .filter((item) => item.possible)
      .map((item) => item.pokemon.name);

    // １文字 -> false
    expect(possibleNames).not.toContain('ワンリキー');

    // 2 HIT -> false
    expect(possibleNames).not.toContain('ゴーリキー');

    // 1 HIT 1 BLOW -> true
    expect(possibleNames).toContain('フリーザー');
  });
});
