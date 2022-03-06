import { ComponentProps, VFC } from 'react';
import { Grid } from '@mui/material';
import { SolveResult } from 'application/query/model/SolveResult';
import AnswerRow from 'presentation/components/organisms/AnswerRow';

const ROW_COUNT = 5;

type Props = {
  /** 回答結果 */
  results: SolveResult[];
  /** 列 Props */
  rowProps: Omit<ComponentProps<typeof AnswerRow>, 'result'>;
};
const AnswerGrid: VFC<Props> = ({ results, rowProps }) => {
  const paddedResults: (null | SolveResult)[] = [
    ...results,
    ...[...Array(ROW_COUNT)].fill(null),
  ].slice(0, ROW_COUNT);

  return (
    <Grid container spacing={0.5}>
      {paddedResults.map((result) => {
        return (
          <Grid item xs={12}>
            <AnswerRow result={result} {...rowProps} />
          </Grid>
        );
      })}
    </Grid>
  );
};
export default AnswerGrid;
