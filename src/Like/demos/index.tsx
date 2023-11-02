/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Like } from '@hocgin/ui';
import styles from './index.scss';

export default () => {
  return (
    <>
      <Like onChange={console.log} checked={true} disabled={false} />
    </>
  );
};
