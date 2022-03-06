import type { NextPage } from 'next';
import TopPage from 'presentation/components/pages/TopPage';
import { ComponentProps } from 'react';

type Props = ComponentProps<typeof TopPage>;
const Page: NextPage<Props> = (ctx) => {
  return <TopPage {...ctx} />;
};
export default Page;
