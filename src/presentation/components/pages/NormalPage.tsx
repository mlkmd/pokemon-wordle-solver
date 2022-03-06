import { NextPage } from 'next';
import AppLayout from 'presentation/components/layouts/AppLayout';
import NormalPageView from 'presentation/components/pages/NormalPageView';
import { ComponentProps, useEffect, useMemo, useState } from 'react';
import { SolveResult } from 'application/query/model/SolveResult';

const MAX_CELL_SIZE = 35;

type Props = Omit<ComponentProps<typeof NormalPageView>, 'answerGridProps'>;
const NormalPage: NextPage<Props> = (props) => {
  const [cellSize, setCellSize] = useState(MAX_CELL_SIZE);
  const [results, setResults] = useState<SolveResult[]>([]);

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

  return (
    <AppLayout pageTitle={'通常モード'}>
      <NormalPageView
        answerGridProps={{
          results,
          rowProps: {
            cellProps: {
              size: cellSize,
            },
          },
        }}
        {...props}
      />
    </AppLayout>
  );
};
export default NormalPage;
