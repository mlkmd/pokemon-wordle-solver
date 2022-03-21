import { ComponentProps, FC } from 'react';
import { useRouter } from 'next/router';
import { faviconPath, topPagePath } from 'application/constants/path';
import AppLayoutView from 'presentation/components/layouts/AppLayoutView';
import Head from 'next/head';

type Props = Omit<ComponentProps<typeof AppLayoutView>, 'homeIconOnClick'>;
const AppLayout: FC<Props> = ({ children, ...props }) => {
  const { pageTitle } = props;
  const router = useRouter();

  const homeIconClickHandler = async () => {
    await router.push(topPagePath);
  };

  return (
    <AppLayoutView {...props} homeIconOnClick={homeIconClickHandler}>
      <Head>
        <title>{pageTitle}｜Pokemon Wordle Solver</title>
        <link rel="icon" href={faviconPath} />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="robots" content="noindex" />
      </Head>
      {children}
    </AppLayoutView>
  );
};
export default AppLayout;
