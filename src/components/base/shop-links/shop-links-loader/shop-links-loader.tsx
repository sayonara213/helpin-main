import { Skeleton } from '@mantine/core';
import React from 'react';

import styles from '../shop-links.module.scss';

export const ShopLinksLoader: React.FC = () => {
  return (
    <div className={styles.list}>
      <ShopLinksItemLoading />
      <ShopLinksItemLoading />
      <ShopLinksItemLoading />
    </div>
  );
};

const ShopLinksItemLoading: React.FC = () => {
  return <Skeleton height={80} width={80} />;
};
