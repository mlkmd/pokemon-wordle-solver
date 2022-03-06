import Style from 'presentation/components/pages/NormalPageView.module.scss';
import WidthManager from 'presentation/components/atoms/WidthManager';
import { ComponentProps, VFC } from 'react';
import AnswerGrid from 'presentation/components/organisms/AnswerGrid';
import { Button, Grid } from '@mui/material';
import { ExpectValueResult } from 'application/query/model/ExpectValueResult';

type Props = {
  recommends: ExpectValueResult[];
  selectedRecommend: null | ExpectValueResult;
  onClickRecommend: (recommend: ExpectValueResult) => void;
  onSubmit: () => void;
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
const RecommendContainer: VFC<Props> = ({
  recommends,
  selectedRecommend,
  onClickRecommend,
  onSubmit,
}) => {
  return (
    <Grid
      className={Style.recommend}
      container
      direction={'column'}
      justifyContent={'space-between'}
    >
      <Grid item xs={11} overflow={'auto'}>
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
      </Grid>
      <Grid item xs={1} textAlign={'center'}>
        <Button
          disabled={selectedRecommend === null}
          onClick={onSubmit}
          variant={'contained'}
          size={'large'}
        >
          決定
        </Button>
      </Grid>
    </Grid>
  );
};
export default NormalPageView;
