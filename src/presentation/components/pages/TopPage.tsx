import type { NextPage } from 'next';
import AppLayout from 'presentation/components/layouts/AppLayout';
import TopPageView from 'presentation/components/pages/TopPageView';
import { ComponentProps } from 'react';
import { useRouter } from 'next/router';
import { challengePagePath, normalPagePath } from 'presentation/constants/path';

type Props = Omit<
  ComponentProps<typeof TopPageView>,
  'normalModeOnClick' | 'challengeModeButtonOnClick'
>;
const TopPage: NextPage<Props> = (props: Props) => {
  const router = useRouter();

  const normalModeOnClick = async () => {
    await router.push(normalPagePath);
  };

  const challengeModeButtonOnClick = async () => {
    await router.push(challengePagePath);
  };

  return (
    <AppLayout pageTitle={'モード選択画面'}>
      <TopPageView
        {...props}
        normalModeOnClick={normalModeOnClick}
        challengeModeButtonOnClick={challengeModeButtonOnClick}
      />
    </AppLayout>
  );
};
export default TopPage;
