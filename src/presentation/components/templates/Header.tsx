import Style from 'presentation/components/templates/Header.module.scss';
import HomeIcon from '@mui/icons-material/Home';
import WidthManager from 'presentation/components/atoms/WidthManager';
import { VFC } from 'react';
import { Box } from '@mui/material';

type Props = {
  /**
   * h2 テキスト
   */
  subTitle: string;
  /**
   * ホームアイコンクリック
   */
  homeIconOnClick: () => void;
};
const Header: VFC<Props> = ({ subTitle, homeIconOnClick }) => {
  return (
    <header className={Style.header}>
      <WidthManager className={Style.titleContainer}>
        <Box className={Style.mainTitleContainer}>
          <h1 className={Style.mainTitle}>Pokemon Wordle Solver</h1>
          <HomeIcon className={Style.homeIcon} onClick={homeIconOnClick} />
        </Box>
        <h2 className={Style.subTitle}>{subTitle}</h2>
      </WidthManager>
    </header>
  );
};
export default Header;
