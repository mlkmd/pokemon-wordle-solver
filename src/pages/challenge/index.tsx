import { NextPage } from 'next';
import ChallengePage from 'presentation/components/pages/ChallengePage';
import { ComponentProps } from 'react';

type Props = ComponentProps<typeof ChallengePage>;
export const Page: NextPage<Props> = (props) => {
  return <ChallengePage {...props} />;
};
export default Page;
