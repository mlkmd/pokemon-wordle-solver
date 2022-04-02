import { VFC } from 'react';
import { Box, Button, Grid } from '@mui/material';
import GenerationSelector from 'presentation/components/atoms/GenerationSelector';
import { AnswerPageData } from 'presentation/model/AnswerPageData';
import Style from 'presentation/components/templates/AnswerPageRecommendContainer.module.scss';

type Props = AnswerPageData;
const AnswerPageButtonsContainer: VFC<Props> = ({
  generation,
  selectedRecommend,
  onChangeGeneration,
  onClickNextButton,
  onSubmit,
  onClear,
  onClearAll,
}) => {
  return (
    <Box className={Style.box}>
      <GenerationSelector
        generation={generation}
        onChange={onChangeGeneration}
      />
      <Box className={Style.buttons}>
        {typeof onClickNextButton !== 'undefined' && (
          <Button
            onClick={onClickNextButton}
            variant={'contained'}
            size={'large'}
          >
            次へ
          </Button>
        )}

        <Button
          disabled={selectedRecommend === null}
          onClick={onSubmit}
          variant={'contained'}
          size={'large'}
        >
          決定
        </Button>
        <Button onClick={onClear} variant={'contained'} size={'large'}>
          クリア
        </Button>
        {typeof onClearAll !== 'undefined' && (
          <Button onClick={onClearAll} variant={'contained'} size={'large'}>
            最初から
          </Button>
        )}
      </Box>
    </Box>
  );
};
export default AnswerPageButtonsContainer;
