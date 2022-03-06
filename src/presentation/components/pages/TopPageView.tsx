import { Button, Grid } from '@mui/material';
import WidthManager from 'presentation/components/atoms/WidthManager';
import { VFC } from 'react';

type Props = {
  /** 通常モードボタン押下 */
  normalModeOnClick: () => void;
  /** チャレンジモードボタン押下 */
  challengeModeButtonOnClick: () => void;
};
const TopPageView: VFC<Props> = ({
  normalModeOnClick,
  challengeModeButtonOnClick,
}) => {
  return (
    <WidthManager marginTop={12}>
      <Grid container spacing={2}>
        <Grid item xs={12} textAlign={'center'}>
          <Button
            variant={'contained'}
            size={'large'}
            onClick={normalModeOnClick}
          >
            通常モード
          </Button>
        </Grid>
        <Grid item xs={12} textAlign={'center'}>
          <Button
            variant={'contained'}
            size={'large'}
            onClick={challengeModeButtonOnClick}
          >
            チャレンジモード
          </Button>
        </Grid>
      </Grid>
    </WidthManager>
  );
};
export default TopPageView;
