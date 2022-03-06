import { ComponentProps, VFC } from 'react';
import { Grid } from '@mui/material';
import { SolveResult } from 'application/query/model/SolveResult';
import AnswerCell from 'presentation/components/atoms/AnswerCell';
import { TARGET_NAME_LEN } from 'constants/config';

type Props = {
  /** 回答結果 */
  result: null | SolveResult;
  /** セル Props */
  cellProps: Omit<ComponentProps<typeof AnswerCell>, 'status' | 'character'>;
};
const AnswerRow: VFC<Props> = ({ result, cellProps }) => {
  return (
    <Grid container spacing={0.5}>
      {(result?.statuses || [...Array(TARGET_NAME_LEN)].fill(null)).map(
        (status, index) => {
          const character = result?.input.charAt(index) || '';
          return (
            <Grid item>
              <AnswerCell
                character={character}
                status={status}
                {...cellProps}
              />
            </Grid>
          );
        }
      )}
    </Grid>
  );
};
export default AnswerRow;
