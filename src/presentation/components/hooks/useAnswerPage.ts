import { PokemonName } from 'domain/value/PokemonName';
import { useThrottle } from '@react-hook/throttle';
import { useEffect, useMemo, useState } from 'react';
import { SolveResult } from 'application/query/model/SolveResult';
import { ExpectValueResult } from 'application/query/model/ExpectValueResult';
import {
  GEN_DIAMOND_PEARL,
  Generation,
  getGenerationsUntil,
} from 'domain/value/Generation';
import { fetchCalculateResult } from 'infrastructure/api/controller/CalculateController';
import {
  characterStatuses,
  UNUSED,
} from 'application/query/value/CharacterStatus';
import { TARGET_NAME_LEN } from 'constants/config';
import { AnswerPageData } from 'presentation/model/AnswerPageData';

const MAX_CELL_SIZE = 35;

type Props = {
  usedNames: PokemonName[];
};
const useAnswerPage = ({ usedNames }: Props): AnswerPageData => {
  const [cellSize, setCellSize] = useThrottle(MAX_CELL_SIZE);
  const [results, setResults] = useState<SolveResult[]>([]);
  const [recommends, setRecommends] = useState<ExpectValueResult[]>([]);
  const [selectedRecommend, setSelectedRecommend] =
    useState<null | ExpectValueResult>(null);
  const [generation, setGeneration] = useState<Generation>(GEN_DIAMOND_PEARL);
  const generations = useMemo<Generation[]>(() => {
    return getGenerationsUntil(generation);
  }, [generation]);

  useEffect(() => {
    fetchCalculateResult({
      generations,
      usedNames: [...usedNames, ...results.map((result) => result.input)],
      results,
    }).then((resp) => {
      setRecommends(resp.expectValues);
    });
  }, [generations, results]);

  useEffect(() => {
    const listener = () => {
      const newCellSize = Math.min(window.innerWidth / 15, MAX_CELL_SIZE);
      if (cellSize !== newCellSize) {
        setCellSize(newCellSize);
      }
    };
    listener();
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);

  const cellClickHandler = (resultIndex: number, cellIndex: number) => {
    setResults(
      results.map((result, i) =>
        i !== resultIndex
          ? result
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

  const clearHandler = () => {
    setResults([]);
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

  return {
    generation: generation,
    onChangeGeneration: setGeneration,
    onClear: clearHandler,
    recommends: recommends,
    selectedRecommend: selectedRecommend,
    onClickRecommend: setSelectedRecommend,
    onSubmit: submitHandler,
    answerGridProps: {
      results,
      cellOnClick: cellClickHandler,
      rowProps: { cellProps: { size: cellSize } },
    },
  };
};
export default useAnswerPage;
