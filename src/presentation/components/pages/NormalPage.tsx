import { NextPage } from 'next';
import AppLayout from 'presentation/components/layouts/AppLayout';
import NormalPageView from 'presentation/components/pages/NormalPageView';
import useAnswerPage from 'presentation/components/hooks/useAnswerPage';

type Props = {};
const NormalPage: NextPage<Props> = (props) => {
  const answerPageProps = useAnswerPage({ usedNames: [] });

  return (
    <AppLayout pageTitle={'通常モード'}>
      <NormalPageView {...answerPageProps} />
    </AppLayout>
  );
};
export default NormalPage;
