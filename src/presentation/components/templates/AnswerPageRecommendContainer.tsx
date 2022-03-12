import Style from 'presentation/components/templates/AnswerPageRecommendContainer.module.scss';
import { VFC } from 'react';
import { Box, Button } from '@mui/material';
import { AnswerPageData } from 'presentation/model/AnswerPageData';

type Props = AnswerPageData & {
  usedNames?: string[];
  onClickNextButton?: () => void;
  onClearAll?: () => void;
};
const AnswerPageRecommendContainer: VFC<Props> = ({
  recommends,
  selectedRecommend,
  onClickRecommend,
  onSubmit,
  usedNames,
  onClickNextButton,
  onClearAll,
}) => {
  return (
    <Box className={Style.recommend}>
      <Box textAlign={'center'}>
        {typeof onClickNextButton !== 'undefined' && (
          <Button
            className={Style.nextButton}
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
        {typeof onClearAll !== 'undefined' && (
          <Button
            className={Style.clearAllButton}
            onClick={onClearAll}
            variant={'contained'}
            size={'large'}
          >
            最初から
          </Button>
        )}
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
        {typeof usedNames !== 'undefined' && (
          <Box className={Style.usedNamesContainer}>
            <Box>入力済み</Box>
            {usedNames.join('、')}
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default AnswerPageRecommendContainer;
