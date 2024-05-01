import React from 'react';

import styles from './last-seen.module.scss';

import { classes } from '@/utils/styles';

import { Tooltip } from '@mantine/core';
import { useTranslations } from 'next-intl';

interface IToolbarLastSeenProps {
  isOnline?: boolean;
}

export const ToolbarLastSeen: React.FC<IToolbarLastSeenProps> = ({ isOnline }) => {
  const t = useTranslations('WishlistPage.toolbar.user');

  return (
    <div className={styles.wrapper}>
      <Tooltip label={isOnline ? t('online') : t('offline')}>
        <div className={classes(styles.indicator, isOnline && styles.online)} />
      </Tooltip>
    </div>
  );
};
