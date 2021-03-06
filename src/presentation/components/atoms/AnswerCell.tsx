import Style from 'presentation/components/atoms/AnswerCell.module.scss';
import { VFC } from 'react';
import { Box } from '@mui/material';
import { CharacterStatus } from 'application/query/value/CharacterStatus';

type Props = {
  /**
   * 文字
   */
  character: string;
  /**
   * ステータス
   */
  status: null | CharacterStatus;
  /**
   * １辺の長さ
   */
  size: number;
  /**
   * クリック
   */
  onClick?: () => void;
};
const AnswerCell: VFC<Props> = ({ character, status, size, onClick }) => {
  return (
    <Box
      className={Style.cell}
      data-status={status}
      data-clickable={typeof onClick === 'function'}
      onClick={onClick}
      height={size}
      width={size}
      fontSize={`${size / 2}px`}
    >
      <span className={Style.character}>{character}</span>
    </Box>
  );
};
export default AnswerCell;
