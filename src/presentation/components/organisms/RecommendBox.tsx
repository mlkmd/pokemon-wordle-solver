import Style from 'presentation/components/organisms/RecommendBox.module.scss';
import { VFC } from 'react';
import { ExpectValueResult } from 'application/query/model/ExpectValueResult';
import { Box } from '@mui/system';

type Props = {
  evResult: ExpectValueResult;
  onClick?: () => void;
};
const RecommendBox: VFC<Props> = ({ evResult, onClick }) => {
  return (
    <Box
      className={Style.box}
      onClick={onClick}
      data-possible={evResult.possible}
      data-clickable={typeof onClick === 'function'}
    >
      {evResult.pokemon.name}
      <Box className={Style.ev}>{evResult.ev.toFixed(2)}</Box>
    </Box>
  );
};
export default RecommendBox;
