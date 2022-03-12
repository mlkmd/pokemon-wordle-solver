import { NextPage } from 'next';
import AppLayout from 'presentation/components/layouts/AppLayout';
import { AnswerPageData } from 'presentation/model/AnswerPageData';
import { PokemonName } from 'domain/value/PokemonName';
import useAnswerPage from 'presentation/components/hooks/useAnswerPage';
import ChallengePageView from 'presentation/components/pages/ChallengePageView';
import { ComponentProps, useState } from 'react';

type Props = AnswerPageData;
const ChallengePage: NextPage<Props> = ({}) => {
  const [usedNames, setUsedNames] = useState<PokemonName[]>([]);

  const answerPageProps = useAnswerPage({ usedNames });
  const {
    onClear,
    answerGridProps: { results },
  } = answerPageProps;

  const nextButtonClickHandler = () => {
    setUsedNames([...usedNames, ...results.map((item) => item.input)]);
    onClear();
  };

  const clearAllHandler = () => {
    setUsedNames([]);
    onClear();
  };

  const challengePageProps: ComponentProps<typeof ChallengePageView> = {
    ...answerPageProps,
    usedNames,
    onClickNextButton: nextButtonClickHandler,
    onClearAll: clearAllHandler,
  };

  return (
    <AppLayout pageTitle={'チャレンジモード'}>
      <ChallengePageView {...challengePageProps} />
    </AppLayout>
  );
};
export default ChallengePage;
