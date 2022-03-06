import { ComponentProps, VFC } from 'react';
import { Grid } from '@mui/material';
import { SolveResult } from 'application/query/model/SolveResult';
import AnswerRow from 'presentation/components/organisms/AnswerRow';

const ROW_COUNT = 5;

type Props = {
  /** 回答結果 */
  results: SolveResult[];
  /** セルクリック */
  cellOnClick?: (resultIndex: number, cellIndex: number) => void;
  /** 列 Props */
  rowProps: Omit<ComponentProps<typeof AnswerRow>, 'result' | 'onClickCell'>;
};
const AnswerGrid: VFC<Props> = ({ results, cellOnClick, rowProps }) => {
  const paddedResults: (null | SolveResult)[] = [
    ...results,
    ...[...Array(ROW_COUNT)].fill(null),
  ].slice(0, ROW_COUNT);

  return (
    <Grid container spacing={0.5} justifyContent={'center'}>
      {paddedResults.map((result, index) => {
        return (
          <Grid key={index} item xs={12}>
            <AnswerRow
              result={result}
              onClickCell={
                result !== null && typeof cellOnClick === 'function'
                  ? (cellIndex) => cellOnClick(index, cellIndex)
                  : undefined
              }
              {...rowProps}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
export default AnswerGrid;
