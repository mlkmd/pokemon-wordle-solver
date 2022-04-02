import Style from 'presentation/components/pages/NormalPageView.module.scss';
import WidthManager from 'presentation/components/atoms/WidthManager';
import { VFC } from 'react';
import { AnswerPageData } from 'presentation/model/AnswerPageData';
import AnswerPageGridContainer from 'presentation/components/templates/AnswerPageGridContainer';
import AnswerPageRecommendContainer from 'presentation/components/templates/AnswerPageRecommendContainer';
import AnswerPageButtonsContainer from 'presentation/components/templates/AnswerPageButtonsContainer';

type Props = AnswerPageData;
const NormalPageView: VFC<Props> = (props) => {
  // TODO: 入力済みポケモンの描画
  return (
    <WidthManager className={Style.container}>
      <AnswerPageGridContainer {...props} />
      <AnswerPageButtonsContainer {...props} />
      <AnswerPageRecommendContainer {...props} />
    </WidthManager>
  );
};
export default NormalPageView;
