import { NextPage } from 'next';
import { ComponentProps } from 'react';
import ChallengePage from 'presentation/components/pages/ChallengePage';

type Props = ComponentProps<typeof ChallengePage>;
export const Page: NextPage<Props> = (props) => {
  return <ChallengePage {...props} />;
};
export default Page;
