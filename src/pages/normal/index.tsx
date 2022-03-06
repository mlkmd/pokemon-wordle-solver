import { NextPage } from 'next';
import NormalPage from 'presentation/components/pages/NormalPage';
import { ComponentProps } from 'react';

type Props = ComponentProps<typeof NormalPage>;
export const Page: NextPage<Props> = (props) => {
  return <NormalPage {...props} />;
};
export default Page;
