import React from 'react';

import styles from '@/styles/pages/pages.module.scss';

import { Skeleton } from '@mantine/core';

export const ProfileByIdLoading = () => {
  return (
    <div className={styles.grid}>
      <Skeleton height={250} radius={14} />
      <Skeleton height={250} radius={14} />
      <Skeleton height={250} radius={14} />
      <Skeleton height={250} radius={14} />
    </div>
  );
};

export default ProfileByIdLoading;
