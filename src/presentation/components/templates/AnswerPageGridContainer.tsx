import { VFC } from 'react';
import { Grid } from '@mui/material';
import AnswerGrid from 'presentation/components/organisms/AnswerGrid';
import { AnswerPageData } from 'presentation/model/AnswerPageData';

type Props = AnswerPageData;
const AnswerPageGridContainer: VFC<Props> = ({ answerGridProps }) => {
  const { results, rowProps, cellOnClick } = answerGridProps;
  // NOTE: 0~5, 6~10 に分割
  return (
    <Grid container spacing={1} justifyContent={'center'}>
      <Grid item xs={5}>
        <AnswerGrid
          results={results.slice(0, 5)}
          cellOnClick={
            typeof cellOnClick === 'function' ? cellOnClick : undefined
          }
          rowProps={rowProps}
        />
      </Grid>
      <Grid item xs={5}>
        <AnswerGrid
          results={results.slice(5, 10)}
          cellOnClick={
            typeof cellOnClick === 'function'
              ? (resultIndex, cellIndex) =>
                  cellOnClick(resultIndex + 5, cellIndex)
              : undefined
          }
          rowProps={rowProps}
        />
      </Grid>
    </Grid>
  );
};
export default AnswerPageGridContainer;
