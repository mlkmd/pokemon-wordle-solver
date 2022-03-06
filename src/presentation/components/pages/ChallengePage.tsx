import { NextPage } from 'next';
import AppLayout from 'presentation/components/layouts/AppLayout';

type Props = {};
const ChallengePage: NextPage<Props> = () => {
  return (
    <AppLayout pageTitle={'チャレンジモード'}>
      <span>Coming Soon...</span>
    </AppLayout>
  );
};
export default ChallengePage;
