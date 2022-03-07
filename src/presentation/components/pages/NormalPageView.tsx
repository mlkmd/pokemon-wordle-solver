import Style from 'presentation/components/pages/NormalPageView.module.scss';
import WidthManager from 'presentation/components/atoms/WidthManager';
import { ComponentProps, VFC } from 'react';
import AnswerGrid from 'presentation/components/organisms/AnswerGrid';
import { Box, Button, Grid } from '@mui/material';
import { ExpectValueResult } from 'application/query/model/ExpectValueResult';

type Props = {
  recommends: ExpectValueResult[];
  selectedRecommend: null | ExpectValueResult;
  onClickRecommend: (recommend: ExpectValueResult) => void;
  onClear: () => void;
  onSubmit: () => void;
  answerGridProps: ComponentProps<typeof AnswerGrid>;
};
const NormalPageView: VFC<Props> = (props) => {
  return (
    <WidthManager className={Style.container}>
      <AnswerContainer {...props} />
      <ButtonsContainer {...props} />
      <RecommendContainer {...props} />
    </WidthManager>
  );
};
const AnswerContainer: VFC<Props> = ({ answerGridProps }) => {
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
const ButtonsContainer: VFC<Props> = ({ onClear }) => {
  return (
    <Box textAlign={'center'} marginTop={'2rem'}>
      <Button onClick={onClear} variant={'contained'} size={'large'}>
        クリア
      </Button>
    </Box>
  );
};
const RecommendContainer: VFC<Props> = ({
  recommends,
  selectedRecommend,
  onClickRecommend,
  onSubmit,
}) => {
  return (
    <Box className={Style.recommend}>
      <Box textAlign={'center'}>
        <Button
          disabled={selectedRecommend === null}
          onClick={onSubmit}
          variant={'contained'}
          size={'large'}
        >
          決定
        </Button>
      </Box>
      <Box marginTop={'0.5rem'} textAlign={'center'}>
        {recommends.map((recommend) => (
          <Button
            key={recommend.pokemon.no}
            onClick={() => onClickRecommend(recommend)}
            title={`EV: ${recommend.ev}`}
            variant={
              recommend.pokemon.no === selectedRecommend?.pokemon.no
                ? 'outlined'
                : 'text'
            }
          >
            {recommend.pokemon.name}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
export default NormalPageView;
