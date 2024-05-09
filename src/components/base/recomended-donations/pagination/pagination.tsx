'use client';

import { Pagination } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React from 'react';

interface IPaginationProps {
  totalPages: number;
}

export const DonationsPagination: React.FC<IPaginationProps> = ({ totalPages }) => {
  return (
    <Pagination
      total={totalPages}
      getItemProps={(page) => ({
        component: 'a',
        href: `?page=${page}`,
      })}
    />
  );
};
