import Style from 'presentation/components/pages/NormalPageView.module.scss';
import WidthManager from 'presentation/components/atoms/WidthManager';
import { ComponentProps, VFC } from 'react';
import AnswerGrid from 'presentation/components/organisms/AnswerGrid';
import { Box, Button, Grid } from '@mui/material';

type Props = {
  answerGridProps: ComponentProps<typeof AnswerGrid>;
};
const NormalPageView: VFC<Props> = (props) => {
  return (
    <WidthManager className={Style.container}>
      <AnswerContainer {...props} />
      <RecommendContainer {...props} />
    </WidthManager>
  );
};
const AnswerContainer: VFC<Props> = ({ answerGridProps }) => {
  const { results, rowProps, cellOnClick } = answerGridProps;
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
const RecommendContainer: VFC<Props> = () => {
  return (
    <Grid
      className={Style.recommend}
      container
      direction={'column'}
      justifyContent={'space-between'}
    >
      <Grid item xs={11} overflow={'auto'}>
        Panels
      </Grid>
      <Grid item xs={1} textAlign={'center'}>
        <Button variant={'contained'} size={'large'}>
          決定
        </Button>
      </Grid>
    </Grid>
  );
};
export default NormalPageView;
