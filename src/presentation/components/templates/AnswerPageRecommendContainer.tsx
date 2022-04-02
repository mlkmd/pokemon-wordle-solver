import Style from 'presentation/components/templates/AnswerPageRecommendContainer.module.scss';
import { VFC } from 'react';
import { Box } from '@mui/material';
import { AnswerPageData } from 'presentation/model/AnswerPageData';
import RecommendBox from 'presentation/components/organisms/RecommendBox';

type Props = AnswerPageData;
const AnswerPageRecommendContainer: VFC<Props> = ({
  recommends,
  selectedRecommend,
  onClickRecommend,
}) => {
  return (
    <Box className={Style.recommend}>
      <Box textAlign={'center'}></Box>
      <Box className={Style.grid}>
        {recommends.map((recommend) => (
          <RecommendBox
            key={recommend.pokemon.no}
            evResult={recommend}
            selected={recommend.pokemon.no === selectedRecommend?.pokemon.no}
            onClick={() => onClickRecommend(recommend)}
          />
        ))}
      </Box>
    </Box>
  );
};
export default AnswerPageRecommendContainer;
