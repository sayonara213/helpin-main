'use client';

import React from 'react';

import { Pagination } from '@mantine/core';

import styles from './pagination.module.scss';

interface IPaginationProps {
  totalPages: number;
}

export const DonationsPagination: React.FC<IPaginationProps> = ({ totalPages }) => {
  return (
    <div className={styles.wrapper}>
      <Pagination
        total={totalPages}
        getItemProps={(page) => ({
          component: 'a',
          href: `?page=${page}`,
        })}
      />
    </div>
  );
};
