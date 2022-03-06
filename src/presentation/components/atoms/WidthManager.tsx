import Style from 'presentation/components/atoms/WidthManager.module.scss';
import { ComponentProps, FC, ReactNode } from 'react';
import classnames from 'classnames';
import { Box } from '@mui/material';

type Props = ComponentProps<typeof Box>;
const WidthManager: FC<Props> = ({ children, className, ...props }) => {
  return (
    <Box {...props} className={classnames(Style.widthManager, className)}>
      {children}
    </Box>
  );
};
export default WidthManager;
