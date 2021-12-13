import { Stretch as HStretch } from '@hocgin/ui';
import React from 'react';

export interface StretchProps {
  fullSize?: boolean;
  maxRow?: number;
  /**
   * 内容
   */
  children?: string | Node;
}

const Stretch: React.FC<StretchProps> = ({ children, ...rest }) => {
  return <HStretch {...rest}>{children}</HStretch>;
};

export default Stretch;
