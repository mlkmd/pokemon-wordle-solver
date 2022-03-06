import { FC } from 'react';
import Head from 'next/head';
import Header from 'presentation/components/templates/Header';
import { faviconPath } from 'presentation/constants/path';

type Props = {
  /** ページタイトル（title 及び h2） */
  pageTitle: string;
  /** ホームアイコン押下 */
  homeIconOnClick: () => void;
};
const AppLayoutView: FC<Props> = ({ children, pageTitle, homeIconOnClick }) => {
  return (
    <>
      <Header subTitle={pageTitle} homeIconOnClick={homeIconOnClick} />
      <main>{children}</main>
    </>
  );
};
export default AppLayoutView;
