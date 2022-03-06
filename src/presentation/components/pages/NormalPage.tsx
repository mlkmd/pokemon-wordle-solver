import { NextPage } from 'next';
import AppLayout from 'presentation/components/layouts/AppLayout';

type Props = {};
const NormalPage: NextPage<Props> = () => {
  return (
    <AppLayout pageTitle={'通常モード'}>
      <span>Coming Soon...</span>
    </AppLayout>
  );
};
export default NormalPage;
