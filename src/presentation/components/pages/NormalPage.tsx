import { NextPage } from 'next';
import AppLayout from 'presentation/components/layouts/AppLayout';
import NormalPageView from 'presentation/components/pages/NormalPageView';
import { useEffect, useState } from 'react';
import { SolveResult } from 'application/query/model/SolveResult';
import { ExpectValueResult } from 'application/query/model/ExpectValueResult';
import { calcAllExpectValues } from 'application/service/SolveService';
import { getTargetPokemonList } from 'domain/model/Pokemon';
import {
  GEN_DIAMOND_PEARL,
  GEN_GOLD_SILVER,
  GEN_RED_GREEN,
  GEN_RUBY_SAPPHIRE,
} from 'domain/value/Generation';
import { TARGET_NAME_LEN } from 'constants/config';
import {
  characterStatuses,
  UNUSED,
} from 'application/query/value/CharacterStatus';

const MAX_CELL_SIZE = 35;

type Props = {};
const NormalPage: NextPage<Props> = (props) => {
  const [cellSize, setCellSize] = useState(MAX_CELL_SIZE);
  const [results, setResults] = useState<SolveResult[]>([]);
  const [recommends, setRecommends] = useState<ExpectValueResult[]>([]);
  const [selectedRecommend, setSelectedRecommend] =
    useState<null | ExpectValueResult>(null);

  useEffect(() => {
    const newRecommends = calcAllExpectValues(
      getTargetPokemonList({
        generations: [
          GEN_RED_GREEN,
          GEN_GOLD_SILVER,
          GEN_RUBY_SAPPHIRE,
          GEN_DIAMOND_PEARL,
        ],
      }),
      results.map((result) => result.input),
      results
    );
    setRecommends(newRecommends);
  }, [results]);

  useEffect(() => {
    const listener = () => {
      const newCellSize = Math.min(window.innerWidth / 15, MAX_CELL_SIZE);
      if (cellSize !== newCellSize) {
        setCellSize(newCellSize);
      }
    };
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);

  const cellClickHandler = (resultIndex: number, cellIndex: number) => {
    setResults(
      results.map((result, i) =>
        i !== resultIndex
          ? { ...result }
          : {
              ...result,
              statuses: result.statuses.map((status, j) =>
                j !== cellIndex
                  ? status
                  : characterStatuses[
                      (characterStatuses.findIndex((v) => v === status) + 1) %
                        characterStatuses.length
                    ]
              ),
            }
      )
    );
  };

  const submitHandler = () => {
    if (selectedRecommend === null) return;
    setResults([
      ...results,
      {
        input: selectedRecommend.pokemon.name,
        statuses: [...Array(TARGET_NAME_LEN)].fill(UNUSED),
      },
    ]);
    setSelectedRecommend(null);
  };

  return (
    <AppLayout pageTitle={'通常モード'}>
      <NormalPageView
        recommends={recommends}
        selectedRecommend={selectedRecommend}
        onClickRecommend={setSelectedRecommend}
        onSubmit={submitHandler}
        answerGridProps={{
          results,
          cellOnClick: cellClickHandler,
          rowProps: {
            cellProps: {
              size: cellSize,
            },
          },
        }}
      />
    </AppLayout>
  );
};
export default NormalPage;
